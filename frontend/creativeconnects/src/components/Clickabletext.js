// components/Clickabletext.js
import React from 'react';
import '../styles/Clickabletext.css';

const Clickabletext = ({ icon: Icon, text, href, onClick }) => {
  if (onClick) {
    return (
      <div className="Clickabletext clickable" onClick={onClick}>
        {Icon && <Icon className="Icon" />} {text}
      </div>
    );
  }

  return (
    <a href={href} className="Clickabletext">
      {Icon && <Icon className="Icon" />} {text}
    </a>
  );
};

export default Clickabletext;
