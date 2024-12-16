// App.js
import React, { useState, useEffect } from "react";
import "./fourA4.css";

function Api4() {
  const [ifscCode, setIfscCode] = useState("");
  const [bankDetails, setBankDetails] = useState(null);
  const [states, setStates] = useState([]); 
  const [filteredStates, setFilteredStates] = useState([]);
  const [stateSearch, setStateSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateBanks, setStateBanks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://bank-apis.justinclicks.com/API/V1/STATE/");
        if (!response.ok) {
          throw new Error("Failed to fetch states.");
        }
        const data = await response.json();

        if (data && Array.isArray(data.STATES)) {
          setStates(data.STATES);
          setFilteredStates(data.STATES); 
          throw new Error("Invalid state data received from the API.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    setFilteredStates(
      states.filter((state) =>
        state.toLowerCase().includes(stateSearch.toLowerCase())
      )
    );
  }, [stateSearch, states]);

  const handleFetchIFSC = async () => {
    if (!ifscCode) {
      setError("Please enter a valid IFSC code.");
      setBankDetails(null);
      return;
    }

    try {
      setError(null); 
      const response = await fetch(
        `https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data. Please check the IFSC code.");
      }
      const data = await response.json();

      if (data && data.BANK) {
        setBankDetails(data);
      } else {
        throw new Error("No details found for the given IFSC code.");
      }
    } catch (err) {
      setError(err.message);
      setBankDetails(null);
    }
  };

  const handleFetchBanksByState = async (state) => {
    try {
      setError(null);
      const response = await fetch(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${state}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bank details for the selected state.");
      }
      const data = await response.json();

      if (data && Array.isArray(data.BANKS)) {
        setStateBanks(data.BANKS); 
      } else {
        throw new Error("No bank data found for the selected state.");
      }
    } catch (err) {
      setError(err.message);
      setStateBanks([]);
    }
  };

  const handleStateClick = (state) => {
    setSelectedState(state);
    handleFetchBanksByState(state); 
  };

  return (
    <div className="container">
      <h1 className="title">Bank Lookup</h1>

   
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter IFSC Code (e.g., BARB0DHRANG)"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value.toUpperCase())} 
          className="input"
        />
        <button onClick={handleFetchIFSC} className="button">
          Fetch Details
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {bankDetails && (
        <div className="details">
          <h2>Bank Details</h2>
          <p><strong>Bank Name:</strong> {bankDetails.BANK}</p>
          <p><strong>Branch:</strong> {bankDetails.BRANCH}</p>
          <p><strong>Address:</strong> {bankDetails.ADDRESS}</p>
          <p><strong>City:</strong> {bankDetails.CITY}</p>
          <p><strong>State:</strong> {bankDetails.STATE}</p>
          <p><strong>Contact:</strong> {bankDetails.CONTACT || "N/A"}</p>
        </div>
      )}

 
      <div className="form-group">
        <input
          type="text"
          placeholder="Search for a state"
          value={stateSearch}
          onChange={(e) => setStateSearch(e.target.value)} 
          className="input"
        />
        {filteredStates.length > 0 ? (
          <ul className="state-list">
            {filteredStates.map((state, index) => (
              <li
                key={index}
                className="state-item"
                onClick={() => handleStateClick(state)} 
              >
                {state}
              </li>
            ))}
          </ul>
        ) : (
          <p>No states found matching your search.</p>
        )}
      </div>

      {selectedState && (
        <div className="details">
          <h2>Banks in {selectedState}</h2>
          {stateBanks.length > 0 ? (
            <ul>
              {stateBanks.map((bank, index) => (
                <li key={index}>
                  <p><strong>Bank Name:</strong> {bank.BANK}</p>
                  <p><strong>Branch:</strong> {bank.BRANCH}</p>
                  <p><strong>City:</strong> {bank.CITY}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No banks found for the selected state.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Api4;
