import { Slider } from '@mui/material'
import { useState, SyntheticEvent } from 'react'

interface NutritionSliderProps {
  name: string
  // macro: Nutrient
  min: number
  max: number
  lowerMark: number
  upperMark: number
  sliderValue: number
  onChangeCallback: (name: string, value: number) => void
}

function percentify(x: number) {
  return String(x).concat('%')
}

export default function NutritionSlider(props: NutritionSliderProps) {
  const { name, min, max, lowerMark, upperMark } = props
  const [sliderValue, setValue] = useState<number>(props.sliderValue)
  const defaultVal = sliderValue

  const handleChange = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
    // activeThumb: number
  ) => {
    setValue(Number(value))
    props.onChangeCallback(name, sliderValue)
  }

  return (
       <div className="profile-item">
        {/* <Box sx={{ width: 400, alignContent: 'center' }}> */}
          <Slider
            aria-label={name}
            defaultValue={defaultVal}
            value={sliderValue}
            // getAriaValueText={valuetext}
            step={1}
            valueLabelDisplay="on"
            marks={
                [
                  {
                    value: min,
                    label: percentify(min)
                  },
                  {
                    value: lowerMark,
                    label: percentify(lowerMark)
                  },
                  {
                    value: upperMark,
                    label: percentify(upperMark)
                  },
                  {
                    value: max,
                    label: percentify(max)
                  }
                ]
            }
            min={min}
            max={max}
            name={name}
            onChange={handleChange}
            onChangeCommitted={handleChange}
            orientation='horizontal'
            valueLabelFormat={(x) => String(x).concat('%')}
            // slot={<div></div>}
            // slotProps={oninput: null}
            sx={
              {
                '& .MuiSlider-markLabel': {
                  color: 'white'
                },
                width: String(max).concat('%')
              }}
          >
          </Slider>
        {/* </Box> */}
      </div>
  )
}

export { NutritionSlider }
