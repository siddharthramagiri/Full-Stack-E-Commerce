const dotenv = require('dotenv').config();
const http = require('http');
const express = require('express');
const {connectDB} = require('./config/dbConnection');
const {userRoutes} = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);


try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
} catch (err) {
    console.error(err);
    process.exit(1);
}