import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const Wrapper = styled.div`
  & > div {
    font-family: var(--font-primary);
    color: var(--color-tertiary);
    font-size: ${28 / 16}rem;
    background-color: var(--color-secondary);
    border: 5px solid var(--color-primary);
    border-bottom: 0;
    border-top: 0;
    width: max-content;
    max-width: 70ch;
  }
`;

function Tooltip({ place }) {
  return (
    <Wrapper>
      <ReactTooltip effect={`solid`} place={place} arrowColor={`#05668D`} />
    </Wrapper>
  );
}

export default Tooltip;
