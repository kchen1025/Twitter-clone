
import axios from 'axios';
import {FETCH_USER} from './types';

// redux thunk in use here
// if redux-thunk sees we are returning a function instead of an action, redux-thunk will automatically call this function
// and pass in a 'dispatch' function into it
// dispatch its what we use to forward to the store. This allows us to not have to immediately return and dispatch to the store
export const fetchUser = () => async (dispatch: any) => {
    const res = await axios.get('/api/current_user');
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
};
