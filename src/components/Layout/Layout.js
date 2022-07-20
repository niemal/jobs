import { useTransition } from "react-spring";
import { useState } from "react";
import styled from "styled-components";
import MetaHeader from "../MetaHeader";
import Header from "../Header";
import { BurgerModal } from "../Burger";
import Footer from "../Footer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  min-height: 100%;
  background-color: var(--color-background);
  z-index: -1;
`;

const Main = styled.main`
  z-index: 1;
`;

export default function Layout({
  title = "Software job statistics",
  imageUrl,
  preload = [],
  url = "",
  desc = "",
  children,
}) {
  const animationProp = {
    from: { opacity: 0.7, transform: "scaleY(-1)" },
    enter: { opacity: 1, transform: "scaleY(1)" },
    trail: 500,
  };

  const [burgerToggle, setBurgerToggle] = useState(false);
  const burgerTransition = useTransition(burgerToggle, {
    ...animationProp,
    from: { opacity: 0.7, transform: "scaleY(0)" },
    trail: 0,
  });

  return (
    <Wrapper>
      <MetaHeader
        title={title}
        imageUrl={imageUrl}
        preload={preload}
        url={url}
        desc={desc}
      />
      <Header
        burgerToggle={burgerToggle}
        burgerHandler={() => {
          setBurgerToggle((coll) => !coll);
        }}
      />

      <BurgerModal
        burgerToggle={burgerToggle}
        burgerTransition={burgerTransition}
      />

      <Main>{children}</Main>

      <Footer />
    </Wrapper>
  );
}

// const [svgHeaderX, setSvgHeaderX] = useState(0);
// const [svgHeaderY, setSvgHeaderY] = useState(0);
// const [svgFooterX, setSvgFooterX] = useState(0);
// const [svgFooterY, setSvgFooterY] = useState(0);
// const [svgHeight, setSvgHeight] = useState(0);
// const [svgWidth, setSvgWidth] = useState(0);

// useEffect(() => {
//   while (window.innerHeight === 0) {}
//   while (window.innerWidth === 0) {}

//   const processSize = () => {
//     setSvgHeight(window.innerHeight * 0.45);

//     console.log(window.innerHeight);
//     if (window.innerWidth > 1200) {
//       setSvgWidth(window.innerWidth - 500);

//       if (window.innerHeight < 900) {
//         setSvgFooterY(-20);
//       } else {
//         setSvgFooterY(-150);
//       }
//     } else {
//       setSvgWidth(window.innerWidth);
//       setSvgHeaderX(0);
//       setSvgHeaderY(0);
//       setSvgFooterX(300);
//       setSvgFooterY(0);

//       if (window.innerHeight < 741) {
//         setSvgFooterY(window.innerHeight * -0.05);
//       } else {
//         setSvgFooterY(window.innerHeight * -(window.innerHeight * 0.00017));
//       }
//     }
//   };

//   processSize();
//   window.addEventListener("resize", processSize);
// }, []);
