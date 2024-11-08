import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableCountries } from '../services/countryService';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAvailableCountries();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const handleSearch = () => {
    if (countryCode) {
      navigate(`/country-info/${countryCode}`);
    }
  };

  return (
    <div>
      <h1>Available Countries</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter country code (e.g., CL)"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-2">
          Search
        </button>
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Country Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index}>
              <td>{country.name}</td>
              <td>{country.countryCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountryList;
