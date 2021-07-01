import React from 'react';
import './index.css';

const IconButton = ({ text, onBtnClick }) => {
	return (
		<button
			type="button"
			className={`material-icons iconBtn-${text}`}
			onClick={onBtnClick}
		>
			{text}
		</button>
	);
};

export default IconButton;
