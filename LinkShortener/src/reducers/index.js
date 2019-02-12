import { combineReducers } from 'redux';
import links from './links';
import token from './token';


export default combineReducers({
    links,
    token
});