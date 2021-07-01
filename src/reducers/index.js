import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import tagReducer from './tagReducer';
import colorReducer from './colorReducer';

const reducers = combineReducers({
    todoList: todoReducer,
    tagList: tagReducer,
    colorList: colorReducer,
});

export default reducers;