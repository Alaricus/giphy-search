import React, { useState, useContext } from 'react';
import { StateCtx } from '../App/App';
import Report from '../Report/Report';
import search from '../../API';
import './Search.css';

const Search = () => {
  const [{ apiKey, limit, searches }, dispatch] = useContext(StateCtx);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = e => {
    dispatch({ type: 'UPDATE_POSITION', payload: { term: searchTerm, offset: 0 } });

    /* If the data isn't cached yet, do an API call. Otherwise, dispatching that action
     above will tell the Gifs component to use the cached data. */
    if (!searches[searchTerm]) {
      search(apiKey, limit, searchTerm, dispatch);
    }

    e.preventDefault();
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleChange} />
        <input type="submit" value="Giphy Search" />
      </form>
      <Report />
    </div>
  );
};

export default Search;
