import React, { useReducer, createContext } from 'react';
import Search from '../Search/Search';
import Gifs from '../Gifs/Gifs';
import Pagination from '../Pagination/Pagination';

export const StateCtx = createContext([null, () => {}]);

const App = () => {
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case 'UPDATE_ERROR':
        return { ...state, error: payload };
      case 'UPDATE_POSITION':
        return {
          ...state,
          position: {
            term: payload.term,
            offset: payload.offset,
          },
        };
      case 'ADD_SEARCH':
        return {
          ...state,
          searches: {
            ...state.searches,
            [payload.term]: {
              ...state.searches[payload.term],
              [payload.offset]: payload.result,
            },
          },
        };
      default:
        return state;
    }
  };

  /* Sunce the API is using GET for the search endpoint, it's not
   really possible to hide the key anyway, so it may as well sit here */

  const initialState = {
    searches: {},
    error: false,
    position: { term: null, offset: 0 },
    apiKey: 'brXMsD0cTFgrd7yQh6u17ilSMIhDz2t9',
    limit: 8,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateCtx.Provider value={[state, dispatch]}>
      <Search />
      <Gifs />
      <Pagination />
    </StateCtx.Provider>
  );
};

export default App;
