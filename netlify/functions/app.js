// netlify/functions/app.js
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


// Detect Netlify local dev
const isLocal = !!process.env.NETLIFY_LOCAL;
// Base path that Netlify Dev uses in Lambda compatibility mode
const base = isLocal ? '/.netlify/functions/app' : '';

const app = express();
const router = express.Router();


router.get('/__alive', (_req, res) => res.json({ ok: true }));



// middleware
router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser());


const uri = process.env.DB_CONNECTION;
if (!uri) throw new Error('Missing DB_CONNECTION');

mongoose.set('bufferCommands', false);
mongoose.connection.on('connected', () => console.log('[mongo] connected'));
mongoose.connection.on('error', e => console.error('[mongo] error:', e?.message || e));

let connectPromise;
function connectOnce() {
  if (!connectPromise) connectPromise = mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  return connectPromise;
}

// ensure DB for every API hit
router.use(async (req, res, next) => {
  try {
    await connectOnce();

    next();
  } catch (e) {
    next(e);
  }
});

// no-cache for API paths
router.use((req, res, next) => {
  if (req.path.startsWith('/auth') || req.path.startsWith('/cases') || req.path.startsWith('/__')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
  next();
});




router.get('/__health', async (_req, res, next) => {
  try { await connectOnce(); res.json({ ok: true }); } catch (e) { next(e); }
});
router.get('/auth/__probe', (_req, res) => res.json({ probe: 'ok' }));


try {
  const userRouter = require('../../back/routers/userRouter');
  const caseRouter = require('../../back/routers/caseRouter');
  router.use('/auth', userRouter);
  router.use('/cases', caseRouter);
  console.log('[routes] mounted /auth and /cases');
} catch (e) {
  console.error('[routes] failed to mount routers:', e?.stack || e);
}


router.use((err, req, res, _next) => {
  console.error('[error]', err?.stack || err);
  res.status(500).end();
});

app.use(base, router);

exports.handler = require('serverless-http')(app);
