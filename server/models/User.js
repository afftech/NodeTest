const bcrypt = require('bcrypt');

module.exports = (Mongoose) => {
  const User_schema = new Mongoose.Schema({
    name: String,
    password: String,
    email: String,
  });
  User_schema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedpass = await bcrypt.hash(this.password, salt)
      this.password = hashedpass
      next()
    }
    catch (err) {
      next(err)
      console.log(err)
    }
  })
  User_schema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err); cb(null, isMatch);
    });
  };
  /*Users_schema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) { return cb(err); }
  
      cb(null, isMatch);
    });
  };*/

 // const User = Mongoose.model('User', Users_schema, "User")


  return Mongoose.model('User', User_schema);//{ User }
}
