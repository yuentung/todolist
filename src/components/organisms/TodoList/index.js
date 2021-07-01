import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editTodoDone } from '../../../actions';
import Modal from '../../molecules/Modal';
import Label from '../../atoms/Label';
import Button from '../../atoms/Button';
import Tag from '../../atoms/Tag';
import './index.css';

const TodoList = ({ todoList, tagList, colorList, editTodoDone }) => {
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const date = new Date();
	const formatDate = `${monthNames[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}`;

	const [modalSetting, setModalSetting] = useState({
		initialType: '', // TODO or TAG
		initialAction: '', // ADD_TODO or REMOVE_TODO or EDIT_TODO or ADD_TAG
		selectedTodoIndex: todoList.length,
		initialContent: '',
		initialTagIndex: tagList.length,
		initialColorIndex: colorList.length,
	});

	const [showModal, setShowModal] = useState(false);

	const renderedList = todoList.map((todoItem, todoIndex) => {
		const renderedTag =
			tagList[todoItem.tagIndex] && tagList[todoItem.tagIndex].name ? (
				<Tag
					text={tagList[todoItem.tagIndex].name}
					styleSetting={{
						border: `2px solid ${tagList[todoItem.tagIndex].color}`,
						backgroundColor: tagList[todoItem.tagIndex].color,
					}}
					onTagClick={() => { }}
				/>
			) : null;

		return (
			<div
				key={todoIndex}
				className="item"
				onClick={e => {
					const type = e.target.type || '';
					if (!type.includes('checkbox')) {
						setShowModal(true);
						setModalSetting({
							initialType: 'TODO',
							initialAction: 'EDIT_TODO',
							selectedTodoIndex: todoIndex,
							initialContent: todoItem.content,
							initialTagIndex: todoItem.tagIndex,
							initialColorIndex: tagList[todoItem.tagIndex] ? colorList.indexOf(tagList[todoItem.tagIndex].color) : colorList.length,
						});
					}
				}}
			>
				<input type="checkbox" onClick={() => editTodoDone(todoIndex)} />
				<span
					className="checkbox material-icons"
					style={todoItem.done ? { backgroundColor: '#9CB2F3' } : null}
				>
					{todoItem.done ? 'done' : ''}
				</span>
				<label
					className="content"
					style={todoItem.done ? { color: '#D6D6D6', textDecoration: 'line-through' } : null}
				>
					{todoItem.content}
				</label>
				{renderedTag}
				<span className="arrow material-icons">keyboard_arrow_right</span>
			</div>
		);
	});

	return (
		<div className="todo">
			<div className="banner">
				<h1 className="title">Your Things</h1>
				<p className="date">{formatDate}</p>
			</div>
			<Label text={'All Task'} />
			<div className="list">{renderedList}</div>
			<div className="btnGroup">
				<Button
					type={'add'}
					text={'ADD TODO'}
					onBtnClick={() => {
						setShowModal(true);
						setModalSetting({
							initialType: 'TODO',
							initialAction: 'ADD_TODO',
							selectedTodoIndex: todoList.length,
							initialContent: '',
							initialTagIndex: tagList.length,
							initialColorIndex: colorList.length,
						});
					}}
				/>
			</div>
			{showModal ? <Modal modalSetting={modalSetting} onModalShow={setShowModal} /> : null}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		todoList: state.todoList,
		tagList: state.tagList,
		colorList: state.colorList,
	};
};

export default connect(mapStateToProps, { editTodoDone })(TodoList);
