import { combineReducers } from 'redux';
import storyReducer from './storyReducer';



export default combineReducers({
    story: storyReducer
});