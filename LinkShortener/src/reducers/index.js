import { combineReducers } from 'redux';
import links from './links';
import token from './token';
import panel from './panel';


export default combineReducers({
    links,
    token,
    panel
});