const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: true,            
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

let connected = false;
async function ensureDb() {
  if (!connected) {
    await mongoose.connect(process.env.DB_CONNECTION);
    connected = true;
    console.log('Mongo connected');
  }
}
app.use(async (_req, _res, next) => { await ensureDb(); next(); });

// Mount your existing routers (unchanged code)
app.use('/auth', require('../../back/routers/userRouter'));
app.use('/cases', require('../../back/routers/caseRouter'));

module.exports.handler = serverless(app);
