import React from "react";
import style from "./style.module.css";

const Bars = ({
  hungryness,
  tiredness
}) => {
  return [
    <div className={style.stat} key={"hungryBar"}>
      <span>Hungry:</span>
      <progress max="100" value={hungryness}/>
    </div>,
    <div className={style.stat} key={"tiredBar"}>
      <span>Tired:</span>
      <progress max="100" value={tiredness}/>
    </div>
  ];
};

Bars.displayName = "Bars";

Bars.propTypes = {};

export default Bars;
