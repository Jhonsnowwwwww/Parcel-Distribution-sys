import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', glow = false, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        glass rounded-xl p-6
        ${glow ? 'glow-blue' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;