import { Chart as ChartJS, Filler, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import TitleCard from "../Cards/TitleCard"
import config from "../../constants/config"
import { useEffect, useState } from "react"

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend)

function AgeDistribution() {
	type TAgeCount = {
		youngCount: string
		middleCount: string
		adultCount: string
		oldCount: string
	}
	const [ageData, setAgeData] = useState<TAgeCount | null>(null)
	const [ready, setReady] = useState(false)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${config.backendUrl}/admin/analytics/age/count`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
					},
				}
				)
				const data: {
					payload: TAgeCount
				} = await response.json()
				setAgeData(data.payload)
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
	if (!ageData) {
		return <div>No data found</div>
	}
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as "top",
			},
		},
	}

	const labels = ["<25", "26-40", "41-55", "55+"]

	const data = {
		labels,
		datasets: [
			{
				label: "Number of Users",
				data: [
					ageData.youngCount,
					ageData.middleCount,
					ageData.adultCount,
					ageData.oldCount,
				],
				backgroundColor: [
					"rgba(75, 192, 192, 1)",
					"rgba(255, 159, 64, 1)",
					"rgba(255, 205, 86, 1)",
					"rgba(153, 102, 255, 1)",
				],
				borderColor: [
					"rgba(75, 192, 192, 0.8)",
					"rgba(255, 159, 64, 0.8)",
					"rgba(255, 205, 86, 0.8)",
					"rgba(153, 102, 255, 0.8)",
				],
				borderWidth: 1,
			},
		],
	}

	return (
		<TitleCard title={"Age Distribution"}>
			<Pie options={options} data={data} />
		</TitleCard>
	)
}

export default AgeDistribution

