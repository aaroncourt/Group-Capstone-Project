const bcrypt = require("bcrypt");

password = ""
bcrypt.hash('password', 5, function(err, hash) {
            console.log(hash)
            password = hash
            console.log("password: " + password)

    bcrypt.compare('password', hash, function(err, result){
            console.log(result)
    })
})




// bcrypt.hash('mypassword', 10, function(err, hash) {
//     if (err) { throw (err); }

//     bcrypt.compare('mypassword', hash, function(err, result) {
//         if (err) { throw (err); }
//         console.log(result);
//     });
// });