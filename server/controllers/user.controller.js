import User from "../models/user.model.js"


export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({message:"user does not found"})
        }
        const safeUser = user.toObject()
        delete safeUser.passwordHash
        delete safeUser.salt
        return res.status(200).json(safeUser)
    } catch (error) {
         return res.status(500).json({message:`failed to get currentUser ${error}`})
    }
}