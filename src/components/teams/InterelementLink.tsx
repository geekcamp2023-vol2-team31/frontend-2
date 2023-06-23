import React, { FC, Key, useEffect, useRef, useState } from "react";
import styles from "./InterelementLink.module.css";

export interface IInterelementLink {
  id?: Key | null | undefined;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  emphasized?: boolean;
  connectorToggle?: "left" | "right" | null;
}

const InterelementLink: FC<IInterelementLink> = ({
  x0,
  y0,
  x1,
  y1,
  emphasized,
  connectorToggle,
}) => {
  const [linkStyle, setLinkStyle] = useState({});
  let distance, degree, width, color;
  const margin = 4;
  const linkRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!linkRef.current) {
      return;
    }
    redraw();
  }, [linkRef]);

  const redraw = () => {
    console.log(connectorToggle)
    if (!linkRef.current) {
      return;
    }
    if (emphasized) {
      width = 5;
      color = "rgba(255,0,0,1)";
    } else {
      color = "rgba(255,0,0,0.3)";
      width = 4;
    }
    distance = Math.sqrt(
      (x1 + margin - (x0 - margin)) * (x1 + margin - (x0 - margin)) +
        (y1 - y0) * (y1 - y0)
    );
    degree = (Math.atan2(y1 - y0, x1 - x0 + 2 * margin) * 180) / Math.PI;
    setLinkStyle({
      left: `${x0}px`,
      top: `${y0 - width / 2}px`,
      width: `${distance}px`,
      height: `${width}px`,
      backgroundColor: `${color}`,
      transform: `rotate(${degree}deg)`,
      pointerEvents: `${connectorToggle ? "none" : "true"}`,
    });
  };

  useEffect(redraw, [x0, y0, x1, y1, emphasized, connectorToggle]);
  return <div className={styles.link} ref={linkRef} style={linkStyle}></div>;
};

export default InterelementLink;
