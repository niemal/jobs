import { useState } from "react";
import { animated, useSpring } from "react-spring";
import { InView } from "react-intersection-observer";

export function NavLink({ name, link }) {
  const [isHover, setHover] = useState(false);
  const spring = useSpring({
    opacity: isHover ? 1 : 0.7,
    transform: `perspective(200px) rotateX(${isHover ? 360 : 0}deg)`,
    config: { mass: 4, tension: 200, friction: 160, duration: 420 },
  });

  return (
    <animated.a
      href={link}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={spring}
    >
      <img alt={name} src={`/jobs/${name}.png`} />
      <span>{name}</span>
    </animated.a>
  );
}

export function ValueAnimation({ value, percent = false, toFixed = 0 }) {
  const [isVisible, setVisibility] = useState(false);

  const props = useSpring({
    output: isVisible ? value : 0,
    delay: 200,
    config: {
      duration: 900,
    },
  });

  if (percent) {
    return (
      <InView
        style={{ display: "flex" }}
        onChange={setVisibility}
        triggerOnce={true}
      >
        <div style={{ display: "flex" }}>
          <animated.span style={props}>
            {props.output.to((x) => x.toFixed(toFixed))}
          </animated.span>
          <span>%</span>
        </div>
      </InView>
    );
  } else {
    return (
      <InView onChange={setVisibility} triggerOnce={true}>
        <animated.span style={props}>
          {props.output.to((x) => x.toFixed(toFixed))}
        </animated.span>
      </InView>
    );
  }
}