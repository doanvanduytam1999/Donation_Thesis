const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userAdminSchema = new mongoose.Schema({
  username: {
    minlength: 1,
    unique: true,
    type: String,
    required: [true, 'Vui lòng cung cấp username']
  },
  email: {
    type: String,
    required: [true, 'Vui lòng cung cấp email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Vui lòng nhập đúng định dạng email']
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'CTV'],
    default: 'Manager'
  },
  password: {
    type: String,
    required: [true, 'Vui lòng cung cấp password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Vui lòng cung cấp passwordConfirm'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwordConfirm không trùng với password'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
  }
});

userAdminSchema.virtual('donateEnvents', {
    ref: 'DonateEnvent',
    localField: '_id',
    foreignField: 'poster',
})


//Encryption password for user
userAdminSchema.pre('save', async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});


//User compare password and passwordConfirm
userAdminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
}
//User change passwordAfter login

userAdminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
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

const UserAdmin = mongoose.model('UserAdmin', userAdminSchema);
module.exports = UserAdmin;