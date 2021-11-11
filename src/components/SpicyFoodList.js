import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All")

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    console.log(newFood);
    // we're using the spread operator (...) to make a copy of our foods array, and insert it into a new array
    // also adding the newly generated food returned by the getNewSpicyFood function at the end of the array
    const newFoodArray = [...foods, newFood]
    // whenever we are updating state, it's important that we always pass a new object/array to setState
    // That's why we're using the spread operator here to make a copy of the array, instead of .push, which will mutate the original array.
    // React will only re-render our component when we set state with a new value
    // so we need to create a new copy of our original array to pass to the setter function, rather than mutating the original array directly and passing a reference to the original array.
    setFoods(newFoodArray)
  }

  /*
  // When user clicks on a food, it removes it
  function handleLiClick(id) {
    // creating a new array that doesn't include a specific element is using the .filter method
    // Calling .filter will return a new array based on which elements match our criteria in the callback function
    // Setting state with this updated list of foods will re-render our component, causing the food to be removed from the list
    const removedFood = foods.filter(food => food.id !== id)
    setFoods(removedFood)
  }
  */

  // When a user clicks on a food, increase the heat by 1
  function handleLiClick(id) {
    // .map will iterate through the array and return a new array
    // Whatever value is returned by the callback function that we pass to .map will be added to this new array
    const increaseHeat = foods.map(food => {
      // If the ID of the food we're iterating over matches the ID of the food we're updating, 
      // return a new food object with the heat level incremented by 1
      if (food.id === id) {
        return { ...food, heatLevel: food.heatLevel + 1 }
      } else {
        // Otherwise, return the original food object
        return food
      }
    })
    setFoods(increaseHeat)
  }

  function handleFilterChange(e) {
    // update the <select> element to set the filterBy variable when its value is changed, like so:
    setFilterBy(e.target.value)
  }

  const foodsToDisplay = foods.filter(food => {
    if (filterBy === "All") {
      return true
    } else {
      return food.cuisine === filterBy
    }
  })

  const foodList = foodsToDisplay.map(food => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ))

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
