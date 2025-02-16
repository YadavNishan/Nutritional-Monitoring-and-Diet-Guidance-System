import React, { useEffect } from "react"
import TitleCard from "../components/Cards/TitleCard"
import Pagination, { IPagination } from "../components/pagination/Pagination"
import config from "../constants/config"
import { TFeedbackWithUser } from "../types/feedback"
import FeedbackListView from "../components/list/FeedbackListView"

const FeedbacksList: React.FC = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const [pageSize, setPageSize] = React.useState(10)

	const [feedbacks, setFeedbacks] = React.useState<
		TFeedbackWithUser[] | null
	>(null)
	const [pagination, setPagination] = React.useState<IPagination>({
		currentPage: 1,
		pageSize: 10,
		totalPages: 1,
		totalRecords: 0,
	})
	const [ready, setReady] = React.useState(false)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${config.backendUrl}/admin/feedbacks?page=${currentPage}&limit=${pageSize}&sort_by=id&sort_order=ASC`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
						},
					}
				)
				const data: {
					payload: {
						rows: TFeedbackWithUser[]
						pagination: IPagination
					}
				} = await response.json()
				setFeedbacks(data.payload.rows)
				setPagination(data.payload.pagination)
				console.log("data.payload.pagination ==> ", data.payload.pagination);
				setReady(true)
			} catch (error) {
				console.error("Error fetching users:", error)
			}
		}

		fetchUsers()
	}, [currentPage, pageSize])

	if (!ready) {
		return <div>Loading...</div>
	}

	return (
		<div className="w-full bg-[#191e24] p-6">
			<TitleCard title="Feedbacks">
				<FeedbackListView feedbacks={feedbacks} />
				<Pagination
					pagination={pagination}
					setCurrentPage={setCurrentPage}
					setPageSize={setPageSize}
				/>
			</TitleCard>
		</div>
	)
}

export default FeedbacksList

