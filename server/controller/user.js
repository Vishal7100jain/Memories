import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'


export const signUp = async (req, res) => {
    const { FirstName, LastName, Password, Email } = req.body

    const UserExist = await User.findOne({ Email })
    if (UserExist) return res.status(400).json({ msg: "User Already Exist's" })

    const hashedPassword = await bcrypt.hash(Password, 12)

    const user = await new User({ Name: `${FirstName} ${LastName}`, Email, Password: hashedPassword })
    await user.save()

    const token = jwt.sign({ email: user.Email, userId: user._id }, 'test', { expiresIn: "7d" })
    res.status(200).json({ name: user.Name, userId: user._id, token })
}

export const signIn = async (req, res) => {
    const { Email, Password } = req.body

    const userExist = await User.findOne({ Email })
    if (!userExist) return res.status(404).json({ msg: "Account Not Found !!" })

    const isPasswordCorrect = await bcrypt.compare(Password, userExist.Password)
    if (!isPasswordCorrect) return res.status(404).json({ msg: "Wrong Passwrord" })

    const token = jwt.sign({ email: userExist.Email, userId: userExist._id }, 'test', { expiresIn: "7d" })
    res.status(200).json({ name: userExist.Name, userId: userExist._id, token })
}

export const googleLogin = async (req, res) => {
    const { Email } = req.body
    const userExist = await User.findOne({ Email })

    if (!userExist) return res.status(404).json({ msg: "Account Not Found !!" })

    const token = jwt.sign({ email: userExist.Email, userId: userExist._id }, 'test', { expiresIn: "7d" })
    res.status(200).json({ name: userExist.Name, userId: userExist._id, token })
}
