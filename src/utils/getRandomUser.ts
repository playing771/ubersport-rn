import randomInteger from "./randomInt";
const getRandomUser = (
  size: "large" | "medium" | "thumbnail" = "thumbnail"
) => {
  let s = "";
  if (size === "medium") {
    s = "med";
  }
  if (size === "thumbnail") {
    s = "thumb";
  }

  const idx = randomInteger(1, 100);
  const src = `https://randomuser.me/api/portraits/${s}/men/${idx}.jpg`;
  return src;
};

export default getRandomUser;
