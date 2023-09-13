const { useQuery, useMutation } = require("@apollo/client");
const {
  GET_ALL_GAMES,
  ADD_NEW_GAMES,
  UPDATE_GAMES,
  DELETE_GAMES,
  GET_GAME_BY_ID,
} = require("../../../services/graphqlActions");

const useGames = () => {
  const allGames = useQuery(GET_ALL_GAMES);
  const singleGame = useQuery(GET_GAME_BY_ID);
  const [addNewGame] = useMutation(ADD_NEW_GAMES);
  const [updateGame] = useMutation(UPDATE_GAMES);
  const [deleteGame] = useMutation(DELETE_GAMES);

  return {
    allGames,
    singleGame,
    addNewGame,
    updateGame,
    deleteGame,
  };
};

export default useGames;
