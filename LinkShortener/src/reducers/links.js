import {LINKS_LOADED,LINK_REMOVED, PASSWORD_INIT_SET, PASSWORD_FINISH_SET, PASSWORD_REMOVED, PASSWORD_NOT_SET, LINK_CHANGED} from '../actions/actions';

const links = (state = {linksTable: []} , action) => {
  switch (action.type) {
      case LINKS_LOADED:
          return Object.assign({}, state, {
            linksTable: [...action.payload],
          }); 
    case LINK_REMOVED:
        return Object.assign({}, state, {
            linksTable: [...state.linksTable.slice(0, action.payload), ...state.linksTable.slice(action.payload + 1)]
        }); 
    case PASSWORD_INIT_SET:
        return Object.assign({}, state, {
            modifiedRecord: action.payload
        });
    case PASSWORD_FINISH_SET:
        return Object.assign({}, state, {
            modifiedRecord: undefined,
            linksTable: [...action.payload]
        });
    case PASSWORD_REMOVED:
        return Object.assign({}, state, {
            linksTable: [...action.payload]
        })
    case PASSWORD_NOT_SET:
        return Object.assign({}, state,
            {
                modifiedRecord: undefined
            });
    case LINK_CHANGED:
        return Object.assign({}, state, {
            linksTable: [...action.payload]
        });
      default:
          return state;
  }
}


export default links;