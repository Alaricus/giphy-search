import React, { useContext } from 'react';
import { StateCtx } from '../App/App';
import Gif from '../Gif/Gif';
import './Gifs.css';

const Gifs = () => {
  const [{ searches, position }] = useContext(StateCtx);
  const { term, offset } = position;

  /* Not going to render in the store doesn't have the data for a particular
   search term (or a given offset of that search term) already cached. This
   means the API call either wasn't made or wasn't successful. */

  if (!searches[term] || !searches[term][offset]) {
    return null;
  }

  return (
    <div className="gifs">
      { searches[term][offset].data.map(gif => <Gif key={gif.id} data={gif} />) }
    </div>
  );
};

export default Gifs;
