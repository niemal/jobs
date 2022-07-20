import styled from "styled-components";
import Image from "next/image";
import { ValueAnimation } from "../Animations";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  background-color: var(--color-secondary);
  text-align: center;
  padding-bottom: 24px;
  border: 5px solid var(--color-tertiary);
  border-left: 0;
  border-right: 0;
  overflow: hidden;
  isolation: isolate;
`;

const HeaderText = styled.h2`
  text-align: center;
  padding: 16px 0;
  color: var(--color-primary);
  font-family: var(--font-primary);
  font-size: 4rem;
  font-weight: var(--font-weight-bold);
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
    gap: 32px;
    margin-left: -24px;
  }
`;

const Container = styled.span`
  position: relative;
  margin-top: 24px;
  display: block;
  margin-left: 32px;
  filter: drop-shadow(2px 2px 4px var(--color-tertiary));

  & div:first-of-type {
    position: absolute;
    transform: translate(50%, 0%);
    font-size: 2rem;
    font-family: var(--font-primary);
    background-color: var(--color-primary-fade);
    color: var(--color-text);
    /* text-shadow: 1px 1px 2px var(--font-gray-900); */
    z-index: 2;
  }
  & div:first-of-type div {
    padding: 8px 16px;
    border-radius: 24px;
  }
`;

const LevelText = styled.div`
  transform: translate(0%, -70%);
  background-color: var(--color-tertiary-fade);
  padding: 8px 16px;
  font-family: var(--font-primary);
  font-size: 1.5rem;
`;

const FillerOne = styled.div`
  width: 100%;
  border-top: 7px solid var(--color-tertiary);
  transform: skew(25deg, 20deg);
`;

const FillerTwo = styled(FillerOne)`
  border-width: 8px;
  margin-top: 50px;
  margin-left: -500px;
  width: 150%;
  transform: skew(-15deg, -15deg);

  @media ${QUERIES.tabletAndSmaller} {
    margin-left: -300px;
  }
`;

function Levels({ blank, intern, apprentice, junior, senior }) {
  return (
    <Wrapper>
      <FillerOne />
      <FillerTwo />
      <HeaderText>levels</HeaderText>

      <ContainerWrapper>
        <Container>
          <ValueAnimation value={blank} percent={true}></ValueAnimation>
          <LevelText>blank</LevelText>
          <Image
            src={`/jobs/blank.png`}
            width={100}
            height={100}
            objectFit={`contain`}
          />
        </Container>

        <Container>
          <ValueAnimation value={intern} percent={true}></ValueAnimation>
          <LevelText>intern</LevelText>
          <Image
            src={`/jobs/intern.png`}
            width={100}
            height={100}
            objectFit={`contain`}
          />
        </Container>

        <Container>
          <ValueAnimation value={apprentice} percent={true}></ValueAnimation>
          <LevelText>apprentice</LevelText>
          <Image
            src={`/jobs/apprentice.png`}
            width={100}
            height={100}
            objectFit={`contain`}
          />
        </Container>

        <Container>
          <ValueAnimation value={junior} percent={true}></ValueAnimation>
          <LevelText>junior</LevelText>
          <Image
            src={`/jobs/junior.png`}
            width={100}
            height={100}
            objectFit={`contain`}
          />
        </Container>

        <Container>
          <ValueAnimation value={senior} percent={true}></ValueAnimation>
          <LevelText>senior</LevelText>
          <Image
            src={`/jobs/senior.png`}
            width={100}
            height={100}
            objectFit={`contain`}
          />
        </Container>
      </ContainerWrapper>
    </Wrapper>
  );
}

export default Levels;
