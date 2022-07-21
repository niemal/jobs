import React from "react";
import { ValueAnimation } from "../Animations";
import { SKILLS } from "../constants";
import Tooltip from "../Tooltip";
import styled, { keyframes } from "styled-components";

const roundUp = (percent) => keyframes`
  from {
    stroke-dashoffset: 537;
  } 
  to {
    stroke-dashoffset: ${Math.round(533.5 - percent * 2.5)};
  }
`;

const FigureWrapper = styled.figure`
  position: relative;
  width: 200px;
  filter: drop-shadow(2px 2px 4px var(--color-tertiary));
  display: inline-block;
  color: #999;
  font-size: ${20 / 16}rem;
  text-align: center;

  & div {
    position: absolute;
    transform: translate(-130%, 150%);
    left: 50%;
    bottom: 50%;
    font-size: ${38 / 16}rem;
    font-family: var(--font-primary);
    background-color: var(--color-tertiary-fade);
    /* border-radius: 60px; */
    z-index: 2;
    color: ${(p) => {
      switch (p.signify) {
        case "lessPopular":
          return "var(--color-secondary)";
        case "leastPopular":
          return "var(--color-light)";
        default:
          return "var(--color-light)";
      }
    }};
  }
  & div div {
    padding: 4px 8px;
    border-radius: 16px;
  }

  & figcaption {
    padding: 48px 24px;
    width: 100px;
    height: 50px;
    border: 20px solid #f0f0f0;
    border-radius: 100px;
    line-height: 50px;
  }

  & svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  &[data-percent="${(p) => p["data-percent"]}"] {
    stroke-dashoffset: ${(p) => Math.round(533.5 - p["data-percent"] * 2.5)};
    -webkit-animation: ${(p) => roundUp(p["data-percent"])} 500ms;
    animation: ${(p) => roundUp(p["data-percent"])} 500ms;
  }
`;

const Image = styled.img`
  position: absolute;
  left: 50px;
  top: 30px;
  max-width: 100px;
  max-height: 100px;
  background-color: transparent;
  z-index: 1;

  & + svg circle {
    position: absolute;
    stroke: ${(p) => SKILLS[p.skill].colorStroke};
    fill: transparent;
    stroke-width: 10px;
    stroke-dasharray: 534;
    transition: stroke-dashoffset 1s;
    animation-play-state: running;
    -webkit-animation-play-state: running;

    /* firefox bug fix - won't rotate at 90deg angles */
    transform: rotate(-89deg) translateX(-190px);
    -moz-transform: rotate(-89deg) translateX(-190px);
  }
`;

const Wrapper = styled.div`
  width: 200px;
`;

function Figure({ skill, percent, signify }) {
  return (
    <Wrapper>
      <Tooltip label={`${skill}: ${percent}%`}>
        <FigureWrapper
          key={skill}
          data-tip={`${skill}: ${percent}%`}
          data-percent={percent}
          signify={signify}
        >
          <ValueAnimation value={percent} percent={true}></ValueAnimation>
          <Image
            skill={skill}
            alt={`${skill}`}
            src={`/jobs/${SKILLS[skill].img}`}
          />
          <svg width={200} height={200}>
            <circle
              cx={"95"}
              cy={"95"}
              r={"85"}
              transform={"rotate(-90, 95, 95)"}
            />
          </svg>
        </FigureWrapper>
      </Tooltip>
      {/* <Tooltip key={`${skill}-tooltip`} skill={skill} place={"bottom"} /> */}
    </Wrapper>
  );
}

export default Figure;
