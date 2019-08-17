const dateToString = function(
  numberDate: number,
  locale: string = 'en-US'
): string {
  return new Date(numberDate).toLocaleDateString(locale);
};

export default dateToString;
