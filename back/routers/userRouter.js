const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// helper: consistent cookie options for same-origin (Netlify)
function authCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: "lax",            // same-origin XHR works in both dev/prod
    secure: isProd,             // cookies must be Secure in prod HTTPS
    path: "/",
  };
}

router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    if (!email || !password || !passwordVerify) {
      return res.status(400).json({ errorMessage: "Please enter all required fields." });
    }
    if (password.length < 6) {
      return res.status(400).json({ errorMessage: "Please enter a password of at least 6 characters." });
    }
    if (password !== passwordVerify) {
      return res.status(400).json({ errorMessage: "Please enter the same twice for verification." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errorMessage: "An account with this email already exists." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ email, passwordHash });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    res.cookie("token", token, authCookieOptions());
    return res.status(201).send();       // ✅ ensure we actually respond
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errorMessage: "Please enter all required fields." });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    const correctPassword = await bcrypt.compare(password, existingUser.passwordHash);
    if (!correctPassword) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

    res.cookie("token", token, authCookieOptions());
    return res.send();                    // ✅ respond after setting cookie
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(null);

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    return res.json(validatedUser.id);    // matches your frontend’s expectation
  } catch (err) {
    return res.json(null);
  }
});

router.get("/logOut", (req, res) => {
  try {
    // Expire the cookie
    res.cookie("token", "", {
      ...authCookieOptions(),
      expires: new Date(0),
    });
    return res.send();
  } catch (err) {
    return res.json(null);
  }
});

module.exports = router;
