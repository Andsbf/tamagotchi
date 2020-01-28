import React from "react";
import bgStyle from "./bgStyle.module.css";
import { noop } from "../lib";

const emptyButton = {
  text: "",
  click: noop
}

const Background = ({ children, buttonsActions = [] }) => {
  const getButtons = () => {
    const buttonsClassNames = [
      bgStyle.buttonA,
      bgStyle.buttonB,
      bgStyle.buttonC
    ]

    return buttonsClassNames.map((buttonClassName,index) => {
      const button = buttonsActions[index] || emptyButton;

      return (
        <div className={bgStyle.buttonWrapper}>
          <div
            className={bgStyle.buttonText}
          >
            {button.text}
          </div>
          <div
            className={`${bgStyle.button} ${buttonClassName}`}
            onClick={button.click}
          />
        </div>
      );
    });
  }

  return (
    <div className={bgStyle.tamagotchi}>
      <div className={bgStyle.loop}></div>

      <div className={bgStyle.tamagotchi__inner}>
        <div className={bgStyle.tamagotchi__shadow}>
          <div className={bgStyle.tamagotchi__highlight}></div>
        </div>

        <div className={bgStyle.screen}>
          <div className={`${bgStyle.crack} ${bgStyle.crackTop}`}></div>
          <div className={`${bgStyle.crack} ${bgStyle.crackRight}`}>
            <div className={bgStyle.crack__line}></div>
          </div>
          <div className={`${bgStyle.crack} ${bgStyle.crackBottom}`}></div>
          <div className={`${bgStyle.crack} ${bgStyle.crackLeft}`}>
            <div className={bgStyle.crack__line}></div>
          </div>

          <div className={bgStyle.screen__inner}>
            {children}
          </div>
        </div>
        <div className={bgStyle.buttons}>
          {getButtons()}
        </div>
      </div>
    </div>
  );
}

export default Background;
