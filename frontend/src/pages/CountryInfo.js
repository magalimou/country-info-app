import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryInfo } from '../services/countryService';

function CountryInfo() {
  const { code } = useParams(); 
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const data = await getCountryInfo(code);
        setCountryInfo(data);
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    };
    fetchCountryInfo();
  }, [code]);

  if (!countryInfo) return <p>Loading country information...</p>;

  const { borders, populationData, flagUrl } = countryInfo;

  return (
    <div>
      <h1>Country Information: {populationData.country}</h1>
      <img src={flagUrl} alt={`${populationData.country} flag`} width="100" />

      <section>
        <h2>General Info</h2>
        <p><strong>Country Code:</strong> {populationData.code}</p>
        <p><strong>ISO3 Code:</strong> {populationData.iso3}</p>
      </section>

      <section>
        <h2>Borders</h2>
        {borders && borders.length > 0 ? (
          <ul>
            {borders.map((border, index) => (
              <li key={index}>
                <strong>{border.commonName}</strong> ({border.officialName}) - {border.region}
              </li>
            ))}
          </ul>
        ) : (
          <p>No border countries available.</p>
        )}
      </section>

      <section>
        <h2>Population Data</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {populationData.populationCounts.map((entry, index) => (
              <tr key={index}>
                <td>{entry.year}</td>
                <td>{entry.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default CountryInfo;

