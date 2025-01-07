import { TFood, TFoodRecommendationNutrients } from '../types/food';
import { TActivityLevels } from '../types/nutrition';
import { TGender } from '../types/user';

function calculateCalorieNeeds(
	weightKg: number,
	heightCm: number,
	age: number,
	gender: TGender,
	activityLevel: TActivityLevels
): number {
	// Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
	let bmr;
	if (gender === 'MALE') {
		bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
	} else if (gender === 'FEMALE') {
		bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
	} else if (gender === 'OTHER') {
		const maleBmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
		const femaleBmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
		bmr = (maleBmr + femaleBmr) / 2;
	} else {
		throw new Error('Invalid gender specified.');
	}

	// Not Fixed: This is generally suggested by the WHO
	const activityMultipliers: Record<TActivityLevels, number> = {
		SEDENTARY: 1.2, // Little or no exercise
		LIGHTLY_ACTIVE: 1.375, // Light exercise/sports 1-3 days/week
		MODERATELY_ACTIVE: 1.55, // Moderate exercise/sports 3-5 days/week
		VERY_ACTIVE: 1.725, // Hard exercise/sports 6-7 days a week
		SUPER_ACTIVE: 1.9, // Very hard exercise/physical job & exercise
	};

	// Get the activity multiplier; default to light if not found
	const activityMultiplier =
		activityMultipliers[activityLevel] ||
		activityMultipliers['LIGHTLY_ACTIVE'];

	// Calculate Total Daily Energy Expenditure (TDEE)
	const tdee = bmr * activityMultiplier;

	return tdee;
}

// Belgian mathematician and statistician Adolphe Quetelet
function calculateBMI(weightKg: number, heightCm: number): number {
	// Convert height from centimeters to meters
	const heightM = heightCm / 100;
	// Calculate BMI
	const bmi = weightKg / (heightM * heightM);
	return parseFloat(bmi.toFixed(2)); // Returns BMI rounded to two decimal places
}

// WHO
function getBMICategory(bmi: number): string {
	if (bmi < 16) {
		return 'Severe Thinness';
	} else if (bmi >= 16 && bmi < 17) {
		return 'Moderate Thinness';
	} else if (bmi >= 17 && bmi < 18.5) {
		return 'Mild Thinness';
	} else if (bmi >= 18.5 && bmi < 25) {
		return 'Normal';
	} else if (bmi >= 25 && bmi < 30) {
		return 'Overweight';
	} else if (bmi >= 30 && bmi < 35) {
		return 'Obese Class I';
	} else if (bmi >= 35 && bmi < 40) {
		return 'Obese Class II';
	} else {
		return 'Obese Class III';
	}
}

function calculateRecommendedNutrients(
	calorie: number
): TFoodRecommendationNutrients {
	const nutrientsRdi: TFoodRecommendationNutrients = {
		calories: 2000,
		carbohydrate: 275,
		total_fat: 78,
		cholesterol: 0.3,
		protein: 50,
		fiber: 28,
		sugars: 50,
		sodium: 2.3,
		vitamin_d: 0.00002,
		calcium: 1.3,
		iron: 0.018,
		caffeine: 0.4,
	};

	// scaled RDi = RDI * C/2000
	const scaledNutrients = Object.keys(nutrientsRdi).reduce((acc, key) => {
		acc[key] =
			(nutrientsRdi[key as keyof TFoodRecommendationNutrients] *
				calorie) /
			2000;
		return acc;
	}, {} as any);

	return scaledNutrients;
}

export function calculateEmbeddings(current: number, target: number) {
	if (current > target) return -1;
	// ratio is 0 to 1
	const ratio = (target - current) / target;
	// convert to -1 to x
	const normalized = ratio * 2 - 1;
	// Clamp the value to the range [-1, 1]
	return Math.max(-1, Math.min(normalized, 1));
}

export default {
	calculateCalorieNeeds,
	calculateBMI,
	getBMICategory,
	calculateRecommendedNutrients,
	calculateEmbeddings,
};

