import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import logger from '../logger';
import config from '../../config/config';

dotenv.config();

interface TEmail {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}
export default class NodeMailer {
	private static transporter: nodemailer.Transporter;

	private static initializeTransporter() {
		NodeMailer.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: config.gmailUserEmail,
				pass: config.gmailUserPassword,
			},
		});
	}

	static async sendMail(email: TEmail): Promise<void> {
		if (!NodeMailer.transporter) {
			NodeMailer.initializeTransporter();
		}
		try {
			const info = await NodeMailer.transporter.sendMail({
				from: {
					name: 'Nutritional Monitoring',
					address: 'nutrition@example.com',
				},
				to: email.to,
				subject: email.subject,
				text: email.text,
				html: email.html,
			});

			logger.log.info({
				message: `Successfully sent email to ${email.to}`,
				reqId: info.messageId,
			});
		} catch (error) {
			logger.log.info({
				message: error,
				reqId: 'Email sending failed',
			});
		}
	}
}
