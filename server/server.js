
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectdb from './config/db.js';
import { register, resendOtp, verifyOtp, login, checkUser } from './controllers/authController.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectdb();

// Routes
const router = express.Router();
router.post('/register', register);
router.post('/resend-otp', resendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/check-user', checkUser);

app.use('/api/auth', router);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
