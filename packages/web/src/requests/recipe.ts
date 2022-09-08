import {get} from './requests'
import { DailyRecipes } from '../models/recipeModels';



export const getRecipe = async () => {
    const res = await get('/recipes');
    const dailyRecipes: DailyRecipes = JSON.parse(JSON.stringify(res.data));
    return dailyRecipes;
}
