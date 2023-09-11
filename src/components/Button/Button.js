
import './Button.css';
import React from 'react';

const Button = (props) => {
  const style = {
    marginLeft: `${props.marginLeft}px`,
    marginTop: `${props.marginTop}px`,
    width: `${props.width}px`,
    height: `${props.height}px`,

  };

  return (
    <button
      style={style}
      className={props.className}
      type={props.type}
      value={props.value}
      id={props.id}
      disabled={props.disabled}
      onClick={props.onClick}
    >
            <img src={props.imgSrc} alt={props.alt} />

      <p style={{ display: 'inline-block' ,  fontSize: `${props.fontSize}px` }}>{props.p}</p>
      <a style={{ fontSize: `${props.fontSize}px` }} href={props.Link}>
        {props.text}
      </a>
    </button>
  );
};

export default Button;



