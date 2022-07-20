import styled from "styled-components";

export const CloseButton = styled.button.attrs({
  type: "button",
})`
  display: block;
  height: 50px;
  width: 50px;
  background-color: var(--color-primary);
  border: none;
  position: relative;
  transition: all 350ms ease-in-out;
  cursor: pointer;

  &:after {
    position: absolute;
    font-family: var(--font-secondary);
    font-weight: bold;
    top: 4px;
    bottom: 0;
    left: 9px;
    content: "X";
    font-size: 3.5rem;
    color: var(--color-light);
    line-height: 50px;
    text-align: center;
    transition: all 0.3s;
    margin-top: -6px;
    margin-left: 0px;
  }

  &:hover {
    background-color: var(--color-secondary);
  }
  &:hover:after {
    color: var(--color-tertiary);
  }
`;
