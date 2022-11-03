import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { RecipeModel } from '../../../../models/recipeModels'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '../../../TabPanel'
import RecipeModalOverview from './recipeModalOverview'
import RecipeModalDirections from './recipeModalDirections'
import RecipeModalNutritionDetails from './recipeModalNutritionDetails'
import { modalStyle } from '../modalStyle'

interface Props {
  open: boolean
  handleClose: () => void
  recipe: RecipeModel
}

export default function RecipeModal(props: Props) {
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
      <Box sx={modalStyle}>
        <Box sx={{ width: '100%', '& .MuiCard-root': { background: '#1b1b1b', color: 'white' } }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Box sx={{ fontWeight: 'bold' }}>{props.recipe.name}</Box>
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="Tabs"
              sx={{ '& .MuiButtonBase-root:not(.Mui-selected)': { color: 'white' } }}
            >
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab label="Nutrition Details" {...a11yProps(1)} />
              <Tab label="Cook It" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <RecipeModalOverview recipe={props.recipe} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <RecipeModalNutritionDetails nutrients={props.recipe} />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <RecipeModalDirections recipe={props.recipe} />
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  )
}
