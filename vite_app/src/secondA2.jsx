import React, { useState, useEffect } from 'react';

const Api2 = () => {
  const [cocktails, setCocktails] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
      .then((res) => res.json())
      .then((data) => {
        setCocktails(data.drinks);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Cocktails</h1>
      <input
        type="text"
        placeholder="Search Cocktails"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredCocktails.map((cocktail) => (
            <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
            
          ))}
        </ul>
      )}
    </div>
  );
};

export default Api2;