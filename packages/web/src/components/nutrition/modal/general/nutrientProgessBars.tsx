import { Card, CardContent, Typography } from '@mui/material'
import { NutrientInfoModel } from '../../../../models/recipeModels'
import { Nutrient } from '../../../../utils/nutrient'
import LinearNutrientProgress from '../../linearNutrientProgress'

interface Props {
  nutrientInfo: NutrientInfoModel
}

export default function NutrientProgressBars(props: Props) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          Nutrient Profile
        </Typography>
        <LinearNutrientProgress
          nutrient={Nutrient.VITAMIN_A}
          progress={props.nutrientInfo.vitamin_a_iu_IU}
        />
        <LinearNutrientProgress
          nutrient={Nutrient.VITAMIN_C}
          progress={props.nutrientInfo.vitamin_c_mg}
        />
        <LinearNutrientProgress
          nutrient={Nutrient.THIAMIN}
          progress={props.nutrientInfo.thiamin_mg}
        />
        <LinearNutrientProgress
          nutrient={Nutrient.NIACIN}
          progress={props.nutrientInfo.niacin_equivalents_mg}
        />
        <LinearNutrientProgress
          nutrient={Nutrient.IRON}
          progress={props.nutrientInfo.iron_mg}
        />
        <LinearNutrientProgress
          nutrient={Nutrient.CALCIUM}
          progress={props.nutrientInfo.calcium_mg}
        />
        <LinearNutrientProgress
          nutrient={Nutrient.POTASSIUM}
          progress={props.nutrientInfo.potassium_mg}
        />
        <LinearNutrientProgress
          nutrient={Nutrient.MAGNESIUM}
          progress={props.nutrientInfo.magnesium_mg}
        />
        <LinearNutrientProgress
          nutrient={Nutrient.FOLATE}
          progress={props.nutrientInfo.folate_mcg}
        />
      </CardContent>
    </Card>
  )
}
