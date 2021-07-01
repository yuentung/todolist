import {
    ADD_TODO,
    REMOVE_TODO,
    EDIT_TODO,
    EDIT_TODO_DONE,
    ADD_TAG,
    REMOVE_TAG,
    EDIT_TAG,
} from './types';

export const addTodo = (content, tagIndex) => {
    return {
        type: ADD_TODO,
        payload: { content, tagIndex }
    };
};

export const removeTodo = index => {
    return {
        type: REMOVE_TODO,
        payload: { index }
    };
};

export const editTodo = (index, content, tagIndex) => {
    return {
        type: EDIT_TODO,
        payload: { index, content, tagIndex }
    };
};

export const editTodoDone = index => {
    return {
        type: EDIT_TODO_DONE,
        payload: { index }
    };
};

export const addTag = (name, color) => {
    return {
        type: ADD_TAG,
        payload: { name, color }
    };
};

export const removeTag = index => {
    return {
        type: REMOVE_TAG,
        payload: { index }
    };
};

export const editTag = (index, name, color) => {
    return {
        type: EDIT_TAG,
        payload: { index, name, color }
    };
};