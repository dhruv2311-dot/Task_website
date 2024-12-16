import "./firstA1.css";
import React, { useState, useEffect } from "react";

const Api1 = () => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const MAX_RESULTS = 10;

  // Fetch and sort categories alphabetically
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      const data = await response.json();

      if (data.categories) {
        const sortedCategories = data.categories.sort((a, b) =>
          a.strCategory.localeCompare(b.strCategory)
        );
        setCategories(sortedCategories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch meals by search term or category
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

        // Sort meals alphabetically and limit to MAX_RESULTS
        mealsWithIngredients.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        setMeals(mealsWithIngredients.slice(0, MAX_RESULTS));
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    }
  };

  // Fetch categories on component load
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchMeals(searchTerm.trim());
    }
  };

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const closeModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="menu-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Meal Categories</h3>
        <ul>
          <li onClick={() => fetchMeals("Beef")}>Beef</li>
          <li onClick={() => fetchMeals("Breakfast")}>Breakfast</li>
          <li onClick={() => fetchMeals("Chicken")}>Chicken</li>
          <li onClick={() => fetchMeals("Dessert")}>Dessert</li>
          <li onClick={() => fetchMeals("Goat")}>Goat</li>
          <li onClick={() => fetchMeals("Lamb")}>Lamb</li>
          <li onClick={() => fetchMeals("Miscellaneous")}>Miscellaneous</li>
          <li onClick={() => fetchMeals("Pasta")}>Pasta</li>
          <li onClick={() => fetchMeals("Pork")}>Pork</li>
          <li onClick={() => fetchMeals("Seafood")}>Seafood</li>
          <li onClick={() => fetchMeals("Side")}>Side</li>
          <li onClick={() => fetchMeals("Starter")}>Starter</li>
          <li onClick={() => fetchMeals("Vegan")}>Vegan</li>
          <li onClick={() => fetchMeals("Vegetarian")}>Vegetarian</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Search Meals</h1>
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
                onClick={() => handleMealClick(meal)}
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
              &times;
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
