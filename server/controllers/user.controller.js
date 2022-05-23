const User = require('../models/user.model');

module.exports = {

    createUser: (req, res) => {
        const profilePic = req.file.filename
        let user = req.body
        user.userProfilePic = profilePic
        User.create(user)
            .then(newUser => {res.json(newUser)})
            .catch(err => {res.status(400).json(err)})
    },
    loginUser:  (async (req,res) => {
        try{
            const findUser = await User.findOne({username: req.body.username})
            console.log(findUser)
            if(findUser === null){
                console.log('invalid login attempt','this is from first check if null')
                res.status(400).json({message:"invalid login attempt"})
            }else {
                bcrypt.compare(req.body.password,findUser.password)
                    .then((isPasswordValid) => {
                        if(isPasswordValid){
                            console.log("password is valid")
                            res.cookie('usertoken',
                                jwt.sign({
                                    id: findUser._id,
                                    username:findUser.username
                                },process.env.JWT_SECRET),
                                {
                                    httpOnly:true,
                                    expires: new Date(Date.now()+ 9000000)
                                }
                            ).json({
                                message:"Succesfully",
                                userLoggedIn: findUser.username,
                                userId: findUser._id
                            })
                        }
                        else {
                            console.log('invalid login attempt, username or password')
                            res.status(400).json({message:"invalid Attempt"})
                        }
                    })
            }
            
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message:'Something went wrong with login process',error:err})
    }
    }),
    logout:(async(req,res) => {
        console.log("loging out")
        res.clearCookie("usertoken")
        res.json({
            message: "You have successfully logged out "
        })
    }),    

    getAllUsers: (req, res) => {
        console.log(req.body)
        User.find({})
            .then(allUsers => {
                res.json(allUsers)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    getOneUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .then(oneUser => {
                res.json(oneUser)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate( {_id: req.params.id}, req.body, {runValidators: true, new: true})
            .then(updatedUser => {
                res.json(updatedUser)
            })
            .catch(err => {res.status(400).json(err)
                console.log(err)
            })
    },

    deleteUser: (req, res) => {
        User.deleteOne( {_id: req.params.id} )
            .then(deleteConfirmation => {
                res.json(deleteConfirmation)
            })
            .catch(err => {
                res.json({message: 'Something went wrong: ', error: err})
            });
    },
    getLoggedInUser: (async(req,res) =>{
        // this need more work based on what user date we want to send to the frontend
        try{
            // const decodedJWT = jwt.decode(req.cookies.usertoken,{complete:true})
            const findUser = await User.findOne({_id:req.jwtpayload.id})
            console.log(findUser)
            res.json(findUser)
        }
        catch(err){
            console.log(err)
            res.status(404).json({message:'some weird error'})
        }
    })

};
