import {http_config} from './http_config'
import qs from 'qs'
import axios from 'axios'
import { TOKEN_FORGOT } from '../actions/actions';

export const http_client = 
{
  async post(data, props)
  {
    return await axios.post(http_config.BASE, qs.stringify(data),{
      headers:
      {
         'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).catch((error) => 
    {
      if(props.dispatch)
      {
        if(error.response.status === 401)
        {
          props.history.push('/sign/in');
          props.dispatch({
            type: TOKEN_FORGOT
          });
        }
      }
    });
  },
  async put (data, props)
  {
    return await axios.put(http_config.BASE, qs.stringify(data),{
      headers:
      {
         'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).catch((error) => 
    {
      if(error.response.status === 401)
      {
        props.history.push('/sign/in');
        props.dispatch({
          type: TOKEN_FORGOT
        });
      }
    });
  }
};