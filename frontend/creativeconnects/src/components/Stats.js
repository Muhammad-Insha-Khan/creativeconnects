import React from 'react';
import '../styles/Stats.css';

const Stats = ({ icon, heading, number }) => {
  return (
    <div className='stat'>
    <div className="stat-card">
      <i className="stat-icon">{icon}</i> {/* Display the icon passed as a prop */}
      <div className="stat-content">
        <h3 className="stat-heading">{heading}</h3>
        <p className="stat-number">{number}</p>
      </div>
    </div>
    </div>
  );
};

export default Stats;
