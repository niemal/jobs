import styled from "styled-components";

const SearchInput = styled.input.attrs({
  type: "text",
})`
  font-family: var(--font-primary);
  font-size: 2rem;
  background-color: var(--color-tertiary);
  color: var(--color-light);
  transition: background-color color 350ms ease-in-out;
  border: 5px solid var(--color-primary);

  &::placeholder {
    text-align: center;
    color: var(--color-light);
  }

  &:focus {
    outline: none;
    background-color: var(--color-secondary-fade);
    color: var(--color-tertiary);
    border-color: var(--color-tertiary);
  }
`;

export default SearchInput;
