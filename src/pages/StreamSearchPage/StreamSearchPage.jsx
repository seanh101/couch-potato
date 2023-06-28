import React, { useState } from 'react';


const StreamSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/movies/stream?searchTerm=${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data.results);
      } else {
        console.error('Failed to search movies');
      }
    } catch (error) {
      console.error('Failed to search movies', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="stream-search-container">
      <h1>Stream Search</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          name="searchTerm"
          placeholder="Enter movie title"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="search-results">
        {searchResults.map((result) => (
          <div key={result.id}>
            <h2>{result.name}</h2>
            {/* Display the streaming service names */}
            <ul>
              {result.streamingInfo.map((streamingService) => (
                <li key={streamingService.id}>{streamingService.service.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamSearchPage;


