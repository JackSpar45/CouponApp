const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const coupons = [
    'COUPON1', 'COUPON2', 'COUPON3', 'COUPON4', 'COUPON5',
    'COUPON6', 'COUPON7', 'COUPON8', 'COUPON9', 'COUPON10',
    'COUPON11', 'COUPON12', 'COUPON13', 'COUPON14', 'COUPON15',
    'COUPON16', 'COUPON17', 'COUPON18', 'COUPON19', 'COUPON20'
];
 // List of coupons
let couponIndex = 0;
const userClaims = {}; // { 'user_identifier': { 'lastClaimTime': <timestamp>, 'type': <'ip'|'cookie'> } }

app.post('/claim', (req, res) => {
    const ip = req.ip;
    const cookie = req.body.cookie; 
    const currentTime = Date.now();

    const checkClaimAllowed = (identifier) => {
        if (userClaims[identifier] && currentTime - userClaims[identifier].lastClaimTime < 3600000) {
            return false;
        }
        return true;
    };

    if (!checkClaimAllowed(ip) || !checkClaimAllowed(cookie)) {
        return res.status(429).json({ message: 'Please wait before claiming another coupon.' });
    }

    const coupon = coupons[couponIndex % coupons.length];
    couponIndex += 1;

    userClaims[ip] = { lastClaimTime: currentTime, type: 'ip' };
    userClaims[cookie] = { lastClaimTime: currentTime, type: 'cookie' };

    res.json({ message: `Coupon claimed: ${coupon}` });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
