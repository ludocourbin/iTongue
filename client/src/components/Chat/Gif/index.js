import React, { useContext,useState } from 'react';
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
} from '@giphy/react-components';
import { GiphyFetch } from "@giphy/js-fetch-api";
import ResizeObserver from "react-resize-observer";
import './gifComponent.scss';

const giphyFetch = new GiphyFetch("qq2ZufYOdbmXgxdryZnzJQYqeA3GdQd4");

const GifComponennt = ({ handleGifSelect}) => (
  <SearchContextManager initialTerm='travel' apiKey="qq2ZufYOdbmXgxdryZnzJQYqeA3GdQd4">
      {/* process.env.REACT_APP_API_GIPHY */}
    <Components  handleGifSelect={handleGifSelect} />
  </SearchContextManager>
)

const Components = ({handleGifSelect}) => {

  const { fetchGifs, searchKey } = useContext(SearchContext);
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <div className="gifcomponent">
   
      <SearchBar />
     
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
      <Grid key={searchKey} onGifClick={(gif, e) => {
        e.preventDefault();
        handleGifSelect(gif);
      }} noLink={true} columns={3} width={width} fetchGifs={fetchGifs} />
    </div>
  )
};

export default GifComponennt;