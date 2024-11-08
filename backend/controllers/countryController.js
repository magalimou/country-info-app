const axios = require('axios');

const getAvailableCountries = async (req, res) => {
    try {
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching available countries' });
    }
};

const getCountryInfo = async (req, res) => {
    const { countryCode } = req.params;
    try {
        const commonName = await getCommonName(countryCode);
        const [borderResponse, populationResponse, flagResponse] = await Promise.all([
            axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`),
            axios.get('https://countriesnow.space/api/v0.1/countries/population'),
            axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
        ]);

        const countryData = {
            borders: borderResponse.data.borders,
            populationData: populationResponse.data.data.filter(item => item.country === commonName)[0],
            flagUrl: flagResponse.data.data.find(flag => flag.iso2 === countryCode)?.flag
        };        

        res.json(countryData);
    } catch (error) {
        console.error("Error fetching country information:", error);
        res.status(500).json({ error: 'Error fetching country information' });
    }
};

async function getCommonName(countryCode) {
    try {
        const response = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        const commonName = response.data.commonName;
        return commonName;
    } catch (error) {
        console.error(`Error fetching common name for country code ${countryCode}:`, error);
        throw new Error('Could not retrieve common name');
    }
}

module.exports = { getAvailableCountries, getCountryInfo };
