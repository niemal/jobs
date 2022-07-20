import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { QUERIES } from "../constants";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  display: block;
  scroll-behavior: smooth;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  & div {
    width: 100%;
    border: 5px solid var(--color-primary);
    background-color: var(--color-tertiary);
    height: 55vh;
    overflow-y: scroll;
    font-size: 1.5rem;
    font-style: italic;
    color: var(--color-light);
    padding: 16px;
    z-index: 999;

    @media ${QUERIES.laptopAndSmaller} {
      height: 70vh;
    }
  }
`;

const Title = styled.h1`
  font-style: normal;
  font-family: var(--font-primary);
  color: var(--color-secondary);
`;

const Content = styled.p`
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-light);
`;

function QuickViewDesktop({ infoContent, triggerInfoContent }) {
  const springContent = useSpring({
    opacity: triggerInfoContent ? 1 : 0,
    transform: `perspective(800px) rotateY(${triggerInfoContent ? 360 : 0}deg)`,
    config: { mass: 10, tension: 500, friction: 200 },
  });

  const quickViewRef = useRef(null);

  useEffect(() => {
    if (quickViewRef?.current) {
      quickViewRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [infoContent]);

  if (infoContent.length < 1) {
    return <></>;
  }

  return (
    <Wrapper>
      <animated.div ref={quickViewRef} style={springContent}>
        {infoContent.map((c, idx) => {
          if (idx === 0) {
            return <Title key={`infoContent-${idx}`}>{c}</Title>;
          }
          return <Content key={`infoContent-${idx}`}>{c}</Content>;
        })}
      </animated.div>
    </Wrapper>
  );
}

export default QuickViewDesktop;
