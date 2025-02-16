import { Chart as ChartJS, Filler, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import TitleCard from "../Cards/TitleCard"
import config from "../../constants/config"
import { useEffect, useState } from "react"

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend)

function GenderDistribution() {
	type TGenderCount = {
		maleCount: string
		femaleCount: string
		otherCount: string
	}
	const [genderData, setGenderData] = useState<TGenderCount | null>(null)
	const [ready, setReady] = useState(false)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${config.backendUrl}/admin/analytics/gender/count`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
						},
					}
				)
				const data: {
					payload: TGenderCount
				} = await response.json()
				setGenderData(data.payload)
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
	if (!genderData) {
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

	const labels = ["Male", "Female", "Other"]

	const data = {
		labels,
		datasets: [
			{
				label: "Number of Users",
				data: [
					genderData.maleCount,
					genderData.femaleCount,
					genderData.otherCount,
				],
				backgroundColor: [
					"rgba(53, 162, 235, 1)",
					"rgba(255, 99, 132, 1)",
					"rgb(128, 128, 128)",
				],
				borderColor: [
					"rgba(53, 162, 235, 1)",
					"rgba(255, 99, 132, 1)",
					"rgb(128, 128, 128)",
				],
				borderWidth: 1,
			},
		],
	}

	return (
		<TitleCard title={"Gender Distribution"}>
			<Pie options={options} data={data} />
		</TitleCard>
	)
}

export default GenderDistribution

