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
import { Button } from '@mui/material'
import { MultiSelectCheckMarks } from '../components/general/MultiSelectCheckmarks'
import { possibleAllergies } from '../utils/allergy'

function getAllergiesFromLocalStorage() {
  try {
    return (JSON.parse(localStorage.getItem('allergies') ?? ''))
  } catch (error) {
    return []
  }
}

class Form extends Component {
  state = {
    name: localStorage.getItem('name') ?? '',
    age: localStorage.getItem('age') ?? '',
    calories: getNutrientDailyRecommendation(Nutrient.CALORIES).toString(),
    protein: getNutrientDailyRecommendation(Nutrient.PROTEIN).toString(),
    carbs: getNutrientDailyRecommendation(Nutrient.CARBOHYDRATES).toString(),
    fat: getNutrientDailyRecommendation(Nutrient.FAT).toString(),
    dr: localStorage.getItem('dr') ?? '',
    allergies: getAllergiesFromLocalStorage() as string[],
    saveProfile: false,
    showForm: true,
    count: 0,
    possibleAllergies: ['Peanuts', 'Tree Nuts', 'Fish', 'Eggs', 'Soy']
  }

  handleChange = (event: { target: { name: any; value: any } }) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    localStorage.setItem('name', this.state.name)
    localStorage.setItem('age', this.state.age)
    localStorage.setItem('dr', this.state.dr)
    // localStorage.setItem('allergies', this.state.allergies)
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
    setNutrientDailyRecommendation(Nutrient.CALORIES, +this.state.calories)
    setNutrientDailyRecommendation(Nutrient.PROTEIN, +this.state.protein)
    setNutrientDailyRecommendation(Nutrient.CARBOHYDRATES, +this.state.carbs)
    setNutrientDailyRecommendation(Nutrient.FAT, +this.state.fat)
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
                    <label htmlFor="name">Name: </label>
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="profile-item">
                    <label htmlFor="age">Age: </label>
                    <input
                      type="text"
                      name="age"
                      value={this.state.age}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="profile-item">
                    <label htmlFor="calories">Calories/Day: </label>
                    <input
                      type="number"
                      min="1000"
                      name="calories"
                      value={this.state.calories}
                      onChange={this.handleChange}
                    />
                    <Button
                      sx={{ marginLeft: '1rem', background: '#617c93' }}
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
                    <label htmlFor="protein">Daily Protein Intake (g): </label>
                    <input
                      type="number"
                      min="0"
                      name="protein"
                      value={this.state.protein}
                      onChange={this.handleChange}
                    />
                    <Button
                      sx={{ marginLeft: '1rem', background: '#617c93' }}
                      variant="contained"
                      onClick={() => {
                        this.resetMacroToDefault(Nutrient.PROTEIN)
                        this.setState({
                          protein: getNutrientDailyRecommendation(
                            Nutrient.PROTEIN
                          )
                        })
                      }}
                    >
                      Reset to default
                    </Button>
                  </div>

                  <div className="profile-item">
                    <label htmlFor="carbs">
                      Daily Carbohydrate Intake (g):{' '}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="carbs"
                      value={this.state.carbs}
                      onChange={this.handleChange}
                    />
                    <Button
                      sx={{ marginLeft: '1rem', background: '#617c93' }}
                      variant="contained"
                      onClick={() => {
                        this.resetMacroToDefault(Nutrient.CARBOHYDRATES)
                        this.setState({
                          carbs: getNutrientDailyRecommendation(
                            Nutrient.CARBOHYDRATES
                          )
                        })
                      }}
                    >
                      Reset to default
                    </Button>
                  </div>

                  <div className="profile-item">
                    <label htmlFor="fat">Daily Fat Intake (g): </label>
                    <input
                      type="number"
                      min="0"
                      name="fat"
                      value={this.state.fat}
                      onChange={this.handleChange}
                    />
                    <Button
                      sx={{ marginLeft: '1rem', background: '#617c93' }}
                      variant="contained"
                      onClick={() => {
                        this.resetMacroToDefault(Nutrient.FAT)
                        this.setState({
                          fat: getNutrientDailyRecommendation(Nutrient.FAT)
                        })
                      }}
                    >
                      Reset to default
                    </Button>
                  </div>

                  {/* <div className="profile-item">
                    <label htmlFor="dr">Dietary Restrictions: </label>
                    <select
                      name="dr"
                      value={this.state.dr}
                      onChange={this.handleChange}
                    >
                      <option value="select">Select</option>
                      <option value="dairy-free">Dairy Free</option>
                      <option value="keto">Keto</option>
                      <option value="vegan">Vegan</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="pescatarian">Pescatarian</option>
                      <option value="low-carb">Low Carb</option>
                      <option value="gluten-free">Gluten Free</option>
                    </select>
                  </div> */}

                  <div className="profile-item">
                    <label htmlFor="allergies">Allergies: </label>
                    <MultiSelectCheckMarks
                      selected={this.state.allergies}
                      label="Allergies"
                      options={possibleAllergies}
                      onChangeCallback={this.onAllergyMultiSelectChangeCallback}
                    />
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
                    <label htmlFor="name">Name: {this.state.name}</label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="age">Age: {this.state.age}</label>
                  </div>

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
                      {getNutrientDailyRecommendation(Nutrient.CARBOHYDRATES)}
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

                  <div className="profile-item">
                    <label htmlFor="dr">
                      Dietary Restrictions: {this.state.dr}
                    </label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="allergies">
                      Allergies: {this.state.allergies.join(', ')}
                    </label>
                  </div>
                  <div className="profile-item">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ background: 'black' }}
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
