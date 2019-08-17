export default function getAgeFromBirthday(birthday: number): number {
  return new Date(Date.now() - birthday).getFullYear() - 1970;
}
