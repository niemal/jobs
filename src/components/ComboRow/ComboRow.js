import { ValueAnimation } from "../Animations";
import styled from "styled-components";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  border: 5px solid var(--color-tertiary);
  filter: drop-shadow(2px 2px 2px var(--color-tertiary));
  background-color: var(--color-secondary);
  border-radius: 40px;
  padding: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    flex-direction: column;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const Rank = styled.span`
  padding-right: 32px;
  font-size: 4rem;
  font-family: var(--font-primary);
  color: var(--color-primary);

  @media ${QUERIES.phoneAndSmaller} {
    padding-right: 0;
    margin-bottom: -24px;
  }
`;

const PercentWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: var(--font-primary);
  color: var(--color-tertiary);
  font-size: 2rem;
`;

const AnimationWrapper = styled.div`
  border: 3px solid var(--color-primary);
  padding: 8px;
  border-radius: 0px 40px 0px 0px;
  background-color: var(--color-light);

  @media ${QUERIES.tabletAndSmaller} {
    border-radius: 24px;
  }
`;

const Total = styled.div`
  margin-left: 8px;
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-medium);
  font-size: 1.5rem;
`;

function ComboRow({ counter, entries, comboStr, data }) {
  return (
    <Wrapper>
      <TopWrapper>
        <Rank>{counter + 1}.</Rank>
        {entries}
      </TopWrapper>

      <PercentWrapper>
        <AnimationWrapper>
          <ValueAnimation
            value={(data.comboSkills[comboStr] / data.total) * 100}
            percent={true}
            toFixed={2}
          />
        </AnimationWrapper>
        <Total>of total job entries</Total>
      </PercentWrapper>
    </Wrapper>
  );
}

export default ComboRow;
