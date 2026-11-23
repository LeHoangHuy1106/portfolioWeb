import React from 'react';

const ProgressBar: React.FC<{ value: number; max: number }> = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div style={styles.container}>
      <div style={{ ...styles.progress, width: `${percentage}%` }}>
        <span style={styles.label}>{value}</span>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    height: '10px',
    width: '50%',
    backgroundColor: '#e0e0df',
    borderRadius: '5px',
    margin: '20px auto',
  },
  progress: {
    height: '100%',
    backgroundColor: '#ff6600',
    borderRadius: '5px',
    textAlign: 'right',
    transition: 'width 0.5s ease-in-out',
  },
  label: {
    position: 'absolute',
    top: '-25px',
    right: '0',
    transform: 'translateX(50%)',
    backgroundColor: '#ff6600',
    color: '#fff',
    padding: '2px 5px',
    borderRadius: '3px',
    fontSize: '12px',
  },
};

export default ProgressBar;
