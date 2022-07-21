import styled from "styled-components";
import Image from "next/image";
import Tooltip from "../Tooltip";
import { QUERIES, SKILLS } from "../constants";

const Wrapper = styled.div`
  display: flex;

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
    align-items: center;
  }
`;

const InnerWrapper = styled.div`
  padding: 8px;
  /* filter: drop-shadow(2px 2px 2px var(--color-tertiary)); */
  & > span {
    position: absolute;
    display: inline-block;
  }
`;

const PercentWrapper = styled.div`
  position: absolute;
  transform: translate(-50%, 50%);
  font-size: 2rem;
  font-family: var(--font-primary);
  background-color: var(--color-tertiary-fade);
  border-radius: 16px;
  padding: 8px;
  color: var(--color-light);
  text-shadow: 1px 1px 2px var(--font-gray-900);
  z-index: 2;
`;

const Plus = styled.span`
  display: inline-block;
  padding-right: 40px;
  padding-left: 12px;
  font-size: 4rem;
  font-family: var(--font-primary);
  color: var(--color-primary);

  @media ${QUERIES.phoneAndSmaller} {
    padding-right: 0;
    padding-left: 0;
    margin-bottom: -32px;
    margin-top: -32px;
  }
`;

function ComboEntry({ entry, percent, counter, max }) {
  return (
    <Wrapper>
      <Tooltip label={`${entry}: ${percent}%`}>
        <InnerWrapper data-tip={`${entry}: ${percent}%`}>
          <PercentWrapper>{percent}%</PercentWrapper>
          <Image
            src={`/jobs/${SKILLS[entry].img}`}
            width={100}
            height={100}
            objectFit={`contain`}
          />
        </InnerWrapper>
        {/* <Tooltip skill={entry} /> */}
        {/* <Tooltip skill={entry} place={"bottom"} /> */}
      </Tooltip>

      {counter + 1 !== max ? <Plus>+</Plus> : ""}
    </Wrapper>
  );
}

export default ComboEntry;
