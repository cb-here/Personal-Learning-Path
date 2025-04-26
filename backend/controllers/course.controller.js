import Course from '../models/course.model.js'
import User from '../models/user.model.js'

export const getReccomendations = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) return res.status(404).json({message: 'User not found!'})
        
        const reccomendations = await Course.find({
            category: {$in: user.interests},
            level: user.level
        })

        res.status(200).json(reccomendations)
    }catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
}