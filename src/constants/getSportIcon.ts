const iconsMap: { [key: string]: string } = {
  Football: "ios-football",
  Basketball: "ios-basketball",
  Bicycle: "ios-bicycle",
  Tennis: "ios-tennisball",
  default: "ios-fitness"
};

const getSportIcon = (sportName: string): string => {
  let icon = iconsMap[sportName];
  if (!icon) {
    icon = iconsMap.default;
  }
  return icon;
};

export default getSportIcon;
