import React from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';

const LayoutToggle = () => {
  const { layout, setLayout } = useStore();

  const handleToggle = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className="layout-toggle">
      <button onClick={() => handleToggle('grid')}>Grid</button>
      <button onClick={() => handleToggle('list')}>List</button>
      <button onClick={() => handleToggle('timeline')}>Timeline</button>
      <motion.div
        className="layout-indicator"
        animate={{ x: layout === 'grid' ? 0 : layout === 'list' ? 100 : 200 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
    </div>
  );
};

export default LayoutToggle;
