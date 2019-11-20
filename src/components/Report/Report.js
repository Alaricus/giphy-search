import React, { useContext } from 'react';
import { StateCtx } from '../App/App';
import './Report.css';

const ResultsGrid = () => {
  const [{ searches, position, error }] = useContext(StateCtx);
  const searchTerm = searches[position.term];

  if (!searchTerm && !error) {
    return null;
  }

  const handleResponse = () => {
    if (error) {
      return 'An error occured. Please try again!';
    }
    if (searchTerm[position.offset] && searchTerm[position.offset].pagination.total_count === 0) {
      return 'No results found!';
    }
    return (
      searchTerm[position.offset]
      && `found ${searchTerm[position.offset].pagination.total_count} results`
    );
  };

  return <div className="report">{ handleResponse() }</div>;
};

export default ResultsGrid;
