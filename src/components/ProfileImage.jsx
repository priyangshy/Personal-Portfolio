import React from 'react';
import { motion } from 'framer-motion';
import '../styles/profile.css';

const ProfileImage = React.memo(({ src, alt = 'Profile' }) => {
  return (
    <motion.div 
      className="relative h-96 sm:h-[500px] lg:h-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
        {/* Glowing Aura Background */}
        <div className="profile-glow"></div>

        {/* Profile Image */}
        <motion.img
          src={src}
          alt={alt}
          className="profile-image relative z-10"
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        />
      </div>
    </motion.div>
  );
});

ProfileImage.displayName = 'ProfileImage';

export default ProfileImage;
