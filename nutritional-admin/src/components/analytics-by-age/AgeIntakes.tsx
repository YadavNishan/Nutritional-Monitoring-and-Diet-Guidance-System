import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import TitleCard from "../Cards/TitleCard"
import { useEffect, useState } from "react"
import config from "../../constants/config"

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
)

function AgeIntakes() {
	const [activityData, setActivityData] = useState<{
		young: Record<string, number>
		middle: Record<string, number>
		adult: Record<string, number>
		old: Record<string, number>
	} | null>(null)
	const [ready, setReady] = useState(false)
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${config.backendUrl}/admin/activity/age`,{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
						},
					}
				)
				const data: {
					payload: {
						young: Record<string, number>
						middle: Record<string, number>
						adult: Record<string, number>
						old: Record<string, number>
					}
				} = await response.json()
				setActivityData(data.payload)
				setReady(true)
				console.log(data.payload)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchUsers()
	}, [])
	if (!ready) {
		return (
			<div className="skeleton grid h-[400px] w-full place-items-center">
				Loading
			</div>
		)
	}
	if (!activityData) {
		return <div>No data found</div>
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
	}

	const labels = Object.keys(activityData.young)

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: "<25",
				data: Object.values(activityData.young),
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.8)",
			},
			{
				fill: true,
				label: "26-40",
				data: Object.values(activityData.middle),
				borderColor: "rgba(255, 159, 64, 1)",
				backgroundColor: "rgba(255, 159, 64, 0.8)",
			},
			{
				fill: true,
				label: "41-55",
				data: Object.values(activityData.adult),
				borderColor: "rgba(255, 205, 86, 1)",
				backgroundColor: "rgba(255, 205, 86, 0.8)",
			},
			{
				fill: true,
				label: "55+",
				data: Object.values(activityData.old),
				borderColor: "rgba(153, 102, 255, 1)",
				backgroundColor: "rgba(153, 102, 255, 0.8)",
			},
		],
	}

	return (
		<TitleCard title={"Activity By Age"}>
			<Line data={data} options={options} />
		</TitleCard>
	)
}

export default AgeIntakes

