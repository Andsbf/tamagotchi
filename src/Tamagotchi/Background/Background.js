import React from "react";
import style from "./style.module.css";
import { noop } from "../../lib";

const emptyButton = {
  text: "",
  click: noop
};

const Background = ({ children, buttonsActions = [] }) => {
  const getButtons = () => {
    const buttonsClassNames = [style.buttonA, style.buttonB, style.buttonC];

    return buttonsClassNames.map((buttonClassName, index) => {
      const button = buttonsActions[index] || emptyButton;

      return (
        <div className={style.buttonWrapper} key={index}>
          <div className={style.buttonText}>{button.text}</div>
          <div
            className={`${style.button} ${buttonClassName}`}
            onClick={button.click}
          />
        </div>
      );
    });
  };

  return (
    <div className={style.tamagotchi}>
      <div className={style.loop}></div>

      <div className={style.tamagotchi__inner}>
        <div className={style.tamagotchi__shadow}>
          <div className={style.tamagotchi__highlight}></div>
        </div>

        <div className={style.screen}>
          <div className={`${style.crack} ${style.crackTop}`}></div>
          <div className={`${style.crack} ${style.crackRight}`}>
            <div className={style.crack__line}></div>
          </div>
          <div className={`${style.crack} ${style.crackBottom}`}></div>
          <div className={`${style.crack} ${style.crackLeft}`}>
            <div className={style.crack__line}></div>
          </div>

          <div className={style.screen__inner}>{children}</div>
        </div>
        <div className={style.buttons}>{getButtons()}</div>
      </div>
    </div>
  );
};

export default Background;
