import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  margin-top: 240px;
  width: 100px;
  margin-left: auto;
  margin-right: auto;

  & > div {
    cursor: pointer;
    display: grid;
    place-content: center;
    padding: 0px 16px;
    border: 7px solid var(--color-tertiary);
    border-radius: 24px;
    background-color: var(--color-secondary);
    color: var(--color-tertiary);
    font-size: 5rem;
    transition: all 250ms ease;

    @media ${QUERIES.tabletAndSmaller} and (orientation: portrait) {
      padding: 0px 40px;
    }
  }

  &:hover > div {
    background-color: var(--color-text);
    color: var(--color-primary);
    border-color: var(--color-secondary);
  }

  @media ${QUERIES.laptopAndSmaller} {
    margin-top: 60px;
  }

  @media ${QUERIES.tabletAndSmaller} and (orientation: portrait) {
    margin-top: 560px;
  }
  @media ${QUERIES.tabletAndSmaller} and (orientation: landscape) {
    margin-top: 380px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    position: fixed;
    bottom: 200px;
    right: 24px;
  }
`;

function AnchorArrow({ index, endSearch, mainRef }) {
  const animationProp = {
    from: { opacity: 0.7, transform: "scaleY(-1)" },
    enter: { opacity: 1, transform: "scaleY(1)" },
    trail: 500,
  };
  const upArrowTrans = useTransition(index, animationProp);

  if (index < 1) {
    return null;
  }

  if (endSearch) {
    return (
      <Wrapper
        onClick={(e) => {
          mainRef.current.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div>↑</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {upArrowTrans((props, animate) => (
        <animated.div
          style={props}
          onClick={(e) => {
            mainRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          ↑
        </animated.div>
      ))}
    </Wrapper>
  );
}

export default AnchorArrow;
