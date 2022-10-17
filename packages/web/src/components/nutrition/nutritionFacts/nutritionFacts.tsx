import { RecipeModel } from '../../../models/recipeModels'
import { Nutrient } from '../../../utils/nutrient'
import { getPercentageOfDailyRecommendation } from '../../../utils/nutritionRecommendations'
import './nutritionFacts.css'

interface Props {
  recipe: RecipeModel
}

export default function NutritionFacts(props: Props) {
  const recipe = props.recipe
  return (
    <div>
      <section className="performance-facts">
        <header className="performance-facts__header">
          <h1 className="performance-facts__title">Nutrition Facts</h1>
          <p>Serving Per Recipe {recipe.servings}</p>
        </header>
        <table className="performance-facts__table">
          <thead>
            <tr>
              <th colSpan={3} className="small-info">
                Amount Per Serving
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={2}>
                <b>Calories </b>
                {recipe.calories}
              </th>
              <td>
                {recipe.calories_from_fat != null && (
                  <>Calories from Fat {recipe.calories_from_fat}</>
                )}
              </td>
            </tr>
            <tr className="thick-row">
              <td colSpan={3} className="small-info">
                <b>% Daily Value*</b>
              </td>
            </tr>
            <tr>
              <th colSpan={2}>
                <b>Total Fat </b>
                {recipe.fat_g}g
              </th>
              <td>
                <b>
                  {getPercentageOfDailyRecommendation(
                    Nutrient.FAT,
                    recipe.fat_g
                  )}
                  %
                </b>
              </td>
            </tr>
            <tr>
              <td className="blank-cell"></td>
              <th>Saturated Fat {recipe.saturated_fat_g}g</th>
              <td>
                <b>
                  {getPercentageOfDailyRecommendation(
                    Nutrient.SATURATED_FAT,
                    recipe.saturated_fat_g
                  )}
                  %
                </b>
              </td>
            </tr>
            {recipe.cholesterol_mg != null && (
              <tr>
                <th colSpan={2}>
                  <b>Cholesterol </b>
                  {recipe.cholesterol_mg} mg
                </th>
                <td>
                  <b>
                    {getPercentageOfDailyRecommendation(
                      Nutrient.CHOLESTEROL,
                      recipe.cholesterol_mg
                    )}
                    %
                  </b>
                </td>
              </tr>
            )}
            {recipe.sodium_mg != null && (
              <tr>
                <th colSpan={2}>
                  <b>Sodium </b>
                  {recipe.sodium_mg} mg
                </th>
                <td>
                  <b>
                    {getPercentageOfDailyRecommendation(
                      Nutrient.SODIUM,
                      recipe.sodium_mg
                    )}
                    %
                  </b>
                </td>
              </tr>
            )}
            <tr>
              <th colSpan={2}>
                <b>Total Carbohydrate </b>
                {recipe.carbohydrates_g}g
              </th>
              <td>
                <b>
                  {getPercentageOfDailyRecommendation(
                    Nutrient.CARBOHYDRATES,
                    recipe.carbohydrates_g
                  )}
                  %
                </b>
              </td>
            </tr>
            {recipe.dietary_fiber_g != null && (
              <tr>
                <td className="blank-cell"></td>
                <th>Dietary Fiber {recipe.dietary_fiber_g}g</th>
                <td>
                  <b>
                    {getPercentageOfDailyRecommendation(
                      Nutrient.DIETARY_FIBER,
                      recipe.dietary_fiber_g
                    )}
                    %
                  </b>
                </td>
              </tr>
            )}
            <tr>
              <td className="blank-cell"></td>
              <th>Sugars {recipe.sugars_g}g</th>
              <td></td>
            </tr>
            <tr className="thick-end">
              <th colSpan={2}>
                <b>Protein </b>
                {recipe.protein_g}g
              </th>
              <td></td>
            </tr>
          </tbody>
        </table>

        <table className="performance-facts__table--grid">
          <tbody>
            <tr>
              {recipe.vitamin_a_iu_IU != null && (
                <td colSpan={2}>Vitamin A {recipe.vitamin_a_iu_IU} IU</td>
              )}
              {recipe.vitamin_c_mg != null && (
                <td>Vitamin C {recipe.vitamin_c_mg}mg</td>
              )}
            </tr>
            <tr className="thin-end">
              {recipe.calcium_mg != null && (
                <td colSpan={2}>Calcium {recipe.calcium_mg}mg</td>
              )}
              {recipe.iron_mg != null && <td>Iron {recipe.iron_mg}mg</td>}
            </tr>
          </tbody>
        </table>

        {/* <p className="small-info">
        * Percent Daily Values are based on a 2,000 calorie diet. Your daily
        values may be higher or lower depending on your calorie needs:
      </p>

      <table className="performance-facts__table--small small-info">
        <thead>
          <tr>
            <td colSpan={2}></td>
            <th>Calories:</th>
            <th>2,000</th>
            <th>2,500</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={2}>Total Fat</th>
            <td>Less than</td>
            <td>65g</td>
            <td>80g</td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>Saturated Fat</th>
            <td>Less than</td>
            <td>20g</td>
            <td>25g</td>
          </tr>
          <tr>
            <th colSpan={2}>Cholesterol</th>
            <td>Less than</td>
            <td>300mg</td>
            <td>300 mg</td>
          </tr>
          <tr>
            <th colSpan={2}>Sodium</th>
            <td>Less than</td>
            <td>2,400mg</td>
            <td>2,400mg</td>
          </tr>
          <tr>
            <th colSpan={3}>Total Carbohydrate</th>
            <td>300g</td>
            <td>375g</td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th colSpan={2}>Dietary Fiber</th>
            <td>25g</td>
            <td>30g</td>
          </tr>
        </tbody>
      </table>

      <p className="small-info">Calories per gram:</p>
      <p className="small-info text-center">
        Fat 9 &bull; Carbohydrate 4 &bull; Protein 4
      </p> */}
      </section>
    </div>
  )
}
