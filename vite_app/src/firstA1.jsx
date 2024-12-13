import "./App.css";
import React, { useState } from "react";

const Api1 = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null); // State to hold the selected meal
  const MAX_RESULTS = 10; // Maximum number of results to display

  const fetchMeals = async (query) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      if (data.meals) {
        const mealsWithIngredients = data.meals.map((meal) => {
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
              ingredients.push({ ingredient, measure });
            }
          }
          return { ...meal, ingredients };
        });

        // Limit results to MAX_RESULTS
        setMeals(mealsWithIngredients.slice(0, MAX_RESULTS));
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchMeals(searchTerm.trim());
    }
  };

  const handleMealClick = (meal) => {
    setSelectedMeal(meal); // Set the selected meal
  };

  const closeModal = () => {
    setSelectedMeal(null); // Close the modal
  };

  return (
    <div className="menu-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Meal Categories</h3>
        <ul>
          <li onClick={() => fetchMeals("Breakfast")}>Breakfast</li>
          <li onClick={() => fetchMeals("Lunch")}>Lunch</li>
          <li onClick={() => fetchMeals("Dinner")}>Dinner</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Search</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Enter Meal Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Items Grid */}
        <div className="items">
          {meals.length > 0 ? (
            meals.map((meal, index) => (
              <div
                className="item"
                key={index}
                onClick={() => handleMealClick(meal)} // Click handler to open modal
              >
                <div className="image-container">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="meal-image"
                  />
                </div>
                <h3>{meal.strMeal}</h3>
                <p>
                  <strong>Category:</strong> {meal.strCategory}
                </p>
                <p>
                  <strong>Area:</strong> {meal.strArea}
                </p>
              </div>
            ))
          ) : (
            <p>
              {searchTerm
                ? "No meals found. Try another name."
                : "Enter a Meal Name to search."}
            </p>
          )}
        </div>
      </div>

      {/* Modal for Meal Details */}
      {selectedMeal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            <h2>{selectedMeal.strMeal}</h2>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              className="modal-image"
            />
            <h3>Instructions</h3>
            <p>{selectedMeal.strInstructions}</p>
            {selectedMeal.strYoutube && (
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedMeal.strYoutube.split("v=")[1]}`}
                  allowFullScreen
                  title={selectedMeal.strMeal}
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Api1;
