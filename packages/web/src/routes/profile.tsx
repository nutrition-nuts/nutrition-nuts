import React, { Component } from 'react'
import NavBar from '../components/navbar'
import '../App.css'
import './profile.css'

class Form extends Component {
  state = {
    name: '',
    age: '',
    height: '',
    weight: '',
    calories: '',
    dr: '',
    allergies: '',
    saveProfile: false,
    showForm: true
  }

  handleChange = (event: { target: { name: any, value: any } }) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    localStorage.setItem('name', JSON.stringify(this.state.name))
    localStorage.setItem('age', JSON.stringify(this.state.age))
    localStorage.setItem('height', JSON.stringify(this.state.height))
    localStorage.setItem('weight', JSON.stringify(this.state.weight))
    localStorage.setItem('calories', JSON.stringify(this.state.calories))
    localStorage.setItem('dr', JSON.stringify(this.state.dr))
    localStorage.setItem('allergies', JSON.stringify(this.state.allergies))
    this.setState({
      name: `${this.state.name}`,
      age: `${this.state.age}`,
      height: `${this.state.height}`,
      weight: `${this.state.weight}`,
      calories: `${this.state.calories}`,
      dr: `${this.state.dr}`,
      allergies: `${this.state.allergies}`,
      saveProfile: true,
      showForm: false
    })
    this.forceUpdate()
  }

  render() {
    return (
      <div className="App">
        <NavBar />
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
                    <label htmlFor="height">Height: </label>
                    <input
                      type="text"
                      name="height"
                      value={this.state.height}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="profile-item">
                    <label htmlFor="weight">Weight: </label>
                    <input
                      type="text"
                      name="weight"
                      value={this.state.weight}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="profile-item">
                    <label htmlFor="calories">Calories/Day: </label>
                    <input
                      type="text"
                      name="calories"
                      value={this.state.calories}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="profile-item">
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
                  </div>

                  <div className="profile-item">
                    <label htmlFor="allergies">Allergies: </label>
                    <select
                      name="allergies"
                      value={this.state.allergies}
                      onChange={this.handleChange}
                    >
                      <option value="select">Select</option>
                      <option value="none">None</option>
                      <option value="peanuts">Peanuts</option>
                      <option value="tree-nuts">Tree Nuts</option>
                      <option value="fish">Fish</option>
                      <option value="eggs">Eggs</option>
                      <option value="soybeans">Soybeans</option>
                      <option value="wheat">Wheat</option>
                      <option value="sesame">Sesame</option>
                      <option value="shellfish">Shellfish</option>
                    </select>
                  </div>

                  <div className="profile-item">
                    <button type="submit">Save</button>
                  </div>
                </form>
              )}
            </article>
            <article>
              {this.state.saveProfile && (
                <article>
                  <div className="profile-item">
                    <h2>Profile Info</h2>
                    <label htmlFor="name">Name: {this.state.name} </label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="height">Height: {this.state.name} </label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="weight">Weight: {this.state.weight} </label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="calories">
                      Calories/Day: {this.state.calories}
                    </label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="dr">
                      Dietary Restrictions: {this.state.dr}{' '}
                    </label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="allergies">
                      Allergies: {this.state.allergies}{' '}
                    </label>
                  </div>
                  <div className="profile-item">
                    <button type="submit">Edit</button>
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

export default Profile
