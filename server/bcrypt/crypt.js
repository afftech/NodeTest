const bcrypt = require('bcrypt');


module.exports = (myPlaintextPassword, hash) => {
    console.log(myPlaintextPassword)
    console.log(hash)
    bcrypt.compare(myPlaintextPassword, hash).then(function (result) {
        return result
    })
}