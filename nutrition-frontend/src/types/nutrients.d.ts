export interface Food {
    id: number;
    name: string;
    serving_size: number;
    calories: number;
    carbohydrate: number;
    total_fat: number;
    cholesterol: number;
    protein: number;
    fiber: number;
    sugars: number;
    sodium: number;
    vitamin_d: number;
    calcium: number;
    iron: number;
    caffeine: number;
    saturated_fat?: number;
    sodium?: number;
    choline?: number;
    vitamin_a?: number;
    vitamin_b12?: number;
    vitamin_b6?: number;
    vitamin_c?: number;
    vitamin_e?: number;
    vitamin_k?: number;
    copper?: number;
    magnesium?: number;
    phosphorus?: number;
    potassium?: number;
    zinc?: number;
    glutamic_acid?: number;
    glycine?: number;
    fructose?: number;
    galactose?: number;
    glucose?: number;
    lactose?: number;
    maltose?: number;
    sucrose?: number;
    fat?: number;
    saturated_fatty_acids?: number;
    fatty_acids_total_trans?: number;
    alcohol?: number;
    ash?: number;
    water?: number;
}

export interface DailyIntake {
    id: string;
    userId: string;
    foodId: number;
    quantity: number;
    date: string;
    createdAt: string;
    updatedAt: string;
    Food: Food;
}

export interface TotalIntake {
    calories: number;
    carbohydrate: number;
    total_fat: number;
    cholesterol: number;
    protein: number;
    fiber: number;
    sugars: number;
    sodium: number;
    vitamin_d: number;
    calcium: number;
    iron: number;
    caffeine: number;
}

export interface RecommendedIntake {
    calories: number;
    carbohydrate: number;
    total_fat: number;
    cholesterol: number;
    protein: number;
    fiber: number;
    sugars: number;
    sodium: number;
    vitamin_d: number;
    calcium: number;
    iron: number;
    caffeine: number;
}

export interface Recommendation {
    food: Food;
    score: number;
}

export interface NutritionResponse {
    dailyIntakeObj: DailyIntake[];
    totalIntake: TotalIntake;
    recommendedIntake: RecommendedIntake;
    recommendation: Recommendation[];
}
