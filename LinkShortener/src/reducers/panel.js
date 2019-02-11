import {FINISH_PASSWORD_SET, FINISH_PASSWORD_NOT_SET, INIT_PASSWORD_SET, PASSWORD_REMOVED} from '../actions/actions';
const panel = (state = {}, action) => 
{
  switch (action.type) {

    case INIT_PASSWORD_SET:
      return Object.assign({}, state, {
        modifiedRecord: action.payload,
    }); 
    case FINISH_PASSWORD_NOT_SET:
      return Object.assign({}, state, {
          modifiedRecord: undefined
      }); 
    case FINISH_PASSWORD_SET:
    return Object.assign({}, state, {
        modifiedRecord: undefined,
        linksTable: action.payload
    }); 
    case PASSWORD_REMOVED:
    return Object.assign({}, state, {
      linksTable: action.payload.linksTable,
      modifiedRecord: undefined
    }); 
    default:
        return state;
  }

}

export default panel;