import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { useState } from 'react'

interface Props {
  label: string
  labelId: string
  options: string[]
  selected: string[]
  onChangeCallback: (res: string[]) => void
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '30%'
    }
  }
}

export function MultiSelectCheckMarks(props: Props) {
  const [selectedValues, setSelectedValues] = useState<string[]>(props.selected)

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value }
    } = event

    const newSelectedValues =
      typeof value === 'string' ? value.split(',') : value

    setSelectedValues(newSelectedValues)
    props.onChangeCallback(newSelectedValues)
  }

  return (
    <>
      <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        label={props.label}
        labelId={props.labelId}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        inputProps={{
          style: {
            color: 'white'
          }
        }}
        sx={{
          width: '100%',
          color: 'white',
          backgroundColor: '#1b1b1b',
          border: '1px solid #617c93',
          '& .MuiSvgIcon-root': {
            color: 'white'
          }
        }}
      >
        {props.options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedValues.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
