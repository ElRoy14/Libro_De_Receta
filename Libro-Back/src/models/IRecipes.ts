import IIngredients from "./IIngredients";
import INutritionFacts from "./INutritionFacts";
import IUtensils from "./IUtensils";

export default interface IRecipes {
    name: string;
    description: string;
    portions: number;
    preparationTime: string;
    difficulty: string;
    cost: number;
    ingredients: IIngredients[];
    utensils: IUtensils[];
    procedure: string[];
    nutritionFacts: INutritionFacts;
    images: string[];
    linkedRecipes: string[];
    advices: string[];
    parentId: string;
}