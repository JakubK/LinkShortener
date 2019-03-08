import {http_config} from './http_config'
import qs from 'qs'
import axios from 'axios'

export const http_client = 
{
  async post(data)
  {
    return await axios.post(http_config.BASE, qs.stringify(data),{
      headers:
      {
         'Content-Type' : 'application/x-www-form-urlencoded'
      }
    });
  },
  async put (data)
  {
    return await axios.put(http_config.BASE, qs.stringify(data),{
      headers:
      {
         'Content-Type' : 'application/x-www-form-urlencoded'
      }
    });
  }
};