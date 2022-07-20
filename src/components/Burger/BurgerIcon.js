import styled from "styled-components";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    display: block;
  }
`;

const BurgerIconDiv = styled.div`
  padding-left: ${(p) => (p.burgerToggle ? "2px" : "0")};
  background: ${(p) => (p.burgerToggle ? "var(--color-gray-800)" : "white")};
  width: 50px;
  height: 5px;
  position: relative;
  transition: white 10ms 300ms ease;
  transform: translateY(20px);

  &:before,
  &:after {
    transition: top 300ms 350ms ease, transform 300ms 50ms ease;
    position: absolute;
    background: ${(p) => (p.burgerToggle ? "var(--color-gray-800)" : "white")};
    width: 50px;
    height: 5px;
    content: "";
  }
  &:before {
    top: -15px;
  }
  &:after {
    top: 15px;
  }
`;

const IconWrapper = styled.label`
  cursor: pointer;
  margin: auto;
  width: 50px;
  height: 40px;
`;

const MenuTrigger = styled.input.attrs({
  type: "checkbox",
})`
  display: none;

  &:checked ~ ${IconWrapper} ${BurgerIconDiv} {
    background: transparent;
    &:after,
    &:before {
      transition: top 300ms 50ms ease, transform 300ms 350ms ease;
      top: 0;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
`;

export function BurgerIcon({ burgerToggle, handler, id = "toggle-burger" }) {
  return (
    <Wrapper>
      <MenuTrigger id={id} onClick={handler} />
      <IconWrapper htmlFor={id}>
        <BurgerIconDiv burgerToggle={burgerToggle} />
      </IconWrapper>
    </Wrapper>
  );
}
