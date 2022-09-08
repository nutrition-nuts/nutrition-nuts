import React from "react";
import NavBar from "../components/navbar";
import "../App.css";
import './profile.css'

export default function Profile() {

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
          <label htmlFor="profile-allergies">Allergies: </label>
          <select name="profile-allergies"> 
            <option value="na">N/A</option>
            <option value="peanuts">Peanuts</option>
            <option value="tree-nuts">Tree Nuts</option>
            <option value="eggs">Eggs</option>
            <option value="fish">Fish</option>
            <option value="soy-beans">Soy Beans</option>
          </select>
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
  );
}