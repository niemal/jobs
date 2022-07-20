import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { CloseButton } from "../Button";
import { QUERIES } from "../constants";
import Portal from "@reach/portal";

const Wrapper = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    display: block;
    /* height: 100%; */
  }

  & > div {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    border: 8px solid var(--color-primary);
    background-color: var(--color-tertiary);
    padding: 16px;
    overflow-y: scroll;

    font-family: var(--font-secondary);
    font-weight: var(--font-weight-medium);
    font-size: 1.5rem;
    font-style: italic;

    display: ${(p) => (p.quickView ? "block" : "none")};
    color: var(--color-light);
  }
`;

const CloseButtonWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: var(--color-tertiary-fade);
  padding-bottom: 8px;
`;

const Title = styled.h1`
  font-family: var(--font-primary);
  color: var(--color-primary);
  font-style: normal;
  margin-top: 32px;
  text-align: center;
`;

const Content = styled.p``;

function QuickViewMobile({ infoContent, quickView, closeButtonHandler }) {
  const springContentMobile = useSpring({
    opacity: quickView ? 1 : 0,
    transform: `perspective(1000px) rotateY(${quickView ? 360 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 200, duration: 350 },
  });

  return (
    <Portal>
      <Wrapper quickView={quickView}>
        <animated.div style={springContentMobile}>
          <CloseButtonWrapper>
            <CloseButton onClick={closeButtonHandler} />
          </CloseButtonWrapper>
          {infoContent.map((c, idx) => {
            if (idx === 0) {
              return <Title key={`infoContent-${idx}`}>{c}</Title>;
            }
            return <Content key={`infoContent-${idx}`}>{c}</Content>;
          })}
        </animated.div>
      </Wrapper>
    </Portal>
  );
}

export default QuickViewMobile;
