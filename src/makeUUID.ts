let inc = 1;

export const makeUUID = () => {
  return `${Date.now()}-${inc++}`;
};
