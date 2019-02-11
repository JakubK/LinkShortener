import {TOKEN_ACQUIRED} from '../actions/actions'

const token = (state = {}, action) => 
{
  switch (action.type) {
    case TOKEN_ACQUIRED:
        return Object.assign({}, state, {
            token: action.payload.token,
        }); 
        
    default:
        return state;
  }

}

export default token;