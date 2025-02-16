export type TFeedback = {
	id: string
	userId: string
	comment: string
	createdAt: string
	updatedAt: string
}

export type TFeedbackWithUser = TFeedback & {
	User: {
		id: string
		name: string
		email: string
	}
}

