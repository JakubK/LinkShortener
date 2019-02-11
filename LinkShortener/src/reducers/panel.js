import {FINISH_PASSWORD_SET, FINISH_PASSWORD_NOT_SET, INIT_PASSWORD_SET} from '../actions/actions';
const panel = (state = {items: []}, action) => 
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
    default:
        return state;
  }

}

export default panel;