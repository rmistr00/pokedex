import { battleMove } from "../functions";
import data from "../data.js";

import "./battleButtons.scss";

export const BattleButtons = ({
  setChooseMove,
  setHP,
  setUserHP,
  setUserMove,
  chooseMove,
}) => {
  return (
    <div id="battle-buttons">
      {data.battleMoves.map((m) => (
        <button
          key={m.name}
          id={m.name}
          disabled={!chooseMove}
          onClick={() => {
            setChooseMove(false);
            let x = battleMove(m);
            if (x.success) {
              setUserMove(x.type);
              setHP((hp) => hp - x.damage);
              setUserHP((userHP) => userHP + x.hp);
            } else {
              setUserMove("missed");
            }
            setTimeout(() => {
              setUserMove("");
            }, 200);

            setTimeout(() => {
              setChooseMove(true);
            }, m.timer);
          }}
        >
          <div className="name">{m.name}</div>
          <div className="damage">DMG: {m.damage}</div>
          <div className="accuracy">ACC: {m.accuracy}</div>
        </button>
      ))}
    </div>
  );
};
