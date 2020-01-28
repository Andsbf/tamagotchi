import React from "react";
import style from "./style.module.css";
import PropTypes from "prop-types";
import emojis from "../emojis";

const PooPile = ({count}) => {
  return(
    <div  className={style.pooPile}>
      {new Array(count).fill(
        <div dangerouslySetInnerHTML={{__html: emojis.poo}}/>
      )}
    </div>
  );
};

PooPile.displayName = "PooPile";

PooPile.propTypes = {};

export default PooPile;
