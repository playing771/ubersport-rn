export default function getUniqFromArray<T>(targetArray: T[]) {
  return targetArray.filter((item, index, self) => self.indexOf(item) === index);
}
