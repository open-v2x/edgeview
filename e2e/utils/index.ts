// generate Integers in a range
export const generateIntNum = ({ min = 0, max = 10 }) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// generate pure numbers
export const generatePureNumber = (length = 6) => {
  return Math.random().toString(10).substr(2, length);
};

// generate numbers and letters
export const generateNumLetter = (length = 6) => {
  return Math.random().toString(36).substr(2, length);
};
