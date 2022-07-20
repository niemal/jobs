import styled from "styled-components";

const Button = styled.button.attrs({
  type: "button",
})`
  cursor: pointer;
  font-family: var(--font-primary);
  padding: 8px 32px 8px 32px;
  font-size: 2rem;
  color: var(--color-primary);
  border: 5px solid var(--color-primary);
  transition: border-color color 350ms ease-in-out;
  margin-bottom: 54px;

  &[disabled] {
    cursor: not-allowed;
    background-color: var(--color-light);
    border-color: var(--color-secondary-fade);
    color: var(--color-secondary);
    pointer-events: none;
  }

  &:hover {
    color: var(--color-strong);
    background-color: var(--color-primary);
    border-color: var(--color-light);
  }
`;

export default Button;
