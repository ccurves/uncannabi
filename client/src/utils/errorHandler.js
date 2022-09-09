export const handleError = (error) => {
  let displayError;

  if (error === null || error === undefined) {
    displayError = "Something went wrong. An error occured...";
  } else {
    if (Object.keys(error).includes("keyPattern")) {
      displayError = `A user with that ${
        Object.keys(error.keyPattern)[0]
      } already exists`;
    } else {
      displayError = error;
    }
  }

  return displayError;
};
