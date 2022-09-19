import React from 'react'
import NavBar from '../components/navbar'
import '../App.css'
import './profile.css'
import { useState, useEffect, Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { getOverlayDirection } from "react-bootstrap/esm/helpers";
import { reduceEachLeadingCommentRange } from "typescript";

export default function Profile() {
const [allergies] = useState(["None", "Peanuts", "Tree Nuts", "Fish", "Eggs", "Soybeans", "Wheat", "Sesame", "Shellfish"]); 
const [selects, setSelects] = useState(String);
const [saved, setSave] = useState('');
const [name, setName] = useState('');
const [age, setAge] = useState('');
const [height, setHeight] = useState('');
const [weight, setWeight] = useState('');
const [calories, setCalories] = useState('');

function saveProfile(){
  var profileInfo = {
    name: name,
    age: age,
    height: height,
    weight: weight,
    calories: calories,
    selects: selects
  }
  localStorage.setItem('profileInfo', JSON.stringify(profileInfo))
}
export default function Profile () {
  const [allergies] = useState(['None', 'Peanuts', 'Tree Nuts', 'Fish', 'Eggs', 'Soybeans', 'Wheat', 'Sesame', 'Shellfish'])

  return (
    <div className="App">
      <NavBar />


      <div className="profile-container">
        <div className="profile-item">
          <h2>Profile Info</h2>
          <label htmlFor="profile-name">Name: </label>
          <input type="text" name="profile-name" value={name} onChange={(e) =>{setName(e.target.value)}}/>
        </div>

        <div className="profile-item">
          <label htmlFor="profile-age">Age: </label>
          <input type="text" name="profile-age" value={age} onChange={(e) =>{setAge(e.target.value)}}/>
        </div>

        <div className="profile-item">
          <label htmlFor="profile-height">Height: </label>
          <input type="text" name="profile-height" value={height} onChange={(e) =>{setHeight(e.target.value)}} />
        </div>

        <div className="profile-item">
          <label htmlFor="profile-weight">Weight: </label>
          <input type="text" name="profile-weight" value={weight} onChange={(e) =>{setWeight(e.target.value)}} />
        </div>
        <div className="profile-item">
          <label htmlFor="profile-calories/day">Calories/Day: </label>
          <input type="text" name="profile-calories/day" value={calories} onChange={(e) =>{setCalories(e.target.value)}}/>
        </div>

        <div className="profile-item">
          <label htmlFor="profile-dr">Dietary Restrictions: </label>
          <select value={selects} onChange={e=>setSelects(e.target.value)}> 
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
          <label htmlFor="profile-allergies">Food Allergies: </label>
            <Multiselect 
            isObject={false}
            onRemove={(event) => {
              console.log(event);
            }}
            onSelect={(event) => {
              console.log(event);
            }}
            options={allergies}
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
          <button onClick={saveProfile}>Save</button>
        </div>

      </div>
    
    </div>
  )
}
}
