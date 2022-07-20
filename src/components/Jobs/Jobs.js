import styled from "styled-components";
import Image from "next/image";
import { QUERIES, SKILLS } from "../constants";
import { MainContext } from "../../pages/search";
import { QuickViewContext } from "../SearchIndex";
import { useContext } from "react";
import { Virtuoso } from "react-virtuoso";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const VirtuosoWrapper = styled.div`
  width: 100%;

  & > div {
    width: 100% !important;
    height: 80vh !important;
    border: 5px solid var(--color-tertiary);
    background-color: var(--color-gray-400);
    border-radius: 16px 16px 0px 16px;
    /* border-right: 0;
    border-left: 0; */
  }

  & > div > div {
    padding: 24px;
  }
  & > div > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const EntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EntryLink = styled.a`
  text-decoration: none;
  border: solid 3px var(--color-primary);
  background-color: var(--color-tertiary);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding: 16px;
  box-shadow: 2px 2px 4px var(--color-tertiary);
  transition: border-color background-color 350ms ease-in-out;

  &:hover {
    background-color: var(--color-secondary-fade);
    border-color: var(--color-tertiary);
  }
`;

const EntryTitle = styled.div`
  font-family: var(--font-secondary);
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-light);
  transition: color 350ms ease-in-out;
  text-align: center;
  padding: 8px;
  overflow-wrap: break-word;

  ${EntryLink}:hover & {
    color: var(--color-primary);
  }
`;

const SkillsContainer = styled.div`
  padding-top: 8px;
  border-top: 1px solid var(--color-primary);
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;

  ${EntryLink}:hover & {
    border-color: var(--color-primary);
  }

  & img {
    display: inline-block;
    margin-right: 8px;
  }
`;

const SkillWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-primary);
  color: var(--color-primary);
  font-size: 1.5rem;
  padding-left: 16px;
  transition: color 350ms ease-in-out;
`;

const LevelsContainer = styled.div`
  border-top: 1px solid var(--color-primary);
  color: var(--color-light);
  width: 100%;
  text-align: center;

  ${EntryLink}:hover & {
    border-color: var(--color-primary);
  }
`;

const LevelWrapper = styled.div`
  display: inline-block;
  margin-top: 12px;
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-medium);
  font-size: 1.5rem;
  font-style: italic;
  padding-right: 8px;

  & span {
    font-family: var(--font-primary);
    color: var(--color-primary);
    text-shadow: 1px 1px 2px var(--color-gray-900);
    padding-left: 8px;
  }
`;

const DateContainer = styled.div`
  border-top: 1px solid var(--color-primary);

  ${EntryLink}:hover & {
    border-color: var(--color-primary);
  }
`;

const DateWrapper = styled.div`
  margin-top: 16px;
  font-family: var(--font-primary);
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);

  & span {
    margin-left: 8px;
    text-shadow: none;
  }
`;

const Button = styled.button.attrs({
  type: "button",
})`
  display: none;
  border: solid 3px var(--color-primary);
  background-color: var(--color-tertiary);
  width: max-content;
  padding: 8px 24px;
  border-radius: 48px;
  margin-top: 8px;

  font-family: var(--font-primary);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--color-secondary);
  box-shadow: 2px 2px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(255, 255, 255, 0.7);

  @media ${QUERIES.tabletAndSmaller} {
    display: block;
  }
`;

const NotFound = styled.div`
  font-family: var(--font-secondary);
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  font-style: italic;
  color: var(--color-primary);
`;

