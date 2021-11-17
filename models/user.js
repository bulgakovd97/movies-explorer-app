const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const validator = require('validator');

const { EMAIL_WRONG, NO_AUTH } = require('../utils/errorMessage');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        const checkEmail = validator.isEmail(email);

        return checkEmail;
      },
      message: EMAIL_WRONG,
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(NO_AUTH));
      }

      return bcrypt.compare(password, user.password)
        .then(matched => {
          if (!matched) {
            return Promise.reject(new Error(NO_AUTH));
          }

          return user;
        });
    });
};


module.exports = mongoose.model('user', userSchema);
