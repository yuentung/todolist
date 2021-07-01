import {
    ADD_TODO,
    REMOVE_TODO,
    EDIT_TODO,
    EDIT_TODO_DONE,
} from '../actions/types';

const INITIAL_STATE = [
    {
        done: false,
        content: '練習 React',
        tagIndex: 0,
    },
    {
        done: false,
        content: '練習 Redux',
        tagIndex: 1,
    },
];

const todoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    done: false,
                    content: action.payload.content,
                    tagIndex: action.payload.tagIndex,
                },
            ];
        case REMOVE_TODO:
            return state.filter((todoItem, index) => index !== action.payload.index);
        case EDIT_TODO:
            return state.map((todoItem, index) => index === action.payload.index
                ? {
                    ...todoItem,
                    content: action.payload.content,
                    tagIndex: action.payload.tagIndex,
                }
                : { ...todoItem }
            );
        case EDIT_TODO_DONE:
            return state.map((todoItem, index) => index === action.payload.index
                ? {
                    ...todoItem,
                    done: !todoItem.done,
                }
                : { ...todoItem }
            );
        default:
            return state;
    }
};

export default todoReducer;