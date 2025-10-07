const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const User = require('./models/userModel');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://casemanager.netlify.app'],
    credentials: true,
    allowedHeaders: ['Access-Control-Allow-Origin', 'content-type']
}));

app.use(cookieParser());

app.listen(process.env.PORT || 9050, () => {
    console.log(`Listening on port ${process.env.PORT || 9050}`);
});

app.use('/cases', require('./routers/caseRouter'));
app.use('/auth', require('./routers/userRouter'));

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to DB');
        }
    }
)