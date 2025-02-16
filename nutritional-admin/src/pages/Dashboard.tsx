import React, { useEffect } from "react"
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon"
import { IoFastFoodOutline } from "react-icons/io5"
import DashboardStats from "../components/dashboard/DashboardStats"
import { MdOutlineFeedback } from "react-icons/md"
import { LiaDrumstickBiteSolid } from "react-icons/lia"
import config from "../constants/config"
import Intakes from "../components/dashboard/Intakes"

const Dashboard: React.FC = () => {
	const [overview, setOverview] = React.useState({
		userCount: "0",
		foodCount: "0",
		intakeCount: "0",
		feedbackCount: "0",
	})
	const [ready, setReady] = React.useState(false)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${config.backendUrl}/admin/overview`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
						},
					}
				)
				const data: {
					payload: {
						userCount: string
						foodCount: string
						intakeCount: string
						feedbackCount: string
					}
				} = await response.json()
				setOverview(data.payload)
				setReady(true)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchUsers()
	}, [])

	if (!ready) {
		return <div>Loading...</div>
	}
	if (
		overview.userCount === "0" &&
		overview.foodCount === "0" &&
		overview.intakeCount === "0" &&
		overview.feedbackCount === "0"
	) {
		return <div>Something went wrong</div>
	}
	const iconSize = "h-20 w-20"

	const statsData = [
		{
			title: "Total Users",
			value: overview.userCount,
			icon: <UserGroupIcon className={iconSize} />,
			description: "Number of registered users",
			link: "/admin/users",
		},
		{
			title: "Total Foods",
			value: overview.foodCount,
			icon: <IoFastFoodOutline className={iconSize} />,
			description: "Number of food items",
			link: "/admin/foods",
		},
		{
			title: "Total Intakes",
			value: overview.intakeCount,
			icon: <LiaDrumstickBiteSolid className={iconSize} />,
			description: "Number of food intakes recorded",
			link: "/admin/analytics/gender",
		},
		{
			title: "Total Feedbacks",
			value: overview.feedbackCount,
			icon: <MdOutlineFeedback className={iconSize} />,
			description: "Number of feedback entries",
			link: "/admin/feedbacks",
		},
	]
	return (
		<div className="w-full bg-[#191e24] p-6">
			<div className="mt-2 grid h-40 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{statsData.map((d, k) => {
					return <DashboardStats key={k} {...d} />
				})}
			</div>
			<div className="mt-6">
				<Intakes />
			</div>
		</div>
	)
}

export default Dashboard

