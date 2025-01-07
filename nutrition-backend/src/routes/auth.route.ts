import express from 'express';
import { validate } from 'express-validation';
import authValidation from '../validation/auth.validation';
import authController from '../controller/auth.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
	.route('/register')
	.post(validate(authValidation.registerUser), authController.registerUser);

router
	.route('/verify-email')
	.post(validate(authValidation.verifyEmail), authController.verifyEmail);

router
	.route('/resend-verification-email/:email')
	.get(
		validate(authValidation.resendVerificationEmail),
		authController.resendVerificationEmail
	);

router
	.route('/login')
	.post(validate(authValidation.login), authController.userLogin);

router
	.route('/verify')
	.get(authMiddleware.checkAuthHeader, authController.verifyJwt);

router
	.route('/forgot-password')
	.post(
		validate(authValidation.forgotPassword),
		authController.forgotPassword
	);

router
	.route('/reset-password')
	.post(validate(authValidation.resetPassword), authController.resetPassword);

export default router;
