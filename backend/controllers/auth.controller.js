import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const {username, password, email} = req.body
    try {
        const userExists = await User.findOne({email})
        if (userExists) {
            return res.status(400).json({message: 'User already exists!'})
        }
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save()

        return res.status(201).json({message: 'User registered successfully', user: newUser})
    } catch(error){
        return res.status(500).json({message: "Internal Server error"})
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "Invalid credentials!"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'})
        }
        let token = jwt.sign({id: user._id}, process.env.SECRET_KEY , {expiresIn: '10d'})

        return res.status(200).json({message: 'Login successfully',user, token})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.status(200).json(user)
    } catch(error){
        res.status(500).json({message: error.message})
    }
}


export const addLinks = async (req, res) => {
    const {links} = req.body
    try {
        
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}