import { createStore } from 'redux';

const initialState = {
  question: '',
  answer: '',
  history: [],
  loading: false,
};

const SET_QUESTION = 'SET_QUESTION';
const SET_ANSWER = 'SET_ANSWER';
const SET_LOADING = 'SET_LOADING';
const ADD_HISTORY = 'ADD_HISTORY';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return { ...state, question: action.payload };
    case SET_ANSWER:
      return { ...state, answer: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case ADD_HISTORY:
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;