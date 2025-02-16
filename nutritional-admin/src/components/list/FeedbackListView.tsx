import React from "react"
import { TFeedbackWithUser } from "../../types/feedback"
import UserAvatar from "../userInfo/userAvatar"
import { monthDayYearFormat } from "../../utils/dayjs"

type PFeedbackListView = {
	feedbacks: TFeedbackWithUser[] | null
}

const FeedbackListView: React.FC<PFeedbackListView> = ({ feedbacks }) => {
	const mapRows = () => {
		if (!feedbacks || feedbacks.length === 0) {
			return (
				<tr>
					<td colSpan={10} className="h-16 text-center">
						No feedbacks found.
					</td>
				</tr>
			)
		}
		return feedbacks.map((feedback, index) => (
			<tr key={index} className="border-b border-[#191e24]">
				<td>{index + 1}</td>
				<td>
					<div className="flex items-center space-x-3">
						<div className="avatar">
							<div className="mask mask-squircle h-12 w-12">
								<UserAvatar name={feedback.User.name} />
							</div>
						</div>
						<div>
							<div className="font-bold">
								{feedback.User.name}
							</div>
							<div>{feedback.User.email}</div>
						</div>
					</div>
				</td>
				<td>{feedback.comment}</td>
				<td>{monthDayYearFormat(feedback.createdAt)}</td>
			</tr>
		))
	}

	return (
		<div className="w-full overflow-x-auto">
			<table className="table w-full">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Comment</th>
						<th>Created On</th>
					</tr>
				</thead>
				<tbody>{mapRows()}</tbody>
			</table>
		</div>
	)
}

export default FeedbackListView

