import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import { StarIcon as FilledStarIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
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
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await auth.authFetch(`${ApiConfig.reviews}${product_id}`);
      const review = await response.data;
      setReviews(review);
    };

    fetchReviews();
  }, [product_id]);

  const sendReview = async () => {
    const response = await auth.authFetch(`${ApiConfig.addReview}`, {
      method: 'POST',
      data: JSON.stringify({ 
        productId: product_id, rating, comment }),
    });
  };

  function timeDifference(current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  }

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    if (rating > 0 && comment.trim() !== '') {
      sendReview();
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {auth.isAuthenticated() && (
        <div className="mb-6 flex flex-col">
          <div className="flex items-start mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => handleRating(star)}>
                {star <= rating ? (
                  <FilledStarIcon className="h-6 w-6 text-yellow-500" />
                ) : (
                  <OutlineStarIcon className="h-6 w-6 text-yellow-500" />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-start">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-24 p-2 border-2 border-gray-300 rounded-l-lg mb-2 resize-none"
              placeholder="Leave a comment..."
            ></textarea>
            <button
              onClick={handleSubmit}
              className={`bg-black text-white rounded-r-lg p-2 h-24 mb-2 flex items-center ${
                rating > 0 && comment.trim() !== '' ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={rating === 0 || comment.trim() === ''}
            >
              <PaperAirplaneIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}
      {!auth.isAuthenticated() && (
        <p className="text-gray-700 mb-4">You need to be logged in to leave a review</p>
      )}
      <div className="flex items-center mb-4">
        <FilledStarIcon className="h-5 w-5 text-yellow-500" />
        <span className="ml-2 text-xl font-bold">Average rating: {average}</span>
      </div>
      <div className="space-y-4">
        {!reviews ? (
          <div className="flex justify-center items-center h-24"><CircularProgress /></div>
        ) : reviews.length === 0 ? (
          <p className="m-4">No reviews yet</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border-t border-gray-300 pt-2">
              <p className="font-bold text-gray-600">Posted {timeDifference(new Date(), new Date(review.creationDate))}</p>
              <p className="text-gray-700">{review.comment}</p>
              <div className="flex items-center">
                <FilledStarIcon className="h-5 w-5 text-yellow-500" />
                <span className="ml-2 text-gray-700">Rating: {review.rating}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;