import styled from "styled-components";
import { QUERIES } from "../constants";
import Image from "next/image";
import Portal from "@reach/portal";
import SettingsAndModals from "../SettingsAndModals";
import { animated, useTransition } from "react-spring";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: block;
  }
`;

const IconWrapper = styled.div`
  width: max-content;
  & img {
    padding: 16px !important;
    background-color: var(--color-secondary);
    border: 5px solid var(--color-tertiary) !important;
    border-radius: 16px;
  }
`;

const PortalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: ${(p) => (p.isCollapsed ? "grid" : "none")};
  place-content: center;
  background-color: hsl(0deg 0% 0% / 0.65);
`;

function MobileSettings({
  mainRef,
  settingsCollapse,
  clickHandler,
  closeButtonHandler,
}) {
  const animationProp = {
    from: { opacity: 0.7, transform: "scaleY(-1)" },
    enter: { opacity: 1, transform: "scaleY(1)" },
    trail: 500,
  };
  const Transition = useTransition(settingsCollapse, animationProp);

  useEffect(() => {
    if (settingsCollapse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [settingsCollapse]);

  return (
    <Wrapper>
      <IconWrapper onClick={clickHandler}>
        <Image
          alt={`mobile-settings`}
          src={`/jobs/settings.png`}
          width={70}
          height={70}
        />
      </IconWrapper>

      <Portal>
        <PortalWrapper isCollapsed={settingsCollapse}>
          {Transition((props, animate) => (
            <animated.div style={props}>
              <SettingsAndModals
                mainRef={mainRef}
                mobileCloseButtonHandler={closeButtonHandler}
              />
            </animated.div>
          ))}
        </PortalWrapper>
      </Portal>
    </Wrapper>
  );
}

export default MobileSettings;
