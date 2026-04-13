const RatingStats = ({
  data,
  setShowReviewModel,
  isIdInProducts,
  allOrdered,
  userID,
  productID,
}) => {
  const totalRatings = data.reduce(
    (acc, item) => acc + Number(item.ratings),
    0,
  );
  const averageRating = totalRatings / data.length || 0;

  const starRatings = Array.from({ length: 5 }, (_, index) => index + 1);

  const percentageRatings = starRatings.map((rating) => {
    const ratingCount = data.filter(
      (item) => Number(item.ratings) === rating,
    ).length;
    return {
      rating,
      percentage: (ratingCount / data.length) * 100,
    };
  });

  return (
    <div className="text-gray-700">
      <div className="flex items-center mb-2">
        <div class="flex items-center">
          {[...Array(Math.round(averageRating))].map((val, index) => {
            return (
              <svg
                index={index}
                class="block h-5 w-6 align-middle text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  class=""
                ></path>
              </svg>
            );
          })}
          {averageRating &&
            Math.round(averageRating) < 5 &&
            [...Array(5 - Math.round(averageRating))].map((val, index) => {
              return (
                <svg
                  key={index}
                  class="block h-5 w-6 align-middle text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    class=""
                  ></path>
                </svg>
              );
            })}
        </div>

        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          {averageRating.toFixed(2)}
        </p>
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          out of
        </p>
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          5
        </p>
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {data.length} global ratings
      </p>

      {percentageRatings.map(({ rating, percentage }) => {
        if (!percentage) {
          percentage = 0;
        }
        return (
          <div key={rating} className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >{`${rating} star`}</a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className={`h-5 bg-yellow-300 rounded`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{`${percentage.toFixed(
              0,
            )}%`}</span>
          </div>
        );
      })}
      {isIdInProducts(allOrdered, userID, productID) && (
        <button
          className="w-36 mt-6 rounded-full bg-blue-900 py-3 text-white font-medium"
          onClick={() => setShowReviewModel(true)}
        >
          Write a review
        </button>
      )}
    </div>
  );
};

export default RatingStats;
