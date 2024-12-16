import React, { useState, useEffect } from "react";
import "./fourA4.css";

function Api4() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankDetails, setBankDetails] = useState(null);

  // Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://bank-apis.justinclicks.com/API/V1/STATE/"
        );
        if (!response.ok) throw new Error("Failed to fetch states.");
        const data = await response.json();
        console.log("States Response:", data);
        if (data && Array.isArray(data)) {
          setStates(data);
        } else if (data && data.STATES) {
          setStates(data.STATES);
        } else {
          throw new Error("Invalid state data received.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch districts based on the selected state
  const fetchDistricts = async (state) => {
    setSelectedState(state);
    setDistricts([]);
    try {
      setLoading(true);
      const response = await fetch(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${state}/`
      );
      if (!response.ok) throw new Error("Failed to fetch districts.");
      const data = await response.json();
      console.log("Districts Response:", data);
      if (data && Array.isArray(data.DISTRICTS)) {
        setDistricts(data.DISTRICTS);
      } else if (data && data.DISTRICTS) {
        setDistricts(Object.values(data.DISTRICTS));
      } else {
        throw new Error("Invalid district data received.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bank details based on IFSC code
  const fetchBankDetails = async () => {
    if (!ifscCode) {
      setError("Please enter a valid IFSC code.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode}/`
      );
      if (!response.ok) throw new Error("Failed to fetch bank details.");
      const data = await response.json();
      console.log("Bank Details Response:", data);
      if (data && data.BANK) {
        setBankDetails(data);
      } else {
        setError("No details found for the given IFSC code.");
      }
    } catch (err) {
      setError(err.message);
      setBankDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStateClick = (state) => {
    fetchDistricts(state);
  };

  return (
    <div className="container">
      <h1 className="title">Bank Navigation</h1>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* States */}
      <div>
        <h2>States</h2>
        {states.length > 0 ? (
          states.map((state, index) => (
            <p
              key={index}
              className="list-item"
              onClick={() => handleStateClick(state)}
            >
              {state}
            </p>
          ))
        ) : (
          <p>No states available.</p>
        )}
      </div>

      {/* Districts */}
      {districts.length > 0 && (
        <div>
          <h2>Districts in {selectedState}</h2>
          {districts.map((district, index) => (
            <p key={index} className="list-item">
              {district}
            </p>
          ))}
        </div>
      )}

      {/* IFSC Code Input */}
      <div className="ifsc-container">
        <h2>Enter IFSC Code</h2>
        <input
          type="text"
          placeholder="e.g., BARB0DHRANG"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
          className="ifsc-input"
        />
        <button onClick={fetchBankDetails} className="ifsc-button">
          Get Bank Details
        </button>

        {/* Bank Details */}
        {bankDetails && (
          <div className="bank-details">
            <h3>Bank Details</h3>
            <p><strong>Bank:</strong> {bankDetails.BANK}</p>
            <p><strong>Branch:</strong> {bankDetails.BRANCH}</p>
            <p><strong>Address:</strong> {bankDetails.ADDRESS}</p>
            <p><strong>City:</strong> {bankDetails.CITY}</p>
            <p><strong>State:</strong> {bankDetails.STATE}</p>
            <p><strong>Contact:</strong> {bankDetails.CONTACT || "N/A"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Api4;
