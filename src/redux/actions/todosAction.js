import { collection, addDoc, deleteDoc, getDocs, getDoc, doc } from 'firebase/firestore';

import {
  DELETE_TODOS_FAILURE,
  DELETE_TODOS_REQUEST,
  DELETE_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  POST_TODOS_FAILURE,
  POST_TODOS_REQUEST,
  POST_TODOS_SUCCESS,
} from '../constants/todosConstant';
import { db } from '../../firebase';

// make a action to gets all todos
export const getAllTodos = async (dispatch) => {
  dispatch({ type: GET_TODOS_REQUEST });

  try {
    // const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/api/v1/todos-all");
    const todosCollection = collection(db, 'todos');
    const todosSnapshot = await getDocs(todosCollection);

    const todosData = todosSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    dispatch({ type: GET_TODOS_SUCCESS, payload: todosData });
  } catch (error) {
    dispatch({ type: GET_TODOS_FAILURE, payload: error });
  }
};

// make a action to create a todo
export const createTodo = (payload) => async (dispatch) => {
  dispatch({ type: POST_TODOS_REQUEST });

  try {
    const todosCollection = collection(db, 'todos');
    const newTodo = {
      title: payload.todoTitle,
      description: payload.todoDescription,
      completed : payload.todoCompleted
    };

    const docRef = await addDoc(todosCollection, newTodo);
    const res = { id: docRef.id, ...newTodo };

    dispatch({ type: POST_TODOS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: POST_TODOS_FAILURE, payload: error });
  }
};

// make a action to delete a todo
export const deleteTodo =
  ({ todoId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_TODOS_REQUEST });

    try {

      const todoDocRef = doc(db, 'todos', todoId);

      const todoDocSnapshot = await getDoc(todoDocRef);

      if (todoDocSnapshot.exists()) {
        await deleteDoc(todoDocRef);
        dispatch({ type: DELETE_TODOS_SUCCESS, payload: { id: todoId } });
      } else {
        dispatch({
          type: DELETE_TODOS_FAILURE,
          payload: { message: 'Todo not found' },
        });
      }
    } catch (error) {
      dispatch({ type: DELETE_TODOS_FAILURE, payload: error });
    }
  };
