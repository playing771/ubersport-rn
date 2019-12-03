import { ObjectMap } from '../utils/types';

const iconsMap: ObjectMap<string, number> = {
  0: 'ios-fitness', // которого нет
  1: 'ios-football',
  2: 'ios-fitness', // hockey
  3: 'ios-basketball',
  4: 'ios-fitness', // volleyball
  5: 'ios-fitness', // paintball
  6: 'ios-fitness', // running
  7: 'ios-fitness', // other
  8: 'ios-tennisball',
  9: 'ios-bicycle',
  // Bicycle: 'ios-bicycle',
  // Tennis: 'ios-tennisball',
};

const getSportIcon = (sportId: number): string => {
  let icon = iconsMap[sportId];
  if (!icon) {
    icon = iconsMap[0];
  }
  return icon;
};

export default getSportIcon;
