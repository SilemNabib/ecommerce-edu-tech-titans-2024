import { StarIcon } from '@heroicons/react/24/solid';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

/**
 * Renders a component for displaying reviews and allowing users to leave comments.
 *
 * @returns {JSX.Element} The rendered Reviews component.
 */
const Reviews = ({ product_id, average }) => {
  const auth = useAuth();

  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(null);

    useEffect(() => {
    const fetchReviews = async () => {
      const response = await auth.authFetch(`${ApiConfig.reviews}${product_id}`);
      const review = await response.data;
      setReviews(review);
    };
  
    fetchReviews();
  }, [product_id]);

  if (!reviews) {
    return <CircularProgress/>;
  }

  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

  function timeDifference(current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " segundos";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutos";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " horas";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " días";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " meses";
    } else {
      return Math.round(elapsed / msPerYear) + " años";
    }
  }

  return (
    <div className="mt-8 space-y-4">
      {auth.isAuthenticated() && (
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-24 p-2 border-2 border-gray-300 rounded-lg"
            placeholder="Leave a comment..."
          ></textarea>
          <button className="px-4 py-2 bg-black text-white rounded-lg">
            Submit
          </button>
        </div>
      )}
      {!auth.isAuthenticated() && (
        <p>You need to be logged in to leave a review</p>
      )}
      <h1 className="text-2xl font-bold">Reviews</h1>
      <div className="flex items-center space-x-2">
        <StarIcon className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-bold">Average rating: {average}</h2>
      </div>
      {reviews?.map((review, index) => (
        <div key={index} className="border-t border-gray-300 pt-2">
          <h3 className="font-bold">Hace {timeDifference(new Date(), new Date(review.creationDate))}</h3>
          <p>{review.comment}</p>
          <div className="flex items-center space-x-2">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <p>Rating: {review.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;