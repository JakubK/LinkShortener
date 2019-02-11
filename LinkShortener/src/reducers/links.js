import {LINKS_LOADED,LINK_REMOVED} from '../actions/actions';

const links = (state = {} , action) => {
  switch (action.type) {
      case LINKS_LOADED:
          return Object.assign({}, state, {
              linksTable: action.payload,
          }); 
    case LINK_REMOVED:
        return Object.assign({}, state, {
            linksTable: [...state.linksTable.slice(0, action.payload), ...state.linksTable.slice(action.payload + 1)]
        }); 
      default:
          return state;
  }
}


export default links;