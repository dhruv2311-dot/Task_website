import "./secondA2.css";
import React, { useState } from "react";

const Api2 = () => {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [theme, setTheme] = useState("default"); // Default theme

  // Fetch cocktails based on search term
  const fetchCocktails = async (query) => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      if (data.drinks) {
        setCocktails(data.drinks);
        setTheme("cocktail"); // Set cocktail theme when data loads
      } else {
        setCocktails([]);
        setTheme("default");
      }
    } catch (error) {
      console.error("Failed to fetch cocktails:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchCocktails(searchTerm.trim());
    }
  };

  const handleCategoryClick = (category) => {
    fetchCocktails(category);
  };

  const handleCocktailClick = (cocktail) => {
    setSelectedCocktail(cocktail);
  };

  const closeModal = () => {
    setSelectedCocktail(null);
  };

  return (
    <div className={`menu-container ${theme}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Cocktail Categories</h3>
        <ul>
          <li onClick={() => handleCategoryClick("Margarita")}>Margarita</li>
          <li onClick={() => handleCategoryClick("Martini")}>Martini</li>
          <li onClick={() => handleCategoryClick("Daiquiri")}>Daiquiri</li>
          <li onClick={() => handleCategoryClick("Mojito")}>Mojito</li>
          <li onClick={() => handleCategoryClick("Whiskey Sour")}>Whiskey Sour</li>
          <li onClick={() => handleCategoryClick("Pina Colada")}>Pina Colada</li>
          <li onClick={() => handleCategoryClick("Old Fashioned")}>
            Old Fashioned
          </li>
          <li onClick={() => handleCategoryClick("Negroni")}>Negroni</li>
          <li onClick={() => handleCategoryClick("Cosmopolitan")}>
            Cosmopolitan
          </li>
          <li onClick={() => handleCategoryClick("Mai Tai")}>Mai Tai</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Search Cocktails</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Enter Cocktail Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Cocktails Grid */}
        <div className="items">
          {cocktails.length > 0 ? (
            cocktails.map((cocktail, index) => (
              <div
                className="item"
                key={index}
                onClick={() => handleCocktailClick(cocktail)}
              >
                <div className="image-container">
                  <img
                    src={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    className="cocktail-image"
                  />
                </div>
                <h3>{cocktail.strDrink}</h3>
              </div>
            ))
          ) : (
            <p>
              {searchTerm
                ? "No cocktails found. Try another name."
                : "Enter a Cocktail Name to search."}
            </p>
          )}
        </div>
      </div>

      {/* Modal for Cocktail Details */}
      {selectedCocktail && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedCocktail.strDrink}</h2>
            <img
              src={selectedCocktail.strDrinkThumb}
              alt={selectedCocktail.strDrink}
              className="modal-image"
            />
            <h3>Instructions</h3>
            <p>{selectedCocktail.strInstructions}</p>
            {selectedCocktail.strVideo && (
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedCocktail.strVideo.split("v=")[1]}`}
                  allowFullScreen
                  title={selectedCocktail.strDrink}
                  className="video-iframe"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Api2;
