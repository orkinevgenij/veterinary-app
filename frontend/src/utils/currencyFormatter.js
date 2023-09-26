const currencyFormatter = (price) => {
  return price.toLocaleString('UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: false,
  });
};

export default currencyFormatter;
