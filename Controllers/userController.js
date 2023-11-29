const users = require('../Model/userSchema')
const jwt = require('jsonwebtoken')
// register
exports.register = async(req, res) => {
    console.log('inside register controller function');
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            res.status(406).json("Account alredy exist... Pleaase Login")
        }
        else {
            const newUser = new users({
                username, email, password, github: "", linkedin: "", profile: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json(`register API failed,error:${err}`)
    }
}

// login
exports.login = async (req,res) =>{
    console.log("inside login function");
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"sepersecretkey12345")
            res.status(200).json({
                existingUser,token
            })
        }
        else{
            res.status(404).json(`incorrect Email / Password`)
        }
    }
    catch(err){
        res.status(404).json(`login API failed, Error:${err}`)
    }
}

// edit user
exports.editUser = async (req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try{
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile:uploadImage
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(401).json(err)
    }
}