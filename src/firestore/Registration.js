import './Registration.css';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'; 
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegistration = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                 // Create a user profile document in Firestore
            const userProfileRef = doc(db, 'userProfiles', user.uid);
            setDoc(userProfileRef, {
                email: user.email,
                displayName: '', // For profile nickname later
            })

                navigate("/home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Registration error:', errorCode, errorMessage);
            });
    };

    return (
        <div className="registration-container">
            <h2>Registration</h2>
            <form>
                <label>Email:</label>
                <input
                    className="input-field" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    className="input-field" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="register-button" type="button" onClick={handleRegistration}> {/* Apply the CSS class */}
                    Register
                </button>
            </form>
        </div>
    );
}

export default Registration;
