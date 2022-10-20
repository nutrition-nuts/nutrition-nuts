import { RecipeModel } from '../../../../models/recipeModels'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { CardContent, Grid, Link } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MacroProgressCards from '../general/macroProgressCards'

interface Props {
  recipe: RecipeModel
}

export default function RecipeModalOverview(props: Props) {
  return (
    <>
      <Card sx={{ marginTop: '1rem' }}>
        <CardContent>
          <Typography
            sx={{
              marginBottom: '0.5rem',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}
          >
            Description
          </Typography>
          {props.recipe.summary}
          {props.recipe.yield != null && (
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
              {' '}
              Yields {props.recipe.yield}
            </Typography>
          )}
          <br />
          <br /> - {props.recipe.author}
        </CardContent>
      </Card>
      <div style={{ display: 'inline' }}>
        <MacroProgressCards nutrientInfo={props.recipe} />
        <Link href={props.recipe.url} underline="hover" target={'_blank'}>
          <Card sx={{ marginTop: '2rem', width: 'fit' }}>
            <CardContent sx={{ color: 'primary' }}>
              <Grid container>
                <Grid item xs={8}>
                  See {props.recipe.name} on AllRecipes!
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                  <ArrowForwardIosIcon />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  )
}
