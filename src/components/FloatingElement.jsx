import React from 'react'; 
import { motion } from 'framer-motion';
import profile from '../assets/profile.jpg';
const FloatingElement = () => {
  return (
    <div className="profile-container">
    <img src={profile} alt="profile"
    className="profile-image"/>
  </div>
  );
};

export default FloatingElement;