import React from 'react';
import './index.css';

const TextField = ({ upperCase, text, onTextChange }) => {
	return (
		<input
			type="text"
			className="textField"
			value={text}
			onChange={e => onTextChange(upperCase ? e.target.value.toUpperCase() : e.target.value)}
		/>
	);
};

export default TextField;
