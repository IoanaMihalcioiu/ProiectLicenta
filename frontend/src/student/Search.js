import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const searchClient = algoliasearch('BGLGWGCE3Q', 'c94891aa6977edfe8abb8a6e38294243');

const Search = () => {
    return (
        <div className="search-container">
            <InstantSearch searchClient={searchClient} indexName="courses">
                <SearchBox />
                <Hits hitComponent={Hit} />
            </InstantSearch>
        </div>
    );
};

const Hit = ({ hit }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/student/algebra/${hit.objectID}`);
    };
  
    return (
      <div onClick={handleClick}>
        <h2>{hit.name}</h2>
        <p>Nivel:{hit.level}</p>
        <p>Categorie:{hit.category}</p>
      </div>
    );
  };


export default Search;
