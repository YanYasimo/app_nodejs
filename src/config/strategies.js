const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../models/UserModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function verifyUser(user) {
  if (!user) {
    throw new Error('E-mail not found!');
  }
}

async function verifyPassword(password, hashPassword) {
  const validPassword = await bcrypt.compare(password, hashPassword);
  if (!validPassword) {
    throw new Error('Email or password incorrects!');
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      try {
        const user = await User.searchByEmail(email);
        verifyUser(user);
        await verifyPassword(password, user.hashPassword);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.SECRET_JWT);
        const user = await User.searchById(payload.id);
        done(null, user);
      } catch (error) {
        done(error);
      }      
    }
  )
)
