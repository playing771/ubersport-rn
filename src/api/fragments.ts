export const locationFragment = `
  fragment locationFragment on Game {
    location {
      address
      coordinates
    }
  }
`;

export const sportFragment = `
  fragment sportFragment on Sport {
      name
      id
  }
`;

export const userInfoFragment = `
  fragment userInfoFragment on User {
    id
    firstName
    lastName
    nickname
    dateOfBirth
  }
`;

export const gameParamsFragment = `
  fragment gameParamsFragment on Game {
    id
    name
    description
    creationDate
    maxParticipants
    minParticipants
    dateStart
    dateEnd
    status
  }
`;

export const fullGameInfoFragment = `
  fragment fullGameInfoFragment on Game {
    ...gameParamsFragment
    sport {
      ...sportFragment
    }
    ...locationFragment
    participants {
      ...userInfoFragment
    }
    author {
      ...userInfoFragment
    }
  }
  ${locationFragment}
  ${sportFragment}
  ${userInfoFragment}
  ${gameParamsFragment}
`;
