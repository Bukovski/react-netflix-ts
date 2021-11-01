import React from 'react';
import { useContent } from '../hooks';
import { selectionFilter } from '../utils';


const Browse = () => {
  const { series } = useContent('series');
  const { films } = useContent('films');
  const slides = selectionFilter({ series, films });

  console.log(slides)

  return <div>Browse Container</div>
}


export default Browse;
