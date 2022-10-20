import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import {
  consolidateNutrientInfo,
  RecipeModel
} from '../../../../models/recipeModels'
import { modalStyle } from '../modalStyle'

import MacroProgressCards from '../general/macroProgressCards'
import NutrientProgressBars from '../general/nutrientProgessBars'
import { Card, CardContent } from '@mui/material'

interface Props {
  open: boolean
  handleClose: () => void
  recipes: RecipeModel[]
}

export default function DailySummaryModal(props: Props) {
  const consolidatedNutrientInfo = consolidateNutrientInfo(props.recipes)

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={{ width: '100%' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Daily Summary
          </Typography>
          <Card sx={{ marginTop: '1rem' }}>
            <CardContent>
              <Typography>
                <ul>
                  {props.recipes.map((recipe) => {
                    return <li key={recipe.name}>{recipe.name}</li>
                  })}
                </ul>
              </Typography>
            </CardContent>
          </Card>
          <MacroProgressCards nutrientInfo={consolidatedNutrientInfo} />
          <NutrientProgressBars nutrientInfo={consolidatedNutrientInfo} />
        </Box>
      </Box>
    </Modal>
  )
}
