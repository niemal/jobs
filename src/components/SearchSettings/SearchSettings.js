import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import Image from "next/image";
import { CloseButton } from "../Button";
import SearchInput from "../SearchInput";
import Tooltip from "../Tooltip";
import { QUERIES, SKILLS } from "../constants";

const Wrapper = styled.div`
  & > div {
    display: ${(p) => (p.isLoading ? "none" : "block")};
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    border: 7px solid var(--color-primary);
    background-color: var(--color-secondary-fade);
    padding: 16px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    @media ${QUERIES.phoneAndSmaller} {
      width: 100vw;
      background-color: var(--color-tertiary-fade);
    }
  }
`;

const CloseButtonPhone = styled(CloseButton)`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: block;
    align-self: start;
  }
`;

const Title = styled.h1`
  width: 100%;
  font-family: var(--font-primary);
  font-size: 2.5rem;
  color: var(--color-primary);
  text-align: center;
  border-bottom: 1px solid var(--color-tertiary);
`;

const Container = styled.div`
  font-family: var(--font-primary);
  font-size: 2rem;
  color: var(--color-primary);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Preface = styled.span``;

const RowEntry = styled.span`
  cursor: pointer;

  & > span {
    padding: 32px;
  }

  & img {
    border: 3px solid var(--color-primary) !important;
    background-color: var(--color-tertiary-fade);
    padding: 4px !important;
    transition: background-color color 350ms ease-in-out;
  }

  &:hover img {
    background-color: var(--color-primary);
    border-color: var(--color-tertiary) !important;
  }

  @media ${QUERIES.tabletAndSmaller} {
    & img {
      background-color: var(--color-secondary-fade) !important;
    }
  }
`;

const DateSearch = styled(SearchInput)``;

const SideButton = styled.button.attrs({
  type: "button",
})`
  display: inline-block;
  border: 3px solid var(--color-primary);
  background-color: var(--color-tertiary);
  color: var(--color-light);
  padding: 0 16px;
  font-size: 1.5rem;
  margin-left: 16px;
  transition: all 350ms ease;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-tertiary);
    border-color: var(--color-tertiary);
  }

  @media ${QUERIES.phoneAndSmaller} {
    background-color: var(--color-secondary);
  }
`;

const DateInput = styled(SearchInput)`
  @media ${QUERIES.tabletAndSmaller} {
    width: 185px;
    margin-top: 0;
    background-color: var(--color-secondary-fade);
  }
`;

const TypeSearchBefore = styled.span`
  text-shadow: ${(p) =>
    !p.looseMode ? "1px 1px 1px var(--color-primary)" : "none"};
`;
const TypeSearchAfter = styled.span`
  text-shadow: ${(p) =>
    p.looseMode ? "1px 1px 1px var(--color-primary)" : "none"};
`;

const CheckboxWrapper = styled.div`
  display: inline-block;
  width: 40px;
  height: 10px;
  background: var(--color-secondary-fade);
  margin: 16px;
  border-radius: 16px;
  position: relative;

  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.2);
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.2);
`;

const Label = styled.label.attrs({
  htmlFor: "type-search-toggle",
})`
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 10px;
  margin: 0;

  transition: all 250ms ease;
  cursor: pointer;
  position: absolute;
  top: -3px;
  left: -3px;

  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: var(--color-primary);
`;

const Checkbox = styled.input.attrs({
  type: "checkbox",
  id: "type-search-toggle",
})`
  visibility: hidden;

  &:checked + ${Label} {
    left: 27px;
    background-color: var(--color-secondary);
  }
`;

function SearchSettings({
  loading,
  tags,
  levels,
  triggerSettings,
  looseMode,
  mobileCloseButtonHandler,
  tagsClickHandler,
  tagsButtonHandler,
  levelsClickHandler,
  levelsButtonHandler,
  dateInputHandler,
  checkboxHandler,
}) {
  const springSettings = useSpring({
    opacity: triggerSettings ? 1 : 0,
    transform: `perspective(600px) rotateX(${triggerSettings ? 360 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <Wrapper isLoading={loading}>
      <animated.div style={springSettings}>
        <CloseButtonPhone onClick={mobileCloseButtonHandler} />
        <Title>settings</Title>

        <Container>
          <Preface>skills:</Preface>
          {tags.map((tag, idx) => (
            <RowEntry key={`tags-${idx}`} onClick={tagsClickHandler(tag)}>
              <Image
                alt={``}
                src={`/jobs/${SKILLS[tag].img}`}
                width={50}
                height={50}
              />
            </RowEntry>
          ))}

          <SideButton onClick={tagsButtonHandler}>add</SideButton>
        </Container>

        <Container>
          <Preface>levels:</Preface>
          {levels.map((level, idx) => (
            <RowEntry key={`levels-${idx}`} onClick={levelsClickHandler(level)}>
              <Image
                alt={``}
                src={`/jobs/${level}.png`}
                width={50}
                height={50}
              />
            </RowEntry>
          ))}

          <SideButton onClick={levelsButtonHandler}>add</SideButton>
        </Container>

        <Container>
          <Preface>date:</Preface>
          <Tooltip
            label={`You can use the following format: DD/MM/YYYY-DD/MM/YYYY, with the former being "from" and the latter being "to" as date ranges.`}
            origin={"search"}
          >
            <DateInput placeholder={"DD/MM/YYYY"} onChange={dateInputHandler} />
            {/* <Tooltip effect={`solid`} place={`right`} arrowColor={`#52796F`} /> */}
          </Tooltip>
        </Container>

        <Container>
          <TypeSearchBefore looseMode={looseMode}>strict</TypeSearchBefore>
          <CheckboxWrapper>
            <Checkbox checked={looseMode} onChange={() => false} />
            <Label onClick={checkboxHandler} />
          </CheckboxWrapper>
          <TypeSearchAfter looseMode={looseMode}>loose</TypeSearchAfter>
        </Container>
      </animated.div>
    </Wrapper>
  );
}

export default SearchSettings;
