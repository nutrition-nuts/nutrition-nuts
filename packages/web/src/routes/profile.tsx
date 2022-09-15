import React, { useState } from 'react'
import NavBar from '../components/navbar'
import '../App.css'
import './profile.css'

import { Multiselect } from 'multiselect-react-dropdown'

export default function Profile () {
  const [allergies] = useState(['None', 'Peanuts', 'Tree Nuts', 'Fish', 'Eggs', 'Soybeans', 'Wheat', 'Sesame', 'Shellfish'])

  return (
    <div className="App">
      <NavBar />
      <div className="profile-container">
        <div className="profile-item">
          <h2>Profile Info</h2>
          <label htmlFor="profile-name">Name: </label>
          <input type="text" name="profile-name" />
        </div>

        <div className="profile-item">
          <label htmlFor="profile-age">Age: </label>
          <input type="text" name="profile-age" />
        </div>

        <div className="profile-item">
          <label htmlFor="profile-height">Height: </label>
          <input type="text" name="profile-height" />
        </div>

        <div className="profile-item">
          <label htmlFor="profile-weight">Weight: </label>
          <input type="text" name="profile-weight" />
        </div>
        <div className="profile-item">
          <label htmlFor="profile-calories/day">Calories/Day: </label>
          <input type="text" name="profile-calories/day" />
        </div>

        <div className="profile-item">
        <label htmlFor="profile-allergies">Food Allergies: </label>
        <Multiselect
        isObject={false}
        onRemove={(event) => {
          console.log(event)
        }}
        onSelect={(event) => {
          console.log(event)
        }}
        options={allergies}
        selectedValues={['None']}
        style={{
          chips: {
            background: '#506f8c'
          },
          multiselectContainer: {
            color: 'black'
          }
        }}
      />
        </div>

        <div className="profile-item">
          <label htmlFor="profile-dr">Dietary Restrictions: </label>
          <select name="profile-dr">
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
          <button>Save</button>
        </div>

      </div>
    </div>
  )
}
