import styled from "styled-components";
import { NavEntries } from "../Header";
import { QUERIES } from "../constants";

const Note = styled.div`
  position: absolute;
  font-family: var(--font-secondary);
  top: 120px;
  right: 24px;
  text-align: right;
  width: 100%;
  font-size: 1.5rem;
  color: var(--color-light);
  font-weight: var(--font-weight-bold);
`;

const Link = styled.a`
  margin-left: 8px;
  color: var(--color-tertiary);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  font-weight: var(--font-weight-bold);
  transition: all 350ms;

  &:hover {
    color: var(--color-secondary);
  }
`;

const FooterLink = styled.a`
  display: block;
  text-decoration: none;
  color: var(--color-primary);
  transition: color 250ms ease-in-out;
  font-size: 2.5rem;
  font-family: var(--font-primary);

  &:hover {
    color: var(--color-light);
  }
`;

const OuterWrapper = styled.div`
  margin-top: auto;
  min-height: 200px;
  isolation: isolate;
  overflow: hidden;
  border-top: 7px solid var(--color-primary);
  background-color: var(--color-secondary);
`;

const InnerWrapper = styled.div`
  position: relative;
  background-color: var(--color-primary);
  width: 100%;
  min-height: 100%;
`;

const NavWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 32px;
  display: flex;
  padding: 0 32px;
  gap: 32px;
  justify-content: center;
  align-items: center;
  transform: skew(-5deg, -5deg);
`;

const SkewOne = styled.div`
  position: absolute;
  top: -45px;
  left: 0;
  min-height: 125px;
  width: 120%;
  background-color: var(--color-secondary);
  transform: skew(-5deg, -5deg);
`;

const SkewTwo = styled(SkewOne)`
  background-color: var(--color-tertiary);
  min-height: 10px;
  width: 120%;
  top: -35px;
  left: -25px;
`;

const SkewThree = styled(SkewTwo)`
  top: -50px;
  background-color: var(--color-primary);
`;

const SkewFour = styled(SkewTwo)`
  top: 66px;
`;

function Footer() {
  return (
    <OuterWrapper>
      <InnerWrapper>
        <SkewOne />
        <SkewTwo />
        <SkewThree />
        <SkewFour />

        <NavWrapper>
          {Object.keys(NavEntries).map((k) => (
            <FooterLink key={`${k}-footer`} href={NavEntries[k].link}>
              {k}
            </FooterLink>
          ))}
        </NavWrapper>

        <Note>
          Web-design and maintenance by
          <Link href="https://niemal.dev/">niemal</Link>
        </Note>
      </InnerWrapper>
    </OuterWrapper>
  );
}
// function Footer() {
//   return (
//     <Wrapper>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox={`0 0 1400 600`}
//         preserveAspectRatio={"none"}
//       >
//         <path
//           fillOpacity="1"
//           d="M0,288L80,250.7C160,213,320,139,480,128C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
//         ></path>
//       </svg>

// <Note>
//   Web-design and maintenance by
//   <Link href="https://niemal.dev/">niemal</Link>
// </Note>

{
  /* <LinksWrapper>
  {Object.keys(NavEntries).map((k) => (
    <FooterLink key={`${k}-footer`} href={NavEntries[k].link}>
      {k}
    </FooterLink>
  ))}
</LinksWrapper>; */
}
//     </Wrapper>
//   );
// }

export default Footer;
