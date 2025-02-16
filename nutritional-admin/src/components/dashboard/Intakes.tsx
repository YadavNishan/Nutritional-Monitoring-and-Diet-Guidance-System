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

function Intakes() {
	const [activityData, setActivityData] = useState<Record<
		string,
		number
	> | null>(null)
	const [ready, setReady] = useState(false)
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${config.backendUrl}/admin/activity`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
					},
				}
				)
				const data: {
					payload: Record<string, number>
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
		return <div>Loading...</div>
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

	const labels = Object.keys(activityData)

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Monthly Activity",
				data: Object.values(activityData),
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	}

	return (
		<TitleCard title={"Intakes over the last month"}>
			<Line data={data} options={options} />
		</TitleCard>
	)
}

export default Intakes

