import {TOKEN_ACQUIRED, TOKEN_FORGOT} from '../actions/actions'

const token = (state = {}, action) => 
{
  switch (action.type) {
    case TOKEN_ACQUIRED:
        return Object.assign({}, state, {
            token: action.payload.token,
        }); 
    case TOKEN_FORGOT:
        return Object.assign({}, state, {
            token: undefined
        });
    default:
        return state;
  }

}

export default token;