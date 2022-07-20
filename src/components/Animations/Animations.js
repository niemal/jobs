import { useState } from "react";
import Image from "next/image";
import { animated, useSpring } from "react-spring";
import { InView } from "react-intersection-observer";
import styled from "styled-components";

const Wrapper = styled.a`
  position: relative;
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  & img {
    padding: 8px;
    transition: fill transform 250ms ease;
  }
`;

const ImageWrapper = styled.div`
  & img {
    transition: filter 250ms ease;
  }

  ${Wrapper}:hover & img {
    filter: drop-shadow(-2px 1px 6px var(--color-secondary));
  }
`;

const NameWrapper = styled.span`
  position: relative;
  font-family: var(--font-primary);
  color: var(--color-text);

  ${Wrapper}:hover & {
    color: var(--color-tertiary);
  }

  &::after {
    display: block;
    position: absolute;
    content: "${(p) => p.name}";
    top: -14px;
    left: 0;
    width: 0;
    overflow: hidden;
    background: linear-gradient(
      90deg,
      var(--color-text) 10%,
      var(--color-light) 30%,
      var(--color-secondary) 60%,
      var(--color-tertiary) 100%
    );
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;

    transition: width 350ms ease-in-out;
  }

  ${Wrapper}:hover &:after {
    width: 100%;
  }
`;
export function NavLink({ name, link }) {
  return (
    <Wrapper href={link}>
      <ImageWrapper>
        <Image alt={name} src={`/jobs/${name}.png`} height={45} width={45} />
      </ImageWrapper>
      <NameWrapper name={name}>{name}</NameWrapper>
    </Wrapper>
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
