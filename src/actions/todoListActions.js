import axios from "axios";
import { 
  GET_TODO_DATA, 
  GET_TODO_DATA_LOADING,
  UPDATE_TODO_DATA,
  UPDATE_TODO_DATA_LOADING 
} from "../types";

const API_KEY = process.env.REACT_APP_API_KEY

export const get_todo_data = () => async dispatch => {
  return new Promise((resolve, reject) => {
    const url = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get'
    const headers = {
      'X-Api-Key': API_KEY,
    }
    dispatch({ type: GET_TODO_DATA_LOADING, payload: true })
    axios.get(url, { headers })
    .then(response => {
      dispatch({ type: GET_TODO_DATA, payload: response.data })
      dispatch({ type: GET_TODO_DATA_LOADING, payload: false })
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: GET_TODO_DATA_LOADING, payload: false })
      reject(error)
    });
  });
}

export const update_todo_data = (id, data) => async dispatch => {
  return new Promise((resolve, reject) => {
    const url = `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${id}`
    const headers = {
      'X-Api-Key': API_KEY,
      'Content-Type': 'application/json'
    }
    const params = {
      isComplete: data.isComplete
    }
    dispatch({ type: UPDATE_TODO_DATA_LOADING, payload: true })
    axios.patch(url, params, { headers })
    .then(response => {
      dispatch({ type: UPDATE_TODO_DATA, payload: {id: id, data: data} })
      dispatch({ type: UPDATE_TODO_DATA_LOADING, payload: false })
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: UPDATE_TODO_DATA_LOADING, payload: false })
      reject(error)
    });
  });
}
