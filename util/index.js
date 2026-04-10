exports.calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return 0;
  }

  const totalRatings = reviews.reduce(
    (acc, review) => acc + Number(review.ratings),
    0,
  );

  const averageRating = totalRatings / reviews.length;

  return averageRating.toFixed(2);
};

exports.isIdInProducts = (array, userId, productId) => {
  if (!Array.isArray(array) || array.length === 0) {
    return false;
  }

  for (const order of array) {
    if (order.userId === userId) {
      if (Array.isArray(order.products)) {
        for (const product of order.products) {
          if (product.itemId === productId) {
            return true;
          }
        }
      }
    }
  }
};
