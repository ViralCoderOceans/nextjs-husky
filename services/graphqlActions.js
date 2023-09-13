const { gql } = require("@apollo/client");

export const GET_ALL_GAMES = gql`
  query Query {
    games {
      id
      platform
      title
    }
  }
`;

export const GET_GAME_BY_ID = gql`
  query Game($gameId: ID!) {
    game(id: $gameId) {
      id
      platform
      title
    }
  }
`;

export const ADD_NEW_GAMES = gql`
  mutation AddGame($game: AddGameInput!) {
    addGame(game: $game) {
      title
      platform
    }
  }
`;

export const UPDATE_GAMES = gql`
  mutation Mutation($updateGameId: ID!, $edits: EditGameInput) {
    updateGame(id: $updateGameId, edits: $edits) {
      id
      platform
      title
    }
  }
`;

export const DELETE_GAMES = gql`
  mutation DeleteGame($deleteGameId: ID!) {
    deleteGame(id: $deleteGameId) {
      id
      platform
      title
    }
  }
`;
