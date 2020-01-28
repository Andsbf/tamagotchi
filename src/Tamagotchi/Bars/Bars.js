import React from "react";
import style from "./style.module.css";
import PropTypes from "prop-types";

const Bars = ({
  hungryness,
  tiredness
}) => {
  return [
    <div className={style.stat}>
      <span>Hungry:</span>
      <progress max="100" value={hungryness}/>
    </div>,
    <div className={style.stat}>
      <span>Tired:</span>
      <progress max="100" value={tiredness}/>
    </div>
  ];
};

Bars.displayName = "Bars";

Bars.propTypes = {};

export default Bars;
