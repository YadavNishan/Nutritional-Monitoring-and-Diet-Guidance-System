import userRepository from '../repositories/user.repository';
import pwdHashService from '../service/pwd-hash.service';
import successResponse from '../helpers/api-response';
import logger from '../logger';
import config from '../../config/config';
import projectEnum from '../enum/project.enum';
import mailTemplates from '../helpers/mail-templates';
import utilities from '../helpers/utilities';
import tokenRepository from '../repositories/token.repository';
import apiResponse from '../helpers/api-response';
const jwt = require('jsonwebtoken');

// User
async function registerUser(req: any, res: any, next: any) {
	const data = req.body;
	data.isActive = projectEnum.userStatus.INACTIVE; 
	data.role = projectEnum.userRole.USER;
	logger.log.info({
		message: 'Inside auth controller to register user',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/auth/register',
		method: 'POST',
	});

	try {
		const existingUser = await userRepository.findUserByEmail(data.email);
		if (existingUser) {
			res.statusCode = 409;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'User already exists with this email',
				})
			);
		}

		const userRes = await userRepository.createNewUser(data);

		// generate verification token
		const tokenData = {
			userId: userRes.id as string,
			type: projectEnum.tokenType.EMAIL_VERIFICATION,
			value: utilities.generateOTP(),
			expiresAt: utilities.generateVerificationTime(5),
		};
		await tokenRepository.createToken(tokenData);

		// Send email verification otp in email
		mailTemplates.sendEmailVerificationEmail(
			userRes.email,
			tokenData.value,
			userRes.name
		);

		const successResp = await successResponse.appResponse(res, userRes);
		logger.log.info({
			message: 'Successfully created new user',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function verifyEmail(req: any, res: any, next: any) {
	const { email, emailVerificationToken } = req.body;
	logger.log.info({
		message: 'Inside auth controller to verify email',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/auth/verify-email',
		method: 'POST',
	});
	try {
		// test conditions
		const userObj = await userRepository.findUserByEmail(email);
		if (!userObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'User not found with this email',
				})
			);
		}

		// if email is already verified
		if (userObj.isActive) {
			res.statusCode = 400;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Email already verified',
				})
			);
		}

		const tokenObj = await tokenRepository.findToken({
			userId: userObj.id,
			type: projectEnum.tokenType.EMAIL_VERIFICATION,
		});

		if (!tokenObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Token not found',
				})
			);
		}

		if (new Date() > tokenObj.expiresAt) {
			res.statusCode = 401;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Token expired',
				})
			);
		} else if (emailVerificationToken !== tokenObj.value) {
			res.statusCode = 401;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Invalid token',
				})
			);
		}
		const updatedUser = await userRepository.activateAccount(userObj.id);

		if (updatedUser) {
			const successResp = await successResponse.appResponse(res, {
				message: 'Email verified successfully',
			});
			logger.log.info({
				message: `User '${email}' logged in successfully`,
				reqId: req.id,
				method: 'POST',
			});
			return res.status(200).send(successResp);
		} else {
			res.statusCode = 400;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Failed to verify email',
				})
			);
		}
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function resendVerificationEmail(req: any, res: any, next: any) {
	const { email } = req.params;
	logger.log.info({
		message: 'Inside auth controller to resend verification email',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/auth/resend-verification-email',
		method: 'GET',
	});
	try {
		const userObj = await userRepository.findUserByEmail(email);
		if (!userObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'User not found with this email',
				})
			);
		}

		if (userObj.isActive) {
			res.statusCode = 409;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Email already verified',
				})
			);
		}

		const tokenObj = await tokenRepository.findToken({
			userId: userObj.id,
			type: projectEnum.tokenType.EMAIL_VERIFICATION,
		});

		if (tokenObj) {
			await tokenRepository.deleteToken(tokenObj.id);
		}

		const newToken = await tokenRepository.createToken({
			userId: userObj.id,
			type: projectEnum.tokenType.EMAIL_VERIFICATION,
			value: utilities.generateOTP(),
			expiresAt: utilities.generateVerificationTime(5),
		});

		if (newToken) {
			mailTemplates.sendEmailVerificationEmail(
				userObj.email,
				newToken.value,
				userObj.name
			);
			const successResp = await successResponse.appResponse(res, {
				message: 'Email verification resent successfully',
			});
			logger.log.info({
				message: `Resent email verification to '${email}' successfully`,
				reqId: req.id,
			});
			return res.status(200).send(successResp);
		} else {
			res.statusCode = 400;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Failed to resend verification email',
				})
			);
		}
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function userLogin(req: any, res: any, next: any) {
	const { email, password } = req.body;
	logger.log.info({
		message: 'Inside auth controller to login via email',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/auth/login',
		method: 'POST',
	});
	try {
		const userObj = await userRepository.findUserByEmail(email);
		if (!userObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'No user found with this email',
				})
			);
		}
		if (!userObj.isActive) {
			res.statusCode = 403;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'User account is not verified',
				})
			);
		}
		const isValidPwd = await pwdHashService.comparePassword(
			password,
			userObj.password
		);
		if (isValidPwd) {
			const secret = config.jwtSecret;
			const expiryInSeconds =
				60 * 60 * 24 * Number(config.authTokenExpiry);
			const claims = {
				iss: userObj.id,
				exp: Math.floor(Date.now() / 1000) + expiryInSeconds,
				name: userObj.name,
				email: userObj.email,
				role: userObj.role,
			};
			const jwtToken = jwt.sign(claims, secret);
			const userToken = {
				id: userObj.id,
				name: userObj.name,
				email: userObj.email,
				role: userObj.role,
				token: jwtToken,
			};

			const respObj = await successResponse.appResponse(res, userToken);
			logger.log.info({
				message: `User '${email}' logged in successfully`,
				reqId: req.id,
				method: 'POST',
			});
			return res.status(200).send(respObj);
		}
		res.statusCode = 401;
		return res.json(
			await apiResponse.errorResponse(req, res, {
				message: 'Invalid username or password',
			})
		);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function verifyJwt(req: any, res: any, next: any) {
	const { email, role, auth } = req;
	logger.log.info({
		message: 'Inside auth controller to verify jwt token',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/auth/verify',
		method: 'GET',
	});
	try {
		let userToken: any = {
			id: auth,
			email,
			role,
		};
		const successResp = await successResponse.appResponse(res, userToken);
		logger.log.info({
			message: 'Successfully verified jwt token',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function forgotPassword(req: any, res: any, next: any) {
	const { email } = req.body;
	logger.log.info({
		message: 'Inside auth controller to forgot password',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/auth/forgot-password',
		method: 'POST',
	});
	try {
		const userObj = await userRepository.findUserByEmail(email);
		if (!userObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'No user found with this email',
				})
			);
		}

		const tokenObj = await tokenRepository.findToken({
			userId: userObj.id,
			type: projectEnum.tokenType.PASSWORD_RESET,
		});
		if (tokenObj) {
			await tokenRepository.deleteToken(tokenObj.id);
		}

		const tokenData = {
			userId: userObj.id as string,
			type: projectEnum.tokenType.PASSWORD_RESET,
			value: utilities.generateOTP(),
			expiresAt: utilities.generateVerificationTime(5),
		};
		await tokenRepository.createToken(tokenData);

		// Send password reset link in email
		mailTemplates.sendForgotPasswordEmail(
			userObj.email,
			tokenData.value,
			userObj.name
		);

		const successResp = await successResponse.appResponse(res, {
			message: 'Password reset email sent successfully',
		});
		logger.log.info({
			message: `Password reset email sent to '${email}' successfully`,
			reqId: req.id,
		});
		return res.status(200).send(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function resetPassword(req: any, res: any, next: any) {
	const { email, passwordResetToken, password } = req.body;
	logger.log.info({
		message: 'Inside auth controller to reset password',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/auth/reset-password',
		method: 'POST',
	});
	try {
		const userObj = await userRepository.findUserByEmail(email);
		if (!userObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'No user found with this email',
				})
			);
		}

		const tokenObj = await tokenRepository.findToken({
			userId: userObj.id,
			type: projectEnum.tokenType.PASSWORD_RESET,
		});

		if (!tokenObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Token not found',
				})
			);
		}

		if (new Date() > tokenObj.expiresAt) {
			res.statusCode = 401;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Token expired',
				})
			);
		} else if (passwordResetToken !== tokenObj.value) {
			res.statusCode = 401;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Invalid token',
				})
			);
		}

		const hashedPassword = await pwdHashService.generateHash(password);
		const updatedUser = await userRepository.updateUserPassword(
			userObj.id,
			hashedPassword
		);

		if (updatedUser) {
			await tokenRepository.deleteToken(tokenObj.id);
			const successResp = await successResponse.appResponse(res, {
				message: 'Password reset successfully',
			});
			logger.log.info({
				message: `Password reset for '${email}' successfully`,
				reqId: req.id,
			});
			return res.status(200).send(successResp);
		} else {
			res.statusCode = 400;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Failed to reset password',
				})
			);
		}
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	registerUser,
	verifyEmail,
	resendVerificationEmail,
	userLogin,
	verifyJwt,
	forgotPassword,
	resetPassword,
};
