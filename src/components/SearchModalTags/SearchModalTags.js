import styled from "styled-components";
import Image from "next/image";
import SearchModal, { Container } from "../SearchModal";
import { SKILLS } from "../constants";
import SearchInput from "../SearchInput";

const Input = styled(SearchInput)`
  background-color: var(--color-secondary);

  &::placeholder {
    color: var(--color-strong);
  }

  &:focus {
    border-color: var(--color-light);
  }
`;

const TagWrapper = styled.div`
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

const TagContainer = styled.span`
  height: 70px;
  width: 70px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Percent = styled.div`
  position: absolute;
  transform: translate(-50%, -30%);
  left: 50%;
  top: 50%;
  font-size: 2rem;
  font-family: var(--font-primary);
  color: var(--color-secondary);
  text-shadow: 2px 1px 2px rgb(0, 0, 0);
  z-index: 2;
`;

function SearchModalTags({
  tagsModal,
  closeButtonHandler,
  inputHandler,
  view,
  genStats,
  tags,
  modalTagClickHandler,
}) {
  if (!genStats.skills) {
    return null;
  }

  return (
    <SearchModal state={tagsModal} closeButtonHandler={closeButtonHandler}>
      <Input placeholder="Filter tags.." onChange={inputHandler} />

      <Container>
        {view.map((tag, idx) => {
          if (genStats.skills[tag]) {
            return (
              <TagWrapper
                key={`tagsModalView-${idx}`}
                addedTag={tags.includes(tag)}
                onClick={modalTagClickHandler(tag)}
              >
                <TagContainer>
                  <Percent>
                    {Math.ceil((genStats.skills[tag] / genStats.total) * 100)}%
                  </Percent>
                  <Image
                    alt={``}
                    src={`/jobs/${SKILLS[tag].img}`}
                    width={65}
                    height={65}
                  />
                </TagContainer>
              </TagWrapper>
            );
          } else {
            return null;
          }
        })}
      </Container>
    </SearchModal>
  );
}

export default SearchModalTags;
