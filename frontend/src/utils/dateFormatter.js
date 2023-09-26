const dateFormatter = (date) => {
  let d = new Date(date);
  let year = new Intl.DateTimeFormat('ua', { year: 'numeric' }).format(d);
  let month = new Intl.DateTimeFormat('ua', { month: 'numeric' }).format(d);
  let day = new Intl.DateTimeFormat('ua', { day: '2-digit' }).format(d);

  return `${day}-${month}-${year}`;
};

export default dateFormatter;
