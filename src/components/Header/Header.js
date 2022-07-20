import styled from "styled-components";
import { NavLink } from "../Animations";
import { BurgerIcon } from "../Burger";
import uuid from "uuidjs";
import { QUERIES } from "../constants";

export const NavEntries = {
  home: {
    spring: (
      <NavLink key={uuid.generate()} link={"/jobs"} name={"home"}></NavLink>
    ),
    link: "/jobs",
  },
  search: {
    spring: (
      <NavLink
        key={uuid.generate()}
        link={"/jobs/search"}
        name={"search"}
      ></NavLink>
    ),
    link: "/jobs/search",
  },
  blog: {
    spring: (
      <NavLink key={uuid.generate()} link={"/blog"} name={"blog"}></NavLink>
    ),
    link: "/blog",
  },
};

const HeaderNote = styled.div`
  display: ${(p) => (p.hidden ? "none" : "block")};
  text-align: center;
  align-self: center;
  font-family: var(--font-secondary);
  color: var(--color-tertiary);
  font-size: ${32 / 16}rem;
  font-weight: var(--font-weight-bold);
  transform: skew(5deg, 5deg);

  @media ${QUERIES.tabletAndSmaller} {
    margin-top: 64px;
  }
`;

const Logo = styled.span`
  font-family: var(--font-primary);
  font-size: ${32 / 16}rem;
  padding-right: 16px;
`;

const LogoText = styled.span`
  font-family: var(--font-secondary);
  font-size: ${28 / 16}rem;
  font-weight: var(--font-weight-medium);
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  font-size: ${48 / 16}rem;
  cursor: pointer;
  transform: skew(5deg, 5deg);

  @media ${QUERIES.laptopAndSmaller} {
    margin-top: 28px;
    gap: 4px;
  }

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const NavWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 16px;
  display: flex;
  padding: 0 32px;
  gap: 8px;
  justify-content: space-between;
  align-items: baseline;
`;

const Filler = styled.div`
  flex: 1;
  max-width: 150px;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const OuterWrapper = styled.div`
  min-height: 260px;
  overflow: ${(p) => (p.burgerToggle ? "auto" : "hidden")};
  width: 100%;
`;

const InnerWrapper = styled.div`
  position: relative;
  background-color: var(--color-primary);
  width: 100%;
  min-height: 150px;

  @media ${QUERIES.phoneAndSmaller} {
    min-height: 195px;
  }
`;

const SkewOne = styled.div`
  position: absolute;
  bottom: -45px;
  left: 0;
  min-height: 125px;
  width: 120%;
  background-color: var(--color-secondary);
  transform: skew(5deg, 5deg);

  @media ${QUERIES.phoneAndSmaller} {
    left: -25px;
  }
`;

const SkewTwo = styled(SkewOne)`
  background-color: var(--color-tertiary);
  min-height: 10px;
  width: 120%;
  bottom: -35px;
  left: -25px;
`;

const SkewThree = styled(SkewTwo)`
  bottom: -50px;
  background-color: var(--color-primary);
`;

const SkewFour = styled(SkewTwo)`
  bottom: 66px;

  @media ${QUERIES.phoneAndSmaller} {
    background-color: var(--color-secondary);
  }
`;

const BurgerWrapper = styled.div`
  position: ${(p) => (p.burgerToggle ? "fixed" : "relative")};
  margin-left: ${(p) => (p.burgerToggle ? "82%" : "0")};
  height: 65px;
  width: 75px;
  padding: 8px;
  z-index: 3;
  border: ${(p) =>
    p.burgerToggle ? "3px solid var(--color-tertiary)" : "none"};
  border-radius: 16px;
  background-color: ${(p) =>
    p.burgerToggle ? "var(--color-secondary)" : "transparent"};

  box-shadow: ${(p) =>
    p.burgerToggle ? "3px 3px 6px var(--color-tertiary)" : "none"};

  @media ${QUERIES.phoneAndSmaller} {
    margin-left: ${(p) => (p.burgerToggle ? "68%" : "0")};
  }
`;

function Header({ burgerToggle, burgerHandler }) {
  return (
    <OuterWrapper burgerToggle={burgerToggle}>
      <InnerWrapper>
        <SkewOne />
        <SkewTwo />
        <SkewThree />
        <SkewFour />

        <NavWrapper>
          <Filler />
          <HeaderNote hidden={burgerToggle}>
            <Logo>&lt;/&gt;</Logo>
            <LogoText>
              Explore statistics and search for software jobs.
            </LogoText>
          </HeaderNote>

          <NavLinks>
            {Object.keys(NavEntries).map((k) => NavEntries[k].spring)}
          </NavLinks>

          <BurgerWrapper burgerToggle={burgerToggle}>
            <BurgerIcon burgerToggle={burgerToggle} handler={burgerHandler} />
          </BurgerWrapper>
        </NavWrapper>
      </InnerWrapper>
    </OuterWrapper>
  );
}

export default Header;
