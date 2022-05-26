const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required:[true,"Username is requierd"],
        unique:true
    },
    firstName: {
        type: String,
        required:[true,"First Name is requierd"]
    },
    LastName: {
        type: String,
        required:[true,"Last Name is requierd"]
    },
    userEmail: {
        type: String,
        required: [true,"Email address is required"],
        unique:true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    userDOB:{
        type:Date,
        required:[true,'Please add date of birth']
    },
    userCity: {
        type: String,
        required:[true,"City is requierd"]
    },
    userState: {
        type: String,
        required:[true,"State  is requierd"]
    },
    userBio: {
        type: String,
        required:[true,"User Bio is requierd"]
    },
    userHobbies: {
        type: String,
        required:[true,"User NHobbies are requierd"]
    },
    
    password: {
        type: String,
        // required:[true,"Password is required"],
        // minLength: [8,"Passwords MUST be at least 8 Characters"]
    }
},{timestamps:true})

// UserSchema.virtual("confirmPassword")
//     .get(() => this._confirmPassword)
//     .set((value) => this._confirmPassword = value)

// UserSchema.pre('validate', function(next) {
//     if (this.password !== this.confirmPassword) {
//         this.invalidate('confirmPassword', 'Password must match confirm password');
//     }
//     next();
//     });

    UserSchema.pre('save', function(next) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                console.log("UserSchema line 71: " + hash)
                console.log("UserSchema line 72: " + this.password)
                next();
            });
        });
        
    UserSchema.methods.comparePassword = function(attemptPassword, cb) {
        bcrypt.compare(attemptPassword, this.password, function(err, isMatch){
            console.log("UserSchema line 77")
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };
    UserSchema.plugin(uniqueValidator,{message: 'This Field need to be unique'});
    module.exports = mongoose.model('User',UserSchema)