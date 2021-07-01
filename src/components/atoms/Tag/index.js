import React from 'react';
import { connect } from 'react-redux';
import './index.css';

const Tag = ({ type, index, text, onTagClick, styleSetting }) => {
	return (
		<span
			className={type === 'circle' ? `circle material-icons` : 'tag'}
			onClick={() => onTagClick(index)}
			style={styleSetting}
		>
			{text}
		</span>
	);
};

const mapStateToProps = state => {
	return { tagList: state.tagList };
};

export default connect(mapStateToProps)(Tag);
