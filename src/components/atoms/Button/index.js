import React from 'react';
import './index.css';

const Button = ({ type, text, onBtnClick }) => {
	return (
		<button
			type="button"
			className={`btn btn-${type}`}
			onClick={onBtnClick}
		>
			{text}
		</button>
	);
};

export default Button;
