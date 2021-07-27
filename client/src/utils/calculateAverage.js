
const calculateAverage = (data) => {
  const { ratings } = data;
  let totalStars = 0;
  let numberStars = 0;
  Object.keys(ratings).forEach((key) => {
    const keyVal = parseInt(key, 10);
    totalStars += ratings[key] * 5;
    numberStars += keyVal * ratings[key];
  });

  const average = (numberStars / totalStars) * 5;
  const rounded = (Math.round(average * 4) / 4).toFixed(2);
  return rounded;

};

export default calculateAverage;