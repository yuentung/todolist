import {
    ADD_TAG,
    REMOVE_TAG,
    EDIT_TAG,
} from '../actions/types';

const INITIAL_STATE = [
    {
        name: 'NEW',
        color: '#F4929E',
    },
    {
        name: 'IMPORTANT',
        color: '#8585C1',
    },
];

const tagReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TAG:
            return [
                ...state,
                {
                    name: action.payload.name,
                    color: action.payload.color,
                },
            ];
        case REMOVE_TAG:
            return state.filter((tagItem, tagIndex) => tagIndex !== action.payload.index);
        case EDIT_TAG:
            return state.map((tagItem, tagIndex) => tagIndex === action.payload.index
                ? {
                    name: action.payload.name,
                    color: action.payload.color,
                }
                : { ...tagItem }
            );
        default:
            return state;
    }
};

export default tagReducer;