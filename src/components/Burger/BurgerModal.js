import styled from "styled-components";
import { animated } from "react-spring";
import { NavEntries } from "../Header";
import Image from "next/image";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  & div {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-primary);
    z-index: 2;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  flex-basis: 150px;
  gap: 36px;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 8px;
  text-decoration: none;
  border: 5px solid var(--color-secondary);
  background: linear-gradient(
    50deg,
    var(--color-text) 13%,
    var(--color-primary) 44%,
    var(--color-secondary) 100%
  );
  box-shadow: 3px 3px 6px var(--color-tertiary);
  border-radius: 16px 16px 0px 0px;
  width: max-content;
  color: var(--color-tertiary);
`;

const LinkSpan = styled.span`
  font-family: var(--font-primary);
  font-size: 3rem;
`;

const Footer = styled.footer`
  font-family: var(--font-secondary);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  font-size: 1.5rem;
  padding: 0px 32px;
  text-align: center;
`;

export function BurgerModal({ burgerToggle, burgerTransition }) {
  return (
    <>
      {burgerToggle ? (
        <Wrapper>
          {burgerTransition((props, animate) => (
            <animated.div style={props}>
              <NavContainer>
                {Object.keys(NavEntries).map((k) => (
                  <StyledLink key={`${k}-burger`} href={NavEntries[k].link}>
                    <Image
                      alt={k}
                      src={`/jobs/${k}.png`}
                      width={65}
                      height={65}
                    />
                    <LinkSpan>{k}</LinkSpan>
                  </StyledLink>
                ))}
              </NavContainer>

              <Footer>
                Search for a software job or just take a peek on what&apos;s
                going on. Alternatively, you can also check out my blog. :)
              </Footer>
            </animated.div>
          ))}
        </Wrapper>
      ) : (
        ""
      )}
    </>
  );
}
