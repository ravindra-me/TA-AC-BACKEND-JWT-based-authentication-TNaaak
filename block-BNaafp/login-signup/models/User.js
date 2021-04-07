const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const user = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


user.pre('save', async function (next) {
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

user.methods.verifyPassword = async function (password) {
    var result  = await bcrypt.compare(password, this.password);
    return result;
}

module.exports = mongoose.model('User', user);