import styled from "styled-components";
import Image from "next/image";
import SearchModal, { Container } from "../SearchModal";
import { QUERIES } from "../constants";

const LevelWrapper = styled.div`
  display: inline-block;
  padding: 8px;
  cursor: pointer;
  transition: all 350ms;
  border: 5px solid
    ${(p) => (p.addedTag ? "var(--color-primary)" : "var(--color-tertiary)")};
  background-color: ${(p) =>
    p.addedTag ? "var(--color-secondary-fade)" : "var(--color-tertiary)"};

  &:hover {
    border: 5px solid var(--color-secondary);
  }
`;

const ContainerWrapper = styled(Container)`
  height: 30vh;

  @media ${QUERIES.laptopAndSmaller} {
    height: 40vh;
  }
`;

const LevelContainer = styled.span`
  height: 70px;
  width: 70px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const LevelHeader = styled.div`
  position: absolute;
  transform: translate(-10%, -70%);
  text-shadow: none;
  background-color: var(--color-tertiary-fade);
  padding: 0px 6px;
  border-radius: 0px;
  color: var(--color-secondary);
  font-family: var(--font-primary);
  font-size: 1.5rem;
`;

const Percent = styled.div`
  position: absolute;
  transform: translate(-50%, -30%);
  left: 50%;
  top: 50%;
  font-size: 2rem;
  font-family: var(--font-primary);
  color: var(--color-text);
  text-shadow: 1px 3px 2px rgb(0, 0, 0);
  background-color: var(--color-primary-fade-strong);
  border-radius: 16px;
  padding: 0px 4px;
  z-index: 2;
`;

function SearchModalLevels({
  levelsModal,
  closeButtonHandler,
  view,
  genStats,
  levels,
  modalLevelClickHandler,
}) {
  if (!genStats.levels) {
    return null;
  }

  return (
    <SearchModal state={levelsModal} closeButtonHandler={closeButtonHandler}>
      <ContainerWrapper>
        {view.map((level, idx) => {
          if (genStats?.levels[level]) {
            return (
              <LevelWrapper
                key={`levelsModalView-${idx}`}
                addedTag={levels.includes(level)}
                onClick={modalLevelClickHandler(level)}
              >
                <LevelContainer>
                  <LevelHeader>{level}</LevelHeader>
                  <Percent>
                    {Math.ceil((genStats.levels[level] / genStats.total) * 100)}
                    %
                  </Percent>
                  <Image
                    alt={``}
                    src={`/jobs/${level}.png`}
                    width={65}
                    height={65}
                  />
                </LevelContainer>
              </LevelWrapper>
            );
          }
        })}
      </ContainerWrapper>
    </SearchModal>
  );
}

export default SearchModalLevels;
