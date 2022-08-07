const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const cookies = require('cookie-parser');

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
app.use(cookies());
app.use(express.json());

app.use('/api',authRoutes);
app.use('/api',itemRoutes);
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//     });
// }

const dbURL = config.get('dbURL');
const port = (process.env.PORT || 4000);
// mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb+srv://cluster0.1lstfbx.mongodb.net/?retryWrites=true&w=majority', { user: 'ishika', pass: 'ishikabaid', useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('db connected')
    app.listen(port)})
  .catch((err) => console.log(err));