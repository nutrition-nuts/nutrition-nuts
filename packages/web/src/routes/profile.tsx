import React, { Component } from 'react'
import Sidebar from '../components/sidebar'
import '../App.css'
import './profile.css'
import {
  getNutrientDailyRecommendation,
  setNutrientDailyRecommendation,
  resetDailyRecommendationToDefault
} from '../utils/nutritionRecommendations'
import { Nutrient } from '../utils/nutrient'
import { Button, Tooltip, Zoom, IconButton } from '@mui/material'
import { MultiSelectCheckMarks } from '../components/general/MultiSelectCheckmarks'
import { possibleAllergies } from '../utils/allergy'
import StyledTextField from '../components/StyledTextField'
import NutritionSlider from './sliders/sliders'
import InfoIcon from '@mui/icons-material/Info'

function getAllergiesFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem('allergies') ?? '')
  } catch (error) {
    return []
  }
}

function getRatiosFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem('macroRatios') ?? '')
  } catch (error) {
    return {
      protein: 25,
      carbs: 50,
      fat: 25
    }
  }
}

class Form extends Component {
  state = {
    name: localStorage.getItem('name') ?? '',
    age: localStorage.getItem('age') ?? '',
    calories: getNutrientDailyRecommendation(Nutrient.CALORIES),
    protein: getNutrientDailyRecommendation(Nutrient.PROTEIN),
    carbs: getNutrientDailyRecommendation(Nutrient.CARBOHYDRATES),
    fat: getNutrientDailyRecommendation(Nutrient.FAT),
    dr: localStorage.getItem('dr') ?? '',
    allergies: getAllergiesFromLocalStorage() as string[],
    saveProfile: false,
    showForm: true,
    count: 0,
    possibleAllergies: ['Peanuts', 'Tree Nuts', 'Fish', 'Eggs', 'Soy'],
    macroRatios: getRatiosFromLocalStorage()
  }

  handleChange = (event: { target: { name: any; value: any } }) => {
    this.setState({
      [event.target.name]: event.target.value.replace(/[^0-9]/gi, '')
    })
  }

  handleChangeS = (event: { target: { name: any; value: any } }) => {
    this.setState({
      [event.target.name]: event.target.value.replace(/[^a-z -]/gi, '')
    })
  }

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    localStorage.setItem('name', this.state.name)
    localStorage.setItem('age', this.state.age)
    localStorage.setItem('dr', this.state.dr)
    // localStorage.setItem('allergies', this.state.allergies)
    localStorage.setItem('macroRatios', JSON.stringify(this.state.macroRatios))
    this.updateMacroGoals()
    localStorage.setItem('allergies', JSON.stringify(this.state.allergies))
    this.setState({
      name: `${this.state.name}`,
      age: `${this.state.age}`,
      calories: `${this.state.calories}`,
      dr: `${this.state.dr}`,
      allergies: this.state.allergies,
      showForm: false
    })
    this.forceUpdate()
  }

  componentDidMount(): void {
    if (
      localStorage.getItem('name') !== null &&
      localStorage.getItem('name') !== ''
    ) {
      this.setState({ showForm: false })
    }
  }

  updateMacroGoals = () => {
    // normalize inputs so they don't have to add up to 100%
    const total = Object.values(this.state.macroRatios).reduce((acc, x) => Number(acc) + Number(x), 0)
    const cals = this.state.calories / Number(total)

    setNutrientDailyRecommendation(Nutrient.CALORIES, +this.state.calories)
    setNutrientDailyRecommendation(Nutrient.PROTEIN, +Math.floor(cals * this.state.macroRatios.protein / 4))
    setNutrientDailyRecommendation(Nutrient.CARBOHYDRATES, +Math.floor(cals * this.state.macroRatios.carbs / 4))
    setNutrientDailyRecommendation(Nutrient.FAT, +Math.floor(cals * this.state.macroRatios.fat / 9))
  }

  resetMacroToDefault = (nutrient: Nutrient) => {
    resetDailyRecommendationToDefault(nutrient)
  }

  increaseCount = () => {
    return this.setState({ ...this.state, count: this.state.count + 1 })
  }

  decreaseCount = () => {
    return this.setState({ ...this.state, count: this.state.count - 1 })
  }

  onAllergyMultiSelectChangeCallback = (allergies: string[]) => {
    this.setState({ allergies })
  }

  onSliderChangeCallback = (name: string, value: number) => {
    this.setState((state) => {
      const temp = Object(state).macroRatios
      temp[name] = value
      return { macroRatios: temp }
    })
  }

  render() {
    return (
      <div className="App">
        <Sidebar />
        <div className="profile-container">
          <section>
            <article>
              {this.state.showForm && (
                <form onSubmit={this.handleSubmit}>
                  <div className="profile-item">
                    <h2>Profile Info</h2>
                  </div>
                  <div className="row">
                    <div className="column left">
                      <div className="profile-item">
                        {/* <label htmlFor="name">Name: </label> */}
                        <StyledTextField
                          sx={{ m: 1, maxWidth: 200 }}
                          type="text"
                          label="Name"
                          InputProps={{
                            style: {
                              color: 'white'
                            }
                          }}
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChangeS}
                        />
                      </div>

                      <div className="profile-item">
                        {/* <label htmlFor="age">Age: </label> */}
                        <StyledTextField
                          sx={{ m: 1, maxWidth: 200 }}
                          type="text"
                          name="age"
                          label="Age"
                          InputProps={{
                            style: {
                              color: 'white'
                            }
                          }}
                          value={this.state.age}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="allergies-item">
                        <label htmlFor="llergies">Food Allergies</label>
                      </div>
                      <div className="profile-item">
                        <MultiSelectCheckMarks
                          selected={this.state.allergies}
                          label="Allergies"
                          options={possibleAllergies}
                          onChangeCallback={
                            this.onAllergyMultiSelectChangeCallback
                          }
                        />
                      </div>
                    </div>

                    <div className="column right">
                      <div className="profile-item">
                        {/* <label htmlFor="calories">Calories/Day: </label> */}
                        <Tooltip
                          arrow
                          disableFocusListener
                          disableTouchListener
                          title={
                            <div>
                              How should I set this?
                              <br></br>
                              <br></br>
                              Although the common baseline for caloric intake is 2000, this number was chosen as minimum for adults. Individual needs
                              vary greatly, based on factors like physcial activity, muscle mass, gender, pregnancy, and thyroid function.
                              We recommend using the Harris-Benedict equation and adjusting based on your needs.
                            </div>
                          }
                          TransitionComponent={Zoom}
                        >
                          <StyledTextField
                            type="number"
                            inputProps={{
                              min: '1000',
                              style: {
                                color: 'white'
                              }
                            }}
                            name="calories"
                            label="Calories"
                            value={this.state.calories}
                            onChange={this.handleChange}
                          />
                        </Tooltip>
                        <Button
                          sx={{ marginLeft: '1rem' }}
                          variant="contained"
                          onClick={() => {
                            this.resetMacroToDefault(Nutrient.CALORIES)
                            this.setState({
                              calories: getNutrientDailyRecommendation(
                                Nutrient.CALORIES
                              )
                            })
                          }}
                        >
                          Reset to default
                        </Button>
                      </div>
                      <div className="profile-item">
                        <label htmlFor="protein">Daily Protein Intake
                          <Tooltip
                            arrow
                            disableFocusListener
                            disableTouchListener
                            title={
                              <div>
                                Protein, made of amino acids, is used to build tissue in your body.
                                <br></br>
                                <br></br>
                                Below 20% of the diet, you may not have enough to maintain and build muscle.
                                <br></br>
                                <br></br>
                                Extra protein above 30% gets mostly wasted in the urine,
                                and can cause ammonia buildup if kidney or liver function is impaired.
                              </div>
                            }
                            TransitionComponent={Zoom}
                          >
                            <IconButton>
                              <InfoIcon
                                sx={{
                                  color: 'white'
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </label>
                        <NutritionSlider
                          name='protein'
                          min={10}
                          max={40}
                          sliderValue={this.state.macroRatios.protein ?? 25}
                          lowerMark={20}
                          upperMark={30}
                          onChangeCallback={this.onSliderChangeCallback}
                        />
                      </div>

                      <div className="profile-item">
                        <label htmlFor="carbs">
                          Daily Carbohydrate Intake
                            <Tooltip
                              arrow
                              disableFocusListener
                              disableTouchListener
                              title={
                                <div>
                                  Carbohydrates—sugars and starches—are quick sources of energy thanks to their high solubility in water.  They are the preferred fuel source
                                  for the brain, the liver, and the muscles during high-intensity exercise.
                                  <br></br>
                                  <br></br>
                                  The body can create enough carbohydrates endogenously (from protein) to survive.  However, doing so raises stress hormones such as prolactin and cortisol.
                                  Since the brain uses almost exclusively carbohydrates, and accounts for 20% of the body&apos;s energy needs, we suggest setting this to at least 20%.
                                  <br></br>
                                  <br></br>
                                  High carbohydrate diets are generally well tolerated except by diabetics.
                                </div>
                              }
                              TransitionComponent={Zoom}
                            >
                              <IconButton>
                                <InfoIcon
                                  sx={{
                                    color: 'white'
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                        </label>
                        <NutritionSlider
                          name='carbs'
                          min={0}
                          max={70}
                          sliderValue={this.state.macroRatios.carbs ?? 50}
                          lowerMark={20}
                          upperMark={60}
                          onChangeCallback={this.onSliderChangeCallback}
                        />
                      </div>

                      <div className="profile-item">
                        <label htmlFor="fat">Daily Fat Intake
                          <Tooltip
                            arrow
                            disableFocusListener
                            disableTouchListener
                            title={
                              <div>
                                Fats are a denser source of energy, and are the muscles&apos; preferred fuel source at rest.  They are also used throughout the body for structural purposes.
                                <br></br>
                                <br></br>
                                The body can create enough fat endogenously to survive on a very low-fat diet; however, this may not be optimal due to fat&apos;s role in steroid hormone synthesis.
                                <br></br>
                                <br></br>
                                High-fat diets are generally well tolerated, assuming other nutrients are not restricted.  However, fat metabolism produces less carbon dioxide
                                than carbohydrate metabolism, which causes lower tissue oxygenation.  So, high-fat diets may exacerbate symptoms of poor red blood cell or lung function.
                              </div>
                            }
                            TransitionComponent={Zoom}
                          >
                            <IconButton>
                              <InfoIcon
                                sx={{
                                  color: 'white'
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </label>
                        <NutritionSlider
                          name='fat'
                          min={0}
                          max={70}
                          sliderValue={this.state.macroRatios.fat ?? 25}
                          lowerMark={5}
                          upperMark={50}
                          onChangeCallback={this.onSliderChangeCallback}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-item">
                    <Button
                      variant="contained"
                      sx={{ background: '#617c93' }}
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                </form>
              )}
            </article>
            <article>
              {!this.state.showForm && (
                <article>
                  <div className="profile-item">
                    <h2>Profile Info</h2>
                  </div>
                  <div className="row">
                    <div className="column left">
                      <div className="profile-item">
                        <label htmlFor="name">Name: {this.state.name}</label>
                      </div>

                      <div className="profile-item">
                        <label htmlFor="age">Age: {this.state.age}</label>
                      </div>
                      <div className="profile-item">
                        <label htmlFor="allergies">
                          Allergies: {this.state.allergies.join(', ')}
                        </label>
                      </div>
                    </div>
                    <div className="column right">
                      <div className="profile-item">
                        <label htmlFor="calories">
                          Calories/Day:{' '}
                          {getNutrientDailyRecommendation(Nutrient.CALORIES)}{' '}
                        </label>
                      </div>

                      <div className="profile-item">
                        <label htmlFor="protein">
                          Daily Protein Intake:{' '}
                          {getNutrientDailyRecommendation(Nutrient.PROTEIN)}
                          {'g '}
                        </label>
                      </div>

                      <div className="profile-item">
                        <label htmlFor="carbs">
                          Daily Carbohydrate Intake:{' '}
                          {getNutrientDailyRecommendation(
                            Nutrient.CARBOHYDRATES
                          )}
                          {'g '}
                        </label>
                      </div>

                      <div className="profile-item">
                        <label htmlFor="fat">
                          Daily Fat Intake:{' '}
                          {getNutrientDailyRecommendation(Nutrient.FAT)}
                          {'g '}
                        </label>
                      </div>
                    </div>
                    {/* <div className="profile-item">
                    <label htmlFor="dr">
                      Dietary Restrictions: {this.state.dr}
                    </label>
                  </div> */}
                  </div>
                  <div className="profile-item">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ background: '#617c93' }}
                      onClick={() => this.setState({ showForm: true })}
                    >
                      Edit
                    </Button>
                  </div>
                </article>
              )}
            </article>
          </section>
        </div>
      </div>
    )
  }
}

class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <Form />
      </React.Fragment>
    )
  }
}

export { Profile }
