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

function GenderIntakes() {
	const [activityData, setActivityData] = useState<{
		male: Record<string, number>
		female: Record<string, number>
		other: Record<string, number>
	} | null>(null)
	const [ready, setReady] = useState(false)
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${config.backendUrl}/admin/activity/gender`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
						},
					}
				)
				const data: {
					payload: {
						male: Record<string, number>
						female: Record<string, number>
						other: Record<string, number>
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

	const labels = Object.keys(activityData.male)

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Male Activity",
				data: Object.values(activityData.male),
				borderColor: "rgba(53, 162, 235, 1)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
			{
				fill: true,
				label: "Female Activity",
				data: Object.values(activityData.female),
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				fill: true,
				label: "Other Activity",
				data: Object.values(activityData.other),
				borderColor: "rgb(128, 128, 128)",
				backgroundColor: "rgba(128, 128, 128, 0.5)",
			},
		],
	}

	return (
		<TitleCard title={"Activity By Gender"}>
			<Line data={data} options={options} />
		</TitleCard>
	)
}

export default GenderIntakes

