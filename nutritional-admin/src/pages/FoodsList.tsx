import React, { useEffect } from "react"
import TitleCard from "../components/Cards/TitleCard"
import Pagination, { IPagination } from "../components/pagination/Pagination"
import config from "../constants/config"
import { TFoodMinimal } from "../types/food"
import FoodListView from "../components/list/FoodListView"

const FoodsList: React.FC = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const [pageSize, setPageSize] = React.useState(10)

	const [foods, setFoods] = React.useState<TFoodMinimal[] | null>(null)
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
					`${config.backendUrl}/admin/foods?page=${currentPage}&limit=${pageSize}&sort_by=id&sort_order=ASC`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
					},
				}
				)
				const data: {
					payload: {
						rows: TFoodMinimal[]
						pagination: IPagination
					}
				} = await response.json()
				setFoods(data.payload.rows)
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
			<TitleCard title="Foods">
				<FoodListView foods={foods} />
				<Pagination
					pagination={pagination}
					setCurrentPage={setCurrentPage}
					setPageSize={setPageSize}
				/>
			</TitleCard>
		</div>
	)
}

export default FoodsList

