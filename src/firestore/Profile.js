// Profile.js


import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Retrieve user profile data from Firestore
    const docRef = doc(db, 'userProfiles', auth.currentUser.uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data());
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleUpdateProfile = () => {
    // Update user profile in Firestore
    const docRef = doc(db, 'userProfiles', auth.currentUser.uid);
    updateDoc(docRef, userProfile)
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating user profile:', error);
      });
  };

  return (
    <div>
      <h2>User Profile</h2>
      {isEditing ? (
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            value={userProfile.displayName}
            onChange={(e) =>
              setUserProfile({ ...userProfile, displayName: e.target.value })
            }
          />
          <button onClick={handleUpdateProfile}>Save</button>
        </div>
      ) : (
        <div>
          <p>Display Name: {userProfile.displayName}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
