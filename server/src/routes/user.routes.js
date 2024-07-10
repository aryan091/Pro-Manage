const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateDetails,
    addUser
} = require('../controllers/user.controller');
const { verifyToken , decodeJwtToken } = require("../middlewares/verifyJwtToken");

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', verifyToken, getUserProfile);

router.put('/update', verifyToken, updateDetails);

router.put('/add-user' , verifyToken , addUser)

module.exports = router;
