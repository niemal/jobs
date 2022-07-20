import Button from "../Button";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-secondary-fade);
  border: 5px solid var(--color-tertiary);
  border-left: 0;
  border-right: 0;
  overflow: hidden;
`;

const HeaderText = styled.h2`
  text-align: center;
  transform: rotate(-20deg);
  margin-top: 16px;
  margin-right: 60px;
  padding-top: 16px;
  color: var(--color-primary);
  font-family: var(--font-primary);
  font-size: 4rem;
  font-weight: var(--font-weight-bold);
`;

const Container = styled.div`
  margin-top: 88px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FillerOne = styled.div`
  width: 100%;
  border-top: 7px solid var(--color-tertiary);
  transform: skew(-25deg, -20deg);
`;

const FillerTwo = styled(FillerOne)`
  border-width: 8px;
  margin-top: 130px;
  transform: skew(-15deg, -15deg);
`;
const MoreCloseButton = styled(Button)`
  margin-top: 36px;
  transform: skew(-15deg, -15deg);
  border-radius: 0px 32px 0px 32px;
  z-index: 2;
`;

function ComboSkills({
  counter,
  skillComponents,
  moreHandler,
  moreHandlerLast,
}) {
  return (
    <Wrapper>
      <HeaderText>skill combos</HeaderText>

      <FillerOne />
      <Container>{skillComponents}</Container>
      <FillerTwo />

      {counter === 20 ? (
        <MoreCloseButton onClick={moreHandlerLast}>close</MoreCloseButton>
      ) : (
        <MoreCloseButton onClick={moreHandler}>more</MoreCloseButton>
      )}
    </Wrapper>
  );
}

export default ComboSkills;
