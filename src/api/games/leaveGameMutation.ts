// import { Mutation, graphql, ChildDataProps, withMutation } from 'react-apollo';
// import gql from 'graphql-tag';
// import { ILeaveGameResult } from './types';

// // TODO: remove redundant data. Return only game ID
// export const LEAVE_GAME_GQL = gql`
//   mutation leaveGame($gameId: ID!, $userId: String!) {
//     leaveGame(gameId: $gameId, userId: $userId) {
//       id
//       participants {
//         id
//         firstName
//         lastName
//         nickname
//       }
//     }
//   }
// `;

// export type LeaveGameMutationVariables = {
//   gameId: string;
//   userId: string;
// };

// export default class CreateGameMutation extends Mutation<
//   ILeaveGameResult,
//   LeaveGameMutationVariables
// > {}

// interface inputProps {
//   gameId: string;
//   userId: string;
// }

// type ChildProps = ChildDataProps<{}, ILeaveGameResult, inputProps>;

// // export const withLeaveGameMutation = graphql<
// //   any,
// //   ILeaveGameResult,
// //   LeaveGameMutationVariables,
// //   ChildProps
// // >(LEAVE_GAME_GQL, {
// //   props: ({ ownProps, mutate }) => {
// //     return {
// //       leaveGame: (data: any) =>
// //         mutate!({
// //           variables: data
// //           // updateQueries: {
// //           //     issues: (prev, action) => {
// //           //         console.log(action);
// //           //         const {mutationResult} = action;
// //           //         const newIssue = mutationResult.data.createIssue;
// //           //         return {
// //           //             issues: [newIssue, ...prev.issues]
// //           //         }
// //           //     }
// //           // }
// //         })
// //     };
// //   }
// // });

// export const withLeaveGameMutation = withMutation<
//   {},
//   ILeaveGameResult,
//   inputProps,
//   any
// >(LEAVE_GAME_GQL, {
//   props: ({ mutate }) => {
//     return {
//       leaveGame: ({ userId, gameId }: inputProps) =>
//         mutate!({ variables: { userId, gameId } })
//     };
//   }
// });

// // const withMutation = graphql(mutation, {
// //   props: ({ownProps, mutate}) => {
// //       return {
// //           createIssue: data => mutate({
// //               variables: data,
// //               updateQueries: {
// //                   issues: (prev, action) => {
// //                       console.log(action);
// //                       const {mutationResult} = action;
// //                       const newIssue = mutationResult.data.createIssue;
// //                       return {
// //                           issues: [newIssue, ...prev.issues]
// //                       }
// //                   }
// //               }
// //           })
// //       }
// //   }
// // });
