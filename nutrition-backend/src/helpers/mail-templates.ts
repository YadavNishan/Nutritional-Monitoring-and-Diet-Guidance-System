import config from '../../config/config';
import NodeMailer from '../service/node-mailer.service';
import fs from 'fs';
import path from 'path';

async function sendEmailVerificationEmail(
	email: string,
	token: string,
	name: string
) {
	const templatePath = path.join(
		__dirname,
		'../templates/email-templates/email-verification.html'
	);
	const emailVerificationTemplate = fs.readFileSync(templatePath, 'utf8');

	// Encrypt email and token to send in url
	const encryptedEmail = Buffer.from(email).toString('base64');
	const encryptedToken = Buffer.from(token).toString('base64');
	const mailOptions = {
		to: email,
		subject: 'Confirm your email address',
		text: `Please confirm your email address with ${token} at ${config.frontEndUrl}/verify-email`,
		html: emailVerificationTemplate
			.replace(/{{NAME}}/g, name)
			.replace(
				/{{VERIFICATION_LINK}}/g,
				`${config.frontEndUrl}/verify-email?email=${encryptedEmail}&otp=${encryptedToken}`
			)
			.replace(/{{VERIFICATION_TOKEN}}/g, token),
	};
	await NodeMailer.sendMail(mailOptions);
}

async function sendForgotPasswordEmail(
	email: string,
	token: string,
	name: string
) {
	const templatePath = path.join(
		__dirname,
		'../templates/email-templates/reset-password.html'
	);
	const passwordResetTemplate = fs.readFileSync(templatePath, 'utf8');

	const encryptedEmail = Buffer.from(email).toString('base64');
	const encryptedToken = Buffer.from(token).toString('base64');
	const mailOptions = {
		to: email,
		subject: 'Reset your password',
		text: `Reset your password at ${config.frontEndUrl}/reset-password`,
		html: passwordResetTemplate
			.replace(/{{USER_NAME}}/g, name)
			.replace(
				/{{PASSWORD_RESET_LINK}}/g,
				`${config.frontEndUrl}/reset-password?email=${encryptedEmail}&otp=${encryptedToken}`
			)
			.replace(/{{PASSWORD_RESET_TOKEN}}/g, token),
	};
	await NodeMailer.sendMail(mailOptions);
}

export default {
	sendEmailVerificationEmail,
	sendForgotPasswordEmail,
};
