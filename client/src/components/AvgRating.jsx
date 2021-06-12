import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../config.js';
import StarRating from './StarRating.jsx';

const AvgRating = ({ productId }) => {
  const [ratings, setRatings] = useState([]);
  const [avgScore, setAverage] = useState(0);

  const averageScore = (array) => {
    const average = Math.round(array.reduce((a, b) => Number(a) + Number(b) / array.length)).toFixed(2);
    return average;
  };

  const fetchRatings = async () => {
    let reviewData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta/?product_id=${productId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    let ratings = Object.values(reviewData.data.ratings);

    setRatings(ratings);

    if (ratings.length !== 0) {
      setAverage(averageScore(ratings));
    }
  };

  useEffect(() => {
    fetchRatings().catch((err) => console.log(`Error fetching ratings: ${err}`));
  }, [productId]);

    return (
      <div>
        <h2>Stars-Avg</h2>
        <StarRating
          rating={avgScore}/>
      </div>
    );
};


export default AvgRating;