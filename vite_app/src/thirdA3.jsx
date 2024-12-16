import React, { useState } from "react";
import "./thirdA3.css";

const Api3 = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [apiType, setApiType] = useState("books"); 

 
  const fetchData = async (type) => {
    setLoading(true);
    setError(null);
    setData([]);
    setApiType(type);

    const url =
      type === "books"
        ? "https://potterapi-fedeperin.vercel.app/en/books"
        : "https://potterapi-fedeperin.vercel.app/en/characters";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`Fetched ${type}:`, result);
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError(`Failed to fetch ${type}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="button-container">
        <button className="fetch-button" onClick={() => fetchData("books")}>
          Show Books
        </button>
        <button className="fetch-button" onClick={() => fetchData("characters")}>
          Show Characters
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {apiType === "books" && !loading && !error && (
        <div className="book-grid">
          {data.map((book) => (
            <div key={book.id || book.title} className="book-card">
              <img
                src={book.cover || "https://via.placeholder.com/200"}
                alt={book.title || "No Title"}
                className="book-image"
              />
              <div className="book-details">
                <h2 className="book-title">{book.title || "Unknown Title"}</h2>
                <p>
                  <strong>Release Date:</strong> {book.releaseDate || "N/A"}
                </p>
                <p>
                  <strong>Pages:</strong> {book.pages || "N/A"}
                </p>
              </div>
            </div>  
          ))}
        </div>
      )}

     
      {apiType === "characters" && !loading && !error && (
        <div className="character-grid">
          {data.map((character) => (
            <div
              key={character.id || character.name}
              className="character-card"
            >
              <img
                src={character.image || "https://via.placeholder.com/150"}
                alt={character.name || "No Name"}
                className="character-image"
              />
              <div className="character-details">
                <h2 className="character-name">{character.fullName || "Not available"}</h2>
                
                <p>
                  <strong>Nickname:</strong>{" "}
                  {character.nickname || "Not available"}
                </p>
                <p>
                  <strong>House:</strong>{" "}
                  {character.hogwartsHouse || "Not available"}
                </p>
                <p>
                  <strong>Interpreted By:</strong>{" "}
                  {character.interpretedBy || "Not available"}
                </p>
                <p>
                  <strong>Birthdate:</strong>{" "}
                  {character.birthdate || "Not available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Api3;
