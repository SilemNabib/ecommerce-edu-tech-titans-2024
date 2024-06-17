import { StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

/**
 * Renders a component for displaying reviews and allowing users to leave comments.
 *
 * @returns {JSX.Element} The rendered Reviews component.
 */
const Reviews = () => {
  const [comment, setComment] = useState('');

  // Reseñas temporales
  const reviews = [
    { name: 'John Doe', comment: 'Great product!', rating: 5 },
    { name: 'Jane Doe', comment: 'I love it!', rating: 4 },
    { name: 'Bob Smith', comment: 'Could be better.', rating: 3 },
  ];

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="mt-8 space-y-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full h-24 p-2 border-2 border-gray-300 rounded-lg"
        placeholder="Leave a comment..."
      ></textarea>
      <button className="px-4 py-2 bg-black text-white rounded-lg">Submit</button>
      <div className="flex items-center space-x-2">
        <StarIcon className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-bold">Average rating: {averageRating.toFixed(1)}</h2>
      </div>
      {reviews.map((review, index) => (
        <div key={index} className="border-t border-gray-300 pt-2">
          <h3 className="font-bold">{review.name}</h3>
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