const User = require('../models/user.model')
const {
  validateUserSignup,
  validateUserLogin,
} = require('../validators/user.validator')

exports.createUser = async (req, res) => {
  try {
    const { err } = validateUserSignup(req.body) // Validate the information from the request body
    if (err) return res.status(400).json({ message: err.message })
    const userExist = await User.findOne({ email: req.body.email }) // Checking if the user exist
    if (userExist) return res.status(400).json({ message: 'User exist' })
    const { name, email, password, role } = req.body
    const user = await User.create({ name, email, password, role }) //Creating the user
    if (!user) return res.status(400).json({ message: 'Cannot create user' })

    const token = await user.jwtToken()
    return res.status(201).json({
      message: 'Signup successfull',
      token,
    })
  } catch (error) {
    console.log('Unable to create a User')
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { err } = validateUserLogin(req.body)
    if (err) return res.status(400).json({ message: err.message }) // Validate the users input

    // find the email of the user
    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    )

    const isMatched = await user.comparePassword(req.body.password)
    if (!isMatched)
      return res.status(400).json({ message: 'Incorrect password or email' })

    const token = await user.jwtToken()

    return res.status(200).json({
      message: 'Login successfull',
      token,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  return res.status(200).json({ message: 'Successfully', data: user })
}
