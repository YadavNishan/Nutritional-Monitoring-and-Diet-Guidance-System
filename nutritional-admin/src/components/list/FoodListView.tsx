import React from "react"
import { TFoodMinimal } from "../../types/food"
import { formatNutrientString } from "../../utils/nutrient"

type PFoodListView = {
	foods: TFoodMinimal[] | null
}

const FoodListView: React.FC<PFoodListView> = ({ foods }) => {
	const mapRows = () => {
		if (!foods || foods.length === 0) {
			return (
				<tr>
					<td colSpan={10} className="h-16 text-center">
						No foods found.
					</td>
				</tr>
			)
		}
		return foods.map((food, index) => (
			<tr key={index} className="border-b border-[#191e24]">
				<td>{index + 1}</td>
				<td>{food.id}</td>
				<td>{food.name}</td>
				<td>{formatNutrientString(food.calories)}</td>
				<td>{formatNutrientString(food.carbohydrate)}</td>
				<td>{formatNutrientString(food.total_fat)}</td>
				<td>{formatNutrientString(food.cholesterol)}</td>
				<td>{formatNutrientString(food.protein)}</td>
				<td>{formatNutrientString(food.fiber)}</td>
				<td>{formatNutrientString(food.sodium)}</td>
				<td>{formatNutrientString(food.calcium)}</td>
			</tr>
		))
	}

	return (
		<div className="w-full overflow-x-auto">
			<table className="table w-full">
				<thead>
					<tr>
						<th></th>
						<th>ID</th>
						<th>Name</th>
						<th>Calories</th>
						<th>Carbohydrate (g)</th>
						<th>Total Fat (g)</th>
						<th>Cholesterol (mg)</th>
						<th>Protein (g)</th>
						<th>Fiber (g)</th>
						<th>Sodium (mg)</th>
						<th>Calcium (mg)</th>
					</tr>
				</thead>
				<tbody>{mapRows()}</tbody>
			</table>
		</div>
	)
}

export default FoodListView

