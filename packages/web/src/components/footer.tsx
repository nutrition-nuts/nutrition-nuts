import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

export default function Footer() {
  return (<footer>
        <Box
            position='absolute'
            bottom='0'
            width='100%'
            height='90px'
            bgcolor='#6b9294'
            borderTop='solid 3px'
            borderColor='#506f8c'
            color='white'
        >
            <Container maxWidth="lg">
                <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                    <Grid item xs={5}>
                        <Box borderBottom={2}>Links</Box>
                        <Box>
                            <Link href='/' color="inherit">
                                Contact
                            </Link>
                        </Box>
                        <Box>
                            <Link href='/' color="inherit">
                                Support
                            </Link>
                        </Box>
                        <Box>
                            <Link href='/' color="inherit">
                                Social
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item xs={5}>
                        <Box borderBottom={2}>Pages</Box>
                        <Box>
                            <Link href='/profile' color="inherit">
                                Profile
                            </Link>
                        </Box>
                        <Box>
                            <Link href='/nutrition' color="inherit">
                                Nutrition
                            </Link>
                        </Box>
                        <Box>
                            <Link href='/workouts' color="inherit">
                                Workouts
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </footer>)
}
