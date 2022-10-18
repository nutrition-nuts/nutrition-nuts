import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { useState } from 'react'

interface Props {
  label: string
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
        input={<OutlinedInput label={props.label} />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        sx={{
          width: '30%',
          color: 'white'
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
