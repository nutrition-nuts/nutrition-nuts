import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { RecipeModel } from '../../models/recipeModels'
import NutritionFacts from './nutritionFacts/nutritionFacts'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '../TabPanel'

interface Props {
  open: boolean
  handleClose: () => void
  recipe: RecipeModel
}

export default function RecipeModal(props: Props) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    overflow: 'scroll',
    height: '80%',
    p: 4
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const [tab, setTab] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ width: '100%' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.recipe.name}
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab label="Nutrition Details" {...a11yProps(1)} />
              <Tab label="Cook It" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.recipe.summary}
            </Typography>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <NutritionFacts recipe={props.recipe} />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <h4>Ingredients:</h4>
            <ul>
              {props.recipe.ingredients.map((ingredient) => {
                return <li key={ingredient}>{ingredient}</li>
              })}
            </ul>
            <h4>Directions:</h4>
            <ul>
              {props.recipe.directions.map((direction) => {
                return <li key={direction}>{direction}</li>
              })}
            </ul>
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  )
}
