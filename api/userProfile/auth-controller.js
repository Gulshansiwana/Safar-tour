const jwt = require('jsonwebtoken');
const User = require("../userProfile/user-model");
const REST_API = require("../../utils/crudHelper");


const register = async (req, res) => {
  try {
    const user = await REST_API._add(req, res, User);
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(400).json({ error: 'Failed to register user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ user, token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(400).json({ error: 'Failed to login' });
  }
};

const logout = async (req, res) => {
  try {
    // Optionally, clear any session or token stored client-side
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(400).json({ error: 'Failed to logout' });
  }
};

const getUserList = async (req, res) => {

    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Permission denied' });
    // }
    const response = await REST_API._getAll(req, res, User);

};

const getUserById = async (req, res) => {

    const { id } = req.params;
    const response = await REST_API._getDataListById(req, res, User, "id", id);

    // if (req.user.role !== 'admin' && req.user.id !== response.id) {
    //   return res.status(403).json({ error: 'Permission denied' });
    // }

};

const updateUser = async (req, res) => {

    const response = await REST_API._update(req, res, User);
    // if (response[0] !== 1) {
    //   return res.status(404).json({ error: 'User not found or update failed' });
    // }
    // res.status(200).json({ message: 'User updated successfully' });
 
};

const deleteUser = async (req, res) => {

    const response = await REST_API._delete(req, res, User);
    // if (response !== 1) {
    //   return res.status(404).json({ error: 'User not found or delete failed' });
    // }
    // res.status(200).json({ message: 'User deleted successfully' });

};

module.exports = {
  register,
  login,
  logout,
  getUserList,
  getUserById,
  updateUser,
  deleteUser
};
