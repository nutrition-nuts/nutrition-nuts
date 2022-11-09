import { Box, BoxProps, Tooltip, Zoom } from '@mui/material'

interface TotalBoxProps extends BoxProps {
  total: number
}

export default function TotalBox(props: TotalBoxProps) {
  const { total } = props

  return (
    <Tooltip
        arrow
        disableFocusListener
        disableTouchListener
        enterDelay={1200}
        title={
            <div>
                Macros are calculated proportional to each other, so this doesn&apos;t need to be 100.
                For example, 10-20-20 is equivalent to 20-40-40.
            </div>
        }
        TransitionComponent={Zoom}
    >
        <Box
            component={'div'}
        >
            Total: { total }
            {total === 100 && (
              ' 🗸'
            )}
        </Box>

  </Tooltip>

  )
}

export { TotalBox }
