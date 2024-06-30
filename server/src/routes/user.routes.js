const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateDetails
} = require('../controllers/userController');
const { verifyToken } = require("../middlewares/verifyJwtToken");

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', verifyToken, getUserProfile);

router.put('/update', verifyToken, updateDetails);

module.exports = router;
