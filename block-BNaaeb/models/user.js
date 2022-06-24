const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) next(err);
      this.password = hashed;
      return next();
    });
  } else {
    next();
  }
});

userSchema.methods.validatePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,result) => {
        return cb(err,result);
    })
}

module.exports = mongoose.model("user", userSchema);
