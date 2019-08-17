const onlyUniqFromArrays = <
  T extends { id: string | number },
  P extends { id: string | number }
>(
  arrayOne: T[],
  arrayTwo: P[]
) => {
  if (!arrayTwo.length) {
    return arrayOne;
  }
  const result = arrayOne.filter(function(io) {
    return arrayTwo.some(it => it.id !== io.id);
  });
  return result;
};

export default onlyUniqFromArrays;
