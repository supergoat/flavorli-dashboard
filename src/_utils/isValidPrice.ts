const isFloat = (n: any) => {
  // eslint-disable-next-line
  return n == +n && n % 1 != 0;
};

const isInt = (n: any) => {
  // eslint-disable-next-line
  return n == +n && n % 1 == 0;
};

const countDecimals = (str: number) => {
  if (Math.floor(str) === str) return 0;
  const decimals = str.toString().split('.')[1];
  return (decimals && decimals.length) || 0;
};

const isValidPrice = (price: any) => {
  if (price === '-') return true;
  return (isInt(price) || isFloat(price)) && countDecimals(price) <= 2;
};

export default isValidPrice;
