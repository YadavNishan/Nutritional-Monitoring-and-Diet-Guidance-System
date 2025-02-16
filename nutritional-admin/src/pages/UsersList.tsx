import React, { useEffect } from "react"
import UserListView from "../components/list/UserListView"
import { TUser } from "../types/user"
import TitleCard from "../components/Cards/TitleCard"
import Pagination, { IPagination } from "../components/pagination/Pagination"
import config from "../constants/config"

const UsersList: React.FC = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const [pageSize, setPageSize] = React.useState(10)

	const [users, setUsers] = React.useState<TUser[] | null>(null)
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
					`${config.backendUrl}/admin/users?page=${currentPage}&limit=${pageSize}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
					},
				}
				)
				const data: {
					payload: {
						rows: TUser[]
						pagination: IPagination
					}
				} = await response.json()
				setUsers(data.payload.rows)
				setPagination(data.payload.pagination)
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
			<TitleCard title="Users">
				<UserListView users={users} />
				<Pagination
					pagination={pagination}
					setCurrentPage={setCurrentPage}
					setPageSize={setPageSize}
				/>
			</TitleCard>
		</div>
	)
}

export default UsersList

