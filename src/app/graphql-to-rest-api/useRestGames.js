import { useState } from "react";
import { getAllGames } from "../../../services/actions";

const useRestGames = () => {
  const [allGames, setAllGames] = useState([]);
  const [newGame, setNewGame] = useState({});
  const [platforms, setPlatforms] = useState([]);

  const fetchGames = () => {
    getAllGames().then((res) => setAllGames(res));
  };

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
    fetchGames,
    newGame,
    setNewGame,
    platforms,
    setPlatforms,
    handleChange,
    handleCheckbox,
    resetForm,
  };
};

export default useRestGames;
