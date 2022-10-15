import React, { Component } from 'react'
import Sidebar from '../components/sidebar'
import '../App.css'
import './profile.css'

class Form extends Component {
  state = {
    name: localStorage.getItem('name') ?? '',
    age: localStorage.getItem('age') ?? '',
    calories: localStorage.getItem('calories') ?? '',
    dr: localStorage.getItem('dr') ?? '',
    allergies: localStorage.getItem('allergies') ?? '',
    saveProfile: false,
    showForm: true,
    count: 0
  }

  handleChange = (event: { target: { name: any, value: any } }) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    localStorage.setItem('name', this.state.name)
    localStorage.setItem('age', this.state.age)
    localStorage.setItem('calories', this.state.calories)
    localStorage.setItem('dr', this.state.dr)
    localStorage.setItem('allergies', this.state.allergies)
    this.setState({
      name: `${this.state.name}`,
      age: `${this.state.age}`,
      calories: `${this.state.calories}`,
      dr: `${this.state.dr}`,
      allergies: `${this.state.allergies}`,
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
      // console.log(this.state)
    }
  }

  increaseCount = () => {
    return this.setState({ ...this.state, count: this.state.count + 1 })
  }

  decreaseCount = () => {
    return this.setState({ ...this.state, count: this.state.count - 1 })
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
                      <option value="peanuts">Peanuts</option>
                      <option value="tree-nuts">Tree Nuts</option>
                      <option value="fish">Fish</option>
                      <option value="egg">Eggs</option>
                      <option value="soy">Soybeans</option>
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
              {!this.state.showForm && (
                <article>
                  <div className="profile-item">
                    <h2>Profile Info</h2>
                    <label htmlFor="name">
                      Name: {localStorage.getItem('name')}{' '}
                    </label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="age">
                      Age: {localStorage.getItem('age')}{' '}
                    </label>
                  </div>

                  <div className="profile-item">
                    <label htmlFor="calories">
                      Calories/Day: {localStorage.getItem('calories')}{' '}
                    </label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="dr">
                      Dietary Restrictions: {localStorage.getItem('dr')}{' '}
                    </label>
                  </div>
                  <div className="profile-item">
                    <label htmlFor="allergies">
                      Allergies: {localStorage.getItem('allergies')}{' '}
                    </label>
                  </div>
                  <div className="profile-item">
                    <button
                      type="submit"
                      onClick={() => this.setState({ showForm: true })}
                    >
                      Edit
                    </button>
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
