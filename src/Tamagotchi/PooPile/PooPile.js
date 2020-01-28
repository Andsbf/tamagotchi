import React from "react";
import style from "./style.module.css";
import emojis from "../emojis";
import { range } from "../../lib";

const PooPile = ({ count }) => {
  return (
    <div className={style.pooPile}>
      {range(count).map((_, index) => (
        <div dangerouslySetInnerHTML={{ __html: emojis.poo }} key={index} />
      ))}
    </div>
  );
};

PooPile.displayName = "PooPile";

PooPile.propTypes = {};

export default PooPile;
