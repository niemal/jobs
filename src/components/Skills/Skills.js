import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  background-color: var(--color-secondary-fade);
  border: 5px solid var(--color-tertiary);
  border-left: 0;
  border-right: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: 24px;
`;

const Title = styled.h2`
  text-align: center;
  transform: rotate(20deg);
  margin-right: 250px;
  padding: 16px;
  color: var(--color-primary);
  font-family: var(--font-primary);
  font-size: 4rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 120px;
  z-index: 2;
`;

const SkillsetWrapper = styled.div`
  display: flex;

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
    gap: 120px;
  }
`;

const FillerOne = styled.div`
  width: 100%;
  border-top: 7px solid var(--color-tertiary);
  transform: skew(25deg, 20deg);
`;

const FillerTwo = styled(FillerOne)`
  border-width: 8px;
  margin-top: 130px;
  transform: skew(15deg, 15deg);
`;
const MoreCloseButton = styled(Button)`
  transform: skew(15deg, 15deg);
  border-radius: 32px 0px 32px 0px;
  z-index: 2;
`;

function Skills({ counter, skillSets, moreHandlerLast, moreHandler }) {
  return (
    <Wrapper>
      <Title>skills</Title>

      <FillerOne />
      <Container>
        {skillSets.map((set, idx) => (
          <SkillsetWrapper key={idx}>{set}</SkillsetWrapper>
        ))}
      </Container>
      <FillerTwo />

      {counter === 25 ? (
        <MoreCloseButton onClick={moreHandlerLast}>close</MoreCloseButton>
      ) : (
        <MoreCloseButton onClick={moreHandler}>more</MoreCloseButton>
      )}
    </Wrapper>
  );
}

export default Skills;
