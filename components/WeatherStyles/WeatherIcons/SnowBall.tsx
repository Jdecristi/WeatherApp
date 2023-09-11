/* eslint-disable react/no-unknown-property */
import React, { createRef, useEffect, useState } from "react";
import { randomBetween } from "../../../helpers/HelperFunctions";

export interface SnowBallType {
  position: { x: number; y: number };
}

interface Props {
  position: { x: number; y: number };
}
const SnowBall: React.FC<Props> = (props) => {
  const { position } = props;

  const [reload, updateReload] = useState<number>(0);
  const snowRef = createRef<SVGSVGElement>();

  let speed = 1;

  const dropSnow = () => {
    setInterval(() => {
      if (snowRef.current)
        snowRef.current.style.transform = `translateY(${speed}em)`;
      speed += 0.5;
    }, 25);
  };

  useEffect(() => {
    setTimeout(() => {
      if (snowRef.current) {
        snowRef.current.style.left = `${position.x}em`;
        snowRef.current.style.top = `${position.y}em`;
      }
      dropSnow();
      setTimeout(() => updateReload(reload + 1), 5000);
    }, randomBetween(0, 10000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <>
      <svg className="snow-ball" viewBox="0 0 250 250" ref={snowRef}>
        <circle cx="125" cy="125" r="125" fill="url(#paint0_radial_276_4)" />
        <defs>
          <radialGradient
            id="paint0_radial_276_4"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(125 125) rotate(90) scale(125)"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#CFFCFF" />
          </radialGradient>
        </defs>
      </svg>

      <style jsx>
        {`
          .snow-ball {
            position: absolute;
            width: 0.5em;
            transition: translate 0.5s ease-in-out;
            z-index: 1;
          }
        `}
      </style>
    </>
  );
};
export default SnowBall;
