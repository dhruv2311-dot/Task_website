import React, { useState, useEffect } from "react";
import "./App.css";

const Api1 = () => {
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata");
        const data = await response.json();
        const meal = data.meals[0];

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim()) {
            ingredients.push({ ingredient, measure });
          }
        }

        setMealDetails({
          ...meal,
          ingredients,
        });
      } catch (error) {
        console.error("Failed to fetch meal details:", error);
      }
    };

    fetchMeal();
  }, []);

  if (!mealDetails) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{mealDetails.strMeal}</h1>
      <div className="meal-details">
        <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} className="meal-image" />
        <div className="meal-info">
          <p><strong>Category:</strong> {mealDetails.strCategory}</p>
          <p><strong>Area:</strong> {mealDetails.strArea}</p>
          <p><strong>Tags:</strong> {mealDetails.strTags}</p>
          <h2>Ingredients</h2>
          <ul>
            {mealDetails.ingredients.map((item, index) => (
              <li key={index}>{item.measure} {item.ingredient}</li>
            ))}
          </ul>
          <h2>Instructions</h2>
          <p>{mealDetails.strInstructions}</p>
          <a href={mealDetails.strYoutube} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </div>
      </div>
    </div>
  );
};

export default Api1;