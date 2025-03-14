# CouponApp

## Round-Robin Coupon Distribution with Abuse Prevention

### Objective
Develop a live web application that distributes coupons to guest users in a round-robin manner, incorporating mechanisms to prevent users from exploiting page refreshes to claim multiple coupons within a restricted time frame.

### Features
- **Coupon Distribution:** Assign coupons sequentially to users to ensure even distribution.
- **Guest Access:** Allow users to access the system without requiring login or account creation.
- **Abuse Prevention:** Implement IP and cookie tracking to prevent multiple claims within a restricted time frame.
- **User Feedback:** Provide clear messages indicating successful coupon claims or inform users of the time remaining before they can claim another.

### Tech Stack
- **Frontend:** React, Vite
- **Backend:** Express, Node.js
- **Deployment:** Vercel (Frontend), Render (Backend)

#### Step 1: Clone the Repository
```bash
git clone https://github.com/JackSpar45/CouponApp.git
cd CouponApp
```
#### Step 2: Install Dependencies
npm install

### Screenshots
![Screenshot (149)](https://github.com/user-attachments/assets/cd6fb74e-cc91-4e37-95af-57614b5f8baf)
![Screenshot (150)](https://github.com/user-attachments/assets/c5cf6d15-6abc-4430-b909-6932e64e76a0)



#### Step 3: Run the Backend Locally
npm start

#### Step 4: Set Up the Frontend
npm run dev
