const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    unique: true,
    type: String,
    required: [true, 'Vui lòng cung cấp username']
  },
  fullName: {
      type: String,
      required: [true, 'Vui lòng cung cấp họ và tên']
    },
  email: {
    required: [true, 'Vui lòng cung cấp email'],
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Vui lòng cung cấp email đúng format']
  },
  password: {
    type: String,
    required: [true, 'Vui lòng cung cấp password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Vui lòng cung cấp xác nhận mật khẩu'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Mật khẩu xác nhận không giống với mật khẩu'
    }
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: Date,
});

userSchema.virtual('donateActions', {
  ref: 'DonateAction',
  localField: '_id', 
  foreignField: 'donator',
});


//Encryption password for user
userSchema.pre('save', async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});


//User compare password and passwordConfirm
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
}
//User change passwordAfter login

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;