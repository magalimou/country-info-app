const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors()); 

app.use('/api', countryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
