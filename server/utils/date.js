exports.dateNow = () => {
  // This function returns a function that calculates the current date and time, adjusted by 3 hours

  const funcDate = () => {
    // Create a new Date object representing the current date and time
    const date = new Date();

    // Adjust the date by adding 3 hours to the current time
    date.setHours(date.getHours() + 3);

    // Return the updated date
    return date;
  };

  // Return the inner function that calculates the adjusted date and time
  return funcDate;
};
