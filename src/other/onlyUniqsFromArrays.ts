interface ObjectArrayItem {
  id: string | number;
}
type ArrayItem = ObjectArrayItem | string | number;

const onlyUniqFromArrays = <T extends ArrayItem, P extends ArrayItem>(
  arrayOne: T[],
  arrayTwo: P[]
) => {
  if (!arrayTwo.length) {
    return arrayOne;
  }
  const result = arrayOne.filter(function(io) {
    return !arrayTwo.some(it => {
      const compareValA = isObject(it) ? it.id : it;
      const compareValB = isObject(io) ? io.id : io;
      return compareValA === compareValB;
    });
  });

  return result;
};

function isObject(arrayItem: ArrayItem): arrayItem is ObjectArrayItem {
  return typeof (arrayItem as ObjectArrayItem).id !== 'undefined';
}

export default onlyUniqFromArrays;
