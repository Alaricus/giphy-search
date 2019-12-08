const runSearch = async (key, limit, term, callback, offset = 0) => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${term}&api_key=${key}&limit=${limit}&offset=${offset}`);
    if (response.ok) {
      const result = await response.json();
      callback({ type: 'ADD_SEARCH', payload: { term, offset, result } });
      callback({ type: 'UPDATE_ERROR', payload: false });
    }
  } catch {
    callback({ type: 'UPDATE_ERROR', payload: true });
  }
};

export default runSearch;
