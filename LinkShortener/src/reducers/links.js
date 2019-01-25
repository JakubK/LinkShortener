import {LINKS_LOADED} from '../actions/actions';

const links = (state = {items: []}, action) => {
  switch (action.type) {
      case LINKS_LOADED:
          return Object.assign({}, state, {
              items: action.payload.links,
          }); 
      default:
          return state;
  }
}

export default links;