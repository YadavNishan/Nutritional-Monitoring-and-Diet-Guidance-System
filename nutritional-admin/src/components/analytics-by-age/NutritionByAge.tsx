import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import TitleCard from "../Cards/TitleCard"
import { useEffect, useState } from "react"
import config from "../../constants/config"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const NutritionByAge = () => {
	type TRecommendedIntake = {
		calories: number
		carbohydrate: number
		total_fat: number
		cholesterol: number
		protein: number
		fiber: number
		sodium: number
		calcium: number
	}
	type TGenderNutrients = {
		youngNutrients: TRecommendedIntake
		middleNutrients: TRecommendedIntake
		adultNutrients: TRecommendedIntake
		oldNutrients: TRecommendedIntake
	}
	const [nutrientData, setNutrientData] = useState<TGenderNutrients | null>(
		null
	)
	const [ready, setReady] = useState(false)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${config.backendUrl}/admin/monthly-intake/age`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
					},
				}
				)
				const data: {
					payload: TGenderNutrients
				} = await response.json()
				setNutrientData(data.payload)
				setReady(true)
				console.log(data.payload)
			} catch (error) {
				console.error("Error fetching users:", error)
			}
		}

		fetchUsers()
	}, [])

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
	}

	const labels = [
		"Calories (cal)",
		"Carbohydrate  (g)",
		"Total Fat (g)",
		"Protein (g)",
		"Fiber (dg)",
		"Cholesterol (cg)",
		"Sodium (cg)",
		"Calcium (cg)",
	]

	const generateDataSet = (nutrient: TRecommendedIntake) => {
		if (!nutrient) {
			return []
		}
		return [
			nutrient.calories || 0,
			nutrient.carbohydrate || 0,
			nutrient.total_fat || 0,
			nutrient.protein || 0,
			nutrient.fiber * 10 || 0,
			nutrient.cholesterol * 100 || 0,
			nutrient.sodium * 100 || 0,
			nutrient.calcium * 100 || 0,
		]
	}

	if (!ready) {
		return (
			<div className="skeleton grid h-[600px] w-full place-items-center">
				Loading
			</div>
		)
	}
	if (!nutrientData) {
		return <div>No data found</div>
	}

	const data = {
		labels,
		datasets: [
			{
				label: "Young",
				data: generateDataSet(nutrientData.youngNutrients),
				backgroundColor: "rgba(75, 192, 192, 0.8)",
			},
			{
				label: "Middle-aged",
				data: generateDataSet(nutrientData.middleNutrients),
				backgroundColor: "rgba(255, 159, 64, 0.8)",
			},
			{
				label: "Adult",
				data: generateDataSet(nutrientData.adultNutrients),
				backgroundColor: "rgba(255, 205, 86, 0.8)",
			},
			{
				label: "Old",
				data: generateDataSet(nutrientData.oldNutrients),
				backgroundColor: "rgba(153, 102, 255, 0.8)",
			},
		],
	}

	return (
		<TitleCard title={"Nutrition By Age"}>
			<Bar options={options} data={data} />
		</TitleCard>
	)
}

export default NutritionByAge

