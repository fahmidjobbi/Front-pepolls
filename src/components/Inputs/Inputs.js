import React from 'react';
import './Inputs.css';

const Inputs = props => {
  const style = {
    width: `${props.width}%`,
    height: `${props.height}%`,
  };
  return (
    <input
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
      pattern={props.pattern}
      disabled={props.disabled}
      style={style}
    />
  );
};

export default Inputs;
