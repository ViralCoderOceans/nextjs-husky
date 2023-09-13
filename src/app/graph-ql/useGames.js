import { useState } from "react";

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
  const [newGame, setNewGame] = useState({});
  const [platforms, setPlatforms] = useState([]);

  const handleChange = (e) => {
    setNewGame({
      ...newGame,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
    let refArr = platforms;
    if (refArr.filter((elm) => elm === e.target.value).length) {
      refArr = refArr.filter((elm) => elm !== e.target.value);
    } else {
      refArr.push(e.target.value);
    }
    setPlatforms([...refArr]);
    setNewGame({
      ...newGame,
      platform: refArr,
    });
  };

  const resetForm = () => {
    setNewGame({});
    setPlatforms([]);
  };

  return {
    allGames,
    singleGame,
    addNewGame,
    updateGame,
    deleteGame,
    newGame,
    setNewGame,
    platforms,
    setPlatforms,
    handleChange,
    handleCheckbox,
    resetForm,
  };
};

export default useGames;
