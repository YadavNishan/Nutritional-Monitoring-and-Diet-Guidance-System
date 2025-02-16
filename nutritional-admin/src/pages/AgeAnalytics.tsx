import React from "react"
import AgeIntakes from "../components/analytics-by-age/AgeIntakes"
import AgeDistribution from "../components/analytics-by-age/AgeDistribution"
import NutritionByAge from "../components/analytics-by-age/NutritionByAge"

const AgeAnalytics: React.FC = () => {
	return (
		<div className="w-full bg-[#191e24] p-6">
			<div className="flex flex-col gap-6">
				<div className="flex w-full justify-evenly gap-6">
					<AgeIntakes />
					<div className="max-w-[500px]">
						<AgeDistribution />
					</div>
				</div>
				<NutritionByAge />
			</div>
		</div>
	)
}

export default AgeAnalytics

