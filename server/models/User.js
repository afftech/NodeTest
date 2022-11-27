
module.exports = (Mongoose) => {
  const Users_schema = new Mongoose.Schema({
    name: String,
    password: String
  });
  const User = Mongoose.model('User', Users_schema, "User")

  return {User}
}
