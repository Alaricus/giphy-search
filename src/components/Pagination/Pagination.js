import React, { useContext } from 'react';
import { StateCtx } from '../App/App';
import search from '../../API';
import './Pagination.css';

const Pagination = () => {
  const [{ apiKey, limit, searches, position }, dispatch] = useContext(StateCtx);
  const { term, offset: currentOffset } = position;

  const searchTerm = searches[term];

  /* Only display pagination if the search data exists and has at least one page. */
  if (!searchTerm || !searchTerm[currentOffset] || searchTerm[currentOffset].data.length === 0) {
    return null;
  }

  const { total_count: total, offset } = searchTerm[currentOffset].pagination;

  const totalPages = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;

  /* This is the messiest bit of the entire app, and something I'm least proud of.
      I wanted the sort of pagination, which follows the following rules:
      1. Displays 'Previous' and 'Next' links only if there pages actually exist.
      2. Displays links to 5 pages before the current one and 5 after, 11 in total.
      3. If less than 5 pages exist, displays whatever is available and then
          compensate on the other side, so for example 3 and 7, or 8 and 2.
      4. If there are less than 11 pages in total, display whatever is available.
      5. The current page is not clickable and is shown as visually distinctive.
     The result satisfies these criteria, and should be performant. There is most
     likely a better way to do this, however. */

  const buildPagination = () => {
    const arr = [];
    const maxPerSide = 5;
    const totalBefore = currentPage;
    const totalAfter = totalPages - currentPage;
    const showBefore = (() => {
      if (totalBefore <= maxPerSide + 1) {
        return totalBefore;
      }

      if (totalAfter >= maxPerSide) {
        return maxPerSide + 1;
      }

      if (totalAfter < maxPerSide && maxPerSide * 2 - totalAfter < totalBefore) {
        return maxPerSide * 2 - totalAfter + 1;
      }

      return maxPerSide;
    })();
    const showAfter = (() => totalAfter <= maxPerSide
      ? totalAfter
      : maxPerSide * 2 + 1 - showBefore
    )();

    currentPage !== 1 && arr.push(<button type="button" key="previous" onClick={goToPrevious}>Previous</button>);

    for (let i = currentPage - showBefore; i < currentPage - 1; i++) {
      arr.push(
        <button type="button" key={i + 1} onClick={() => goToPage(i)}>
          {i + 1}
        </button>,
      );
    }

    arr.push(
      <span key={currentPage} className="current">
        {currentPage}
      </span>,
    );

    for (let i = 0; i < showAfter; i++) {
      arr.push(
        <button type="button" key={currentPage + 1 + i} onClick={() => goToPage(currentPage + i)}>
          {currentPage + 1 + i}
        </button>,
      );
    }

    currentPage !== totalPages && arr.push(<button type="button" key="next" onClick={goToNext}>Next</button>);
    return arr;
  };

  const goToPrevious = () => {
    dispatch({ type: 'UPDATE_POSITION', payload: { term, offset: offset - limit } });
    if (!searchTerm[offset - limit]) {
      search(apiKey, limit, term, dispatch, offset - limit);
    }
  };

  const goToNext = () => {
    dispatch({ type: 'UPDATE_POSITION', payload: { term, offset: offset + limit } });
    if (!searchTerm[offset + limit]) {
      search(apiKey, limit, term, dispatch, offset + limit);
    }
  };

  const goToPage = page => {
    dispatch({ type: 'UPDATE_POSITION', payload: { term, offset: page * limit } });
    if (!searchTerm[page * limit]) {
      search(apiKey, limit, term, dispatch, page * limit);
    }
  };

  return <div className="pagination">{ buildPagination() }</div>;
};

export default Pagination;