function Jobs({ jobsRef }) {
  const { jobs, infoContent, setInfoContent, setIndex } =
    useContext(MainContext);
  const { setQuickView } = useContext(QuickViewContext);

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <NotFound>Search result not found.</NotFound>
      </Wrapper>
    );
  }

  return (
    <VirtuosoWrapper>
      <Virtuoso
        ref={jobsRef}
        // style={{
        //   width: "100%",
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   gap: "16px",
        //   padding: "16px",
        // }}
        data={jobs}
        endReached={() => {
          setIndex((i) => i + 5);
        }}
        overscan={0}
        itemContent={(idx, job) => {
          if (idx + 1 === jobs.length) {
            return null;
          } else {
            return (
              <EntryWrapper key={`jobs-${idx}`}>
                <EntryLink
                  href={job.link}
                  onMouseEnter={(e) => {
                    let content = job.info.content.split("\n");
                    let trimmed = [job.title];
                    trimmed = trimmed.concat(content.map((c) => c.trim()));
                    if (trimmed.join() !== infoContent.join()) {
                      setInfoContent(trimmed);
                    }
                    //setInfoContent(['']);
                    //getContent(job.title, job.link);
                  }}
                >
                  <EntryTitle>{job.title}</EntryTitle>

                  <SkillsContainer>
                    {job.info.skills.map((skill) => (
                      <SkillWrapper key={`${idx}-${skill}`}>
                        <Image
                          src={`/jobs/${SKILLS[skill].img}`}
                          alt={`${skill}`}
                          width={40}
                          height={40}
                        />
                        <span>{skill}</span>
                      </SkillWrapper>
                    ))}
                  </SkillsContainer>

                  <LevelsContainer>
                    {job.info.level.map((level, l_idx) => {
                      if (l_idx + 1 === job.info.level.length) {
                        return (
                          <LevelWrapper key={`${idx}-${level}`}>
                            {level}
                          </LevelWrapper>
                        );
                      } else {
                        return (
                          <LevelWrapper key={`${idx}-${level}`}>
                            {level} <span>/</span>
                          </LevelWrapper>
                        );
                      }
                    })}
                  </LevelsContainer>

                  <DateContainer>
                    <DateWrapper>
                      Parsed:{" "}
                      <span>{new Date(job.info.time).toLocaleString()}</span>
                    </DateWrapper>
                  </DateContainer>
                </EntryLink>

                <Button
                  onClick={() => {
                    //setInfoContent(['']);
                    //getContent(job.title, job.link);
                    let content = job.info.content.split("\n");
                    let trimmed = [job.title];
                    trimmed = trimmed.concat(content.map((c) => c.trim()));
                    if (trimmed.join() !== infoContent.join()) {
                      setInfoContent(trimmed);
                    }
                    setQuickView(true);
                  }}
                >
                  quick view
                </Button>
              </EntryWrapper>
            );
          }
        }}
      />
    </VirtuosoWrapper>
  );
}
// function Jobs() {
//   const { jobs, infoContent, setInfoContent } = useContext(MainContext);
//   const { setQuickView } = useContext(QuickViewContext);

//   return (
//     <Wrapper>
//       {jobs.length !== 0 ? (
//         jobs.map((job, idx) => {
//           if (idx + 1 === jobs.length) {
//             return null;
//           }
//           return (
//             <EntryWrapper key={`jobs-${idx}`}>
//               <EntryLink
//                 href={job.link}
//                 onMouseEnter={(e) => {
//                   let content = job.info.content.split("\n");
//                   let trimmed = [job.title];
//                   trimmed = trimmed.concat(content.map((c) => c.trim()));
//                   if (trimmed.join() !== infoContent.join()) {
//                     setInfoContent(trimmed);
//                   }
//                   //setInfoContent(['']);
//                   //getContent(job.title, job.link);
//                 }}
//               >
//                 <EntryTitle>{job.title}</EntryTitle>

//                 <SkillsContainer>
//                   {job.info.skills.map((skill) => (
//                     <SkillWrapper key={`${idx}-${skill}`}>
//                       <Image
//                         src={`/jobs/${SKILLS[skill].img}`}
//                         alt={`${skill}`}
//                         width={40}
//                         height={40}
//                       />
//                       <span>{skill}</span>
//                     </SkillWrapper>
//                   ))}
//                 </SkillsContainer>

//                 <LevelsContainer>
//                   {job.info.level.map((level, l_idx) => {
//                     if (l_idx + 1 === job.info.level.length) {
//                       return (
//                         <LevelWrapper key={`${idx}-${level}`}>
//                           {level}
//                         </LevelWrapper>
//                       );
//                     } else {
//                       return (
//                         <LevelWrapper key={`${idx}-${level}`}>
//                           {level} <span>/</span>
//                         </LevelWrapper>
//                       );
//                     }
//                   })}
//                 </LevelsContainer>

//                 <DateContainer>
//                   <DateWrapper>
//                     Parsed:{" "}
//                     <span>{new Date(job.info.time).toLocaleString()}</span>
//                   </DateWrapper>
//                 </DateContainer>
//               </EntryLink>

//               <Button
//                 onClick={() => {
//                   //setInfoContent(['']);
//                   //getContent(job.title, job.link);
//                   let content = job.info.content.split("\n");
//                   let trimmed = [job.title];
//                   trimmed = trimmed.concat(content.map((c) => c.trim()));
//                   if (trimmed.join() !== infoContent.join()) {
//                     setInfoContent(trimmed);
//                   }
//                   setQuickView(true);
//                 }}
//               >
//                 quick view
//               </Button>
//             </EntryWrapper>
//           );
//         })
//       ) : (
//         <NotFound>Search result not found.</NotFound>
//       )}
//     </Wrapper>
//   );
// }

export default Jobs;
