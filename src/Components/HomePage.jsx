import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';

function Homepage() {
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const lastClaimTime = localStorage.getItem('lastClaimTime');
        if (lastClaimTime) {
            const remainingTime = 3600000 - (Date.now() - lastClaimTime);
            if (remainingTime > 0) {
                setDisabled(true);
                startCountdown(remainingTime);
            }
        }
    }, []);

    useEffect(() => {
        let timer;
        if (disabled) {
            timer = setInterval(() => {
                const lastClaimTime = localStorage.getItem('lastClaimTime');
                const remainingTime = 3600000 - (Date.now() - lastClaimTime);
                if (remainingTime <= 0) {
                    setDisabled(false);
                    setCountdown('');
                    localStorage.removeItem('lastClaimTime');
                } else {
                    startCountdown(remainingTime);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [disabled]);

    const startCountdown = (time) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    const claimCoupon = async () => {
        try {
            const response = await axios.post('https://couponapp-rerh.onrender.com/claim', {
                cookie: document.cookie
            });
            setMessage(response.data.message);
            setDisabled(true);
            setShowConfetti(true);
            localStorage.setItem('lastClaimTime', Date.now());
            setTimeout(() => setShowConfetti(false), 10000); 
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            
            <h1>Welcome to Coupon App</h1>
            <h1>"Claim Your Exclusive Coupons Here!! No Login Required"</h1>
            <button 
                onClick={claimCoupon} 
                disabled={disabled}
                style={{ 
                    cursor: disabled ? 'not-allowed' : 'pointer',
                }}
                class="button-56" role="button"
            >
                {disabled ? `Next claim in: ${countdown}` : 'Claim Coupon'}
            </button>
            {message && <p >{message}</p>}
            {showConfetti && <Confetti />}
        </div>
    );
}

export default Homepage;
