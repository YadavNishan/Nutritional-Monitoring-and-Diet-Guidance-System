import React from "react"
import NutritionByGender from "../components/analytics-by-gender/NutritionByGender"
import GenderDistribution from "../components/analytics-by-gender/GenderDistribution"
import GenderIntakes from "../components/analytics-by-gender/GenderIntakes"

const GenderAnalytics: React.FC = () => {
	return (
		<div className="w-full bg-[#191e24] p-6">
			<div className="flex flex-col gap-6">
				<div className="flex w-full gap-6 justify-evenly">
						<GenderIntakes />
					<div className="max-w-[500px]">
						<GenderDistribution />
					</div>
				</div>
				<NutritionByGender />
			</div>
		</div>
	)
}

export default GenderAnalytics

