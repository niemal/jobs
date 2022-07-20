import styled from "styled-components";
import { CloseButton } from "../Button";
import { QUERIES } from "../constants";
import { useTransition, animated } from "react-spring";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
  background-color: hsl(0deg 0% 0% / 0.5);

  & > div {
    width: 600px;
    max-width: 100%;
    border: 7px solid var(--color-primary);
    background-color: var(--color-tertiary);
    /* height: 48vh; */
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.2);
    height: 60vh;

    @media ${QUERIES.laptopAndSmaller} {
      height: 70vh;
    }

    @media ${QUERIES.phoneAndSmaller} {
      width: 100%;
    }
  }

  @media ${QUERIES.phoneAndSmaller} {
    height: 100%;
  }
`;

const ModalMain = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  margin-top: 36px;
  overflow-y: scroll;
  border: 5px solid var(--color-secondary-fade);
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

function SearchModal({ state, closeButtonHandler, children }) {
  const animationProp = {
    from: { opacity: 0.7, transform: "scaleY(-1)" },
    enter: { opacity: 1, transform: "scaleY(1)" },
    trail: 500,
  };
  const Transition = useTransition(state, animationProp);

  if (!state) {
    return null;
  }

  return (
    <Wrapper>
      {Transition((props, animate) => (
        <animated.div style={props}>
          <CloseButton onClick={closeButtonHandler} />

          <ModalMain>{children}</ModalMain>
        </animated.div>
      ))}
    </Wrapper>
  );
}

export default SearchModal;
