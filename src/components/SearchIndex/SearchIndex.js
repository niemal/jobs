import styled from "styled-components";
import Image from "next/image";
import Jobs from "../Jobs";
import SearchInput from "../SearchInput";
import SettingsAndModals from "../SettingsAndModals";
import MobileSettings from "../MobileSettings";
import AnchorArrow from "../AnchorArrow";
import { MainContext } from "../../pages/search";
import { useContext, createContext, useRef, useState, useEffect } from "react";
import QuickView from "../QuickView";
import { QUERIES } from "../constants";

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(350px, 1fr) minmax(250px, 700px) minmax(
      300px,
      1fr
    );
  grid-template-rows: 1fr;

  @media ${QUERIES.tabletAndSmaller} {
    grid-template-columns: minmax(280px, 1fr) minmax(350px, 1fr);
  }

  @media ${QUERIES.phoneAndSmaller} {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  grid-column: 1;
  grid-row: 1;
  position: sticky;
  align-self: start;
  top: 0;
  z-index: 3;

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

const MidColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 2;
  gap: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    padding: 16px;
  }
  @media ${QUERIES.phoneAndSmaller} {
    grid-column: 1;
  }
`;

const RightColumn = styled.div`
  grid-column: 3;
  grid-row: 1;
  position: sticky;
  align-self: start;
  place-content: center;
  top: 0;

  @media ${QUERIES.tabletAndSmaller} {
    grid-column: 1;
    width: 100%;
  }
`;

const AmountWrapper = styled.div`
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-bold);
  font-size: 1.5rem;
  margin-top: 16px;
  color: var(--color-primary);

  @media ${QUERIES.tabletAndSmaller} {
    text-align: center;
  }
`;

const AmountSpan = styled.span`
  font-family: var(--font-primary);
  border: 2px solid var(--color-secondary-fade);
  border-radius: 32px;
  padding: 4px;
`;

const LoadingWrapper = styled.div`
  display: ${(p) => (p.isLoading ? "block" : "none")};
`;

const TotalFetched = styled.div`
  font-family: var(--font-secondary);
  font-size: 1.5rem;
  margin-top: 16px;
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);

  & span {
    font-family: var(--font-primary);
    border: 2px solid var(--color-secondary-fade);
    border-radius: 32px;
    padding: 8px;
  }

  @media ${QUERIES.tabletAndSmaller} {
    text-align: center;
  }
`;

export const QuickViewContext = createContext();

function SearchIndex() {
  const {
    loading,
    infoContent,
    triggerInfoContent,
    setTriggerInfoContent,
    endSearch,
    setEndSearch,
    setSearchInput,
    setIndex,
    jobs,
    index,
  } = useContext(MainContext);

  const mainRef = useRef(null);

  const [quickView, setQuickView] = useState(false);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
    setTriggerInfoContent(false);
    const timer = setTimeout(() => {
      setTriggerInfoContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [infoContent]);

  const [settingsCollapse, setSettingsCollapse] = useState(false);

  return (
    <Content ref={mainRef}>
      <LeftColumn>
        <SettingsAndModals
          mainRef={mainRef}
          // mobileCloseButtonHandler={() => {
          //   setSettingsCollapse(false);
          // }}
        />
      </LeftColumn>
      <MidColumn>
        <SearchInput
          placeholder={"Search content.."}
          onChange={(e) => {
            setEndSearch(false);
            setSearchInput(e.target.value);
            setIndex(0);
          }}
        />

        {jobs.length !== 0 ? (
          <AmountWrapper>
            {jobs[jobs.length - 1] === 1 ? "" : "A total of "}
            <AmountSpan>{jobs[jobs.length - 1]}</AmountSpan>{" "}
            {jobs[jobs.length - 1] === 1 ? "job has" : "jobs have"} been found.
          </AmountWrapper>
        ) : (
          ""
        )}

        <MobileSettings
          mainRef={mainRef}
          settingsCollapse={settingsCollapse}
          clickHandler={(e) => {
            setSettingsCollapse(true);
          }}
          closeButtonHandler={(e) => {
            setSettingsCollapse(false);
            console.log(settingsCollapse);
          }}
        />

        <QuickViewContext.Provider value={{ setQuickView, infoContent }}>
          <Jobs />
        </QuickViewContext.Provider>

        <LoadingWrapper isLoading={loading}>
          <Image src={"/jobs/loading.gif"} alt={``} width={200} height={200} />
        </LoadingWrapper>
        {/* <TotalFetched>
          A total of <span>{jobs.length -1}</span> job(s) have been fetched.
        </TotalFetched> */}
        {/* {endSearch && jobs.length !== 0 ? ( */}
        {jobs.length !== 0 ? (
          <TotalFetched>
            {jobs[jobs.length - 1] === 1 ? "" : "A total of "}
            {/* <span>{jobs[jobs.length - 1]}</span>{" "} */}
            <span>{jobs.length - 1}</span>{" "}
            {jobs[jobs.length - 1] === 1 ? "job has" : "jobs have"} been
            fetched.
          </TotalFetched>
        ) : (
          ""
        )}
      </MidColumn>

      <RightColumn>
        <QuickViewContext.Provider
          value={{ quickView, setQuickView, infoContent, triggerInfoContent }}
        >
          <QuickView />
        </QuickViewContext.Provider>
        <AnchorArrow index={index} endSearch={endSearch} mainRef={mainRef} />
      </RightColumn>
    </Content>
  );
}

export default SearchIndex;
