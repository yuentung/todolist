import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
	addTodo,
	removeTodo,
	editTodo,
	addTag,
	removeTag,
	editTag,
} from '../../../actions';
import Label from '../../atoms/Label';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';
import IconButton from '../../atoms/IconButton';
import Tag from '../../atoms/Tag';
import './index.css';

const Modal = ({
	modalSetting,
	onModalShow,
	tagList,
	colorList,
	addTodo,
	removeTodo,
	editTodo,
	addTag,
	removeTag,
	editTag,
}) => {
	const {
		initialType,
		initialAction,
		initialContent,
		selectedTodoIndex,
		initialTagIndex,
		initialColorIndex,
	} = modalSetting;

	// Decide which type of modal should be showed, including TodoModal(TODO) and TagModal(TAG)
	const [modalType, setModalType] = useState(initialType);

	// Decide which type of button should be showed in Todo Modal, including AddBtn(ADD_TODO) and (SaveBtn and RemoveBtn)(EDIT_TODO)
	// eslint-disable-next-line no-unused-vars
	const [action, setAction] = useState(initialAction);

	// Decide which type of button should be showed in Tag Modal, including AddBtn(ADD_TAG) and (SaveBtn and RemoveBtn)(EDIT_TAG)
	const [tagAction, setTagAction] = useState('');

	// Store the content in the Todo input element
	const [content, setContent] = useState(initialContent);

	// Store the content in the Tag input element
	const [tagContent, setTagContent] = useState(tagList[initialTagIndex] ? tagList[initialTagIndex].name : '');

	// Store the selected tag
	const [selectedTagIndex, setSelectedTagIndex] = useState(initialTagIndex);

	// Store the selected color
	const [selectedColorIndex, setSelectedColorIndex] = useState(initialColorIndex);

	const tagListInTodoModal = tagList.map((tagItem, tagIndex) => {
		const styleSetting =
			tagIndex === selectedTagIndex
				? {
					border: `2px solid ${tagItem.color}`,
					marginBottom: '10px',
					backgroundColor: tagItem.color,
					boxShadow: '0 0 6px rgba(0, 0, 0, 0.24)',
				}
				: {
					border: `2px solid ${tagItem.color}`,
					marginBottom: '10px',
					backgroundColor: 'transparent',
					color: tagItem.color,
				};

		return tagItem.name ? (
			<Tag
				key={tagIndex}
				index={tagIndex}
				text={tagItem.name}
				onTagClick={() => {
					setSelectedTagIndex(tagIndex);
					setSelectedColorIndex(colorList.indexOf(tagItem.color));
				}}
				styleSetting={styleSetting}
			/>
		) : null;
	});

	const copyTagList = tagList.map(tagItem => tagItem);
	copyTagList.push({ name: '＋', color: '#A4A3F2' });
	const tagListInTagModal = copyTagList.map((tagItem, tagIndex) => {
		const styleSetting =
			tagIndex === selectedTagIndex
				? {
					border: `2px solid ${tagItem.color}`,
					marginBottom: '10px',
					backgroundColor: tagItem.color,
					boxShadow: '0 0 6px rgba(0, 0, 0, 0.24)',
				}
				: {
					border: `2px solid ${tagItem.color}`,
					marginBottom: '10px',
					backgroundColor: 'transparent',
					color: tagItem.color,
				};

		function normalTagFunc() {
			setTagAction('EDIT_TAG');
			setTagContent(tagItem.name);
			setSelectedColorIndex(colorList.indexOf(tagItem.color));
			setSelectedTagIndex(tagIndex);
		}

		function addTagFunc() {
			setTagAction('ADD_TAG');
			setTagContent('');
			setSelectedColorIndex(colorList.length);
			setSelectedTagIndex(tagIndex);
		}

		return tagItem.name ? (
			<Tag
				key={tagIndex}
				index={tagIndex}
				text={tagItem.name}
				onTagClick={tagIndex !== copyTagList.length - 1 ? normalTagFunc : addTagFunc}
				styleSetting={styleSetting}
			/>
		) : null;
	});

	const colorListInTagModal = colorList.map((colorItem, colorIndex) => {
		const styleSetting =
			colorIndex === selectedColorIndex
				? { backgroundColor: colorItem, color: '#FFFFFF' }
				: { backgroundColor: colorItem, color: colorItem };

		return (
			<Tag
				key={colorIndex}
				type={'circle'}
				index={colorIndex}
				text={'done'}
				onTagClick={setSelectedColorIndex}
				styleSetting={styleSetting}
			/>
		);
	});

	const dialogOfTodo = (
		<div className="dialog">
			<IconButton text={'cancel'} onBtnClick={() => onModalShow(false)} />
			<Label text={'Things to Do'} />
			<TextField upperCase={false} text={content} onTextChange={setContent} />
			<Label text={'Type of Things'} />
			<IconButton
				text={'edit'}
				onBtnClick={() => {
					setModalType('TAG');
					if (selectedTagIndex === tagList.length) {
						setTagAction('ADD_TAG');
						setTagContent('');
					} else {
						setTagAction('EDIT_TAG');
						setTagContent(tagList[selectedTagIndex].name);
					}
				}}
				// eslint-disable-next-line react/jsx-no-duplicate-props
				onBtnClick={() => {
					setModalType('TAG');

					if (selectedTagIndex === tagList.length) {
						setTagAction('ADD_TAG');
						setTagContent('');
					} else {
						setTagAction('EDIT_TAG');
						setTagContent(tagList[selectedTagIndex].name);
					}
				}}
			/>
			<div className="tagList">{tagListInTodoModal}</div>
			{action === 'EDIT_TODO' ? (
				<div className="btnGroup">
					<Button
						type={'remove'}
						text={'REMOVE'}
						onBtnClick={() => {
							removeTodo(selectedTodoIndex);
							onModalShow(false);
						}}
					/>
					<Button
						type={'save'}
						text={'SAVE'}
						onBtnClick={() =>
							content
								? (editTodo(selectedTodoIndex, content, selectedTagIndex), onModalShow(false))
								: alert('Please enter todo.')
						}
					/>
				</div>
			) : (
				<Button
					type={'add'}
					text={'ADD'}
					onBtnClick={() =>
						content
							? (addTodo(content, selectedTagIndex), onModalShow(false))
							: alert('Please enter todo.')
					}
				/>
			)}
		</div>
	);

	const dialogOfTag = (
		<div className="dialog">
			<IconButton text={'cancel'} onBtnClick={() => setModalType('TODO')} />
			<Label text={'Tag Name'} />
			<TextField upperCase={true} text={tagContent} onTextChange={setTagContent} />
			<Label text={'Tag Color'} />
			<div className="circleList">{colorListInTagModal}</div>
			<Label text={'Your Tag'} />
			<div className="tagList">{tagListInTagModal}</div>
			{tagAction === 'EDIT_TAG' ? (
				<div className="btnGroup">
					<Button
						type={'remove'}
						text={'REMOVE'}
						onBtnClick={() => {
							removeTag(selectedTagIndex);
							setSelectedTagIndex(tagList.length);
							setTagAction('ADD_TAG');
							setTagContent('');
							setSelectedColorIndex(colorList.length);
						}}
					/>
					<Button
						type={'save'}
						text={'SAVE'}
						onBtnClick={() =>
							tagContent && colorList[selectedColorIndex]
								? editTag(selectedTagIndex, tagContent, colorList[selectedColorIndex])
								: alert('Please enter name and choose color.')
						}
					/>
				</div>
			) : (
				<Button
					type={'add'}
					text={'ADD'}
					onBtnClick={() =>
						tagContent && colorList[selectedColorIndex]
							? (addTag(tagContent, colorList[selectedColorIndex]),
								setSelectedTagIndex(tagList.length + 1),
								setTagContent(''),
								setSelectedColorIndex(colorList.length))
							: alert('Please enter name and choose color.')
					}
				/>
			)}
		</div>
	);

	const ref = useRef();

	return (
		<div
			ref={ref}
			className="modal"
			onClick={e => (e.target.contains(ref.current) ? onModalShow(false) : null)}
		>
			{modalType === 'TODO' ? dialogOfTodo : dialogOfTag}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		tagList: state.tagList,
		colorList: state.colorList,
	};
};

export default connect(mapStateToProps, {
	addTodo,
	removeTodo,
	editTodo,
	addTag,
	removeTag,
	editTag,
})(Modal);
