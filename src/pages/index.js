import Layout from "../components/Layout";
import { ValueAnimation } from "../components/Animations";
import Figure from "../components/Figure";
import Skills from "../components/Skills";
import ComboEntry from "../components/ComboEntry";
import ComboRow from "../components/ComboRow";
import ComboSkills from "../components/ComboSkills";
import Levels from "../components/Levels";
import Image from "next/image";
import { useState } from "react";
import { config } from "../../lib/config";
import styled from "styled-components";

export async function getStaticProps() {
  return {
    props: {
      config: config,
    },
  };
}

export default function Home({ config }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  //const [total, setTotal] = useState('');

  const getStats = async () => {
    setLoading(true);
    const res = await fetch(`${config.siteUrl}/api/stats`, { method: "GET" });
    const result = await res.json();
    result.init = true;

    if (result.error) {
      console.log("Error: ", result.error);
      setLoading(false);
      setMainContent("-");
    } else {
      setStats(result);
      //setTotal(<ValueAnimation value={result.total}></ValueAnimation>)
      buildMainContent(result);
    }
  };

  const [skillsContent, setSkillsContent] = useState("");
  const buildSkillsContent = (data, showSkills = 3) => {
    let counter = 0;
    let signifyClass = "mostPopular";

    let skillSets = [];
    let skillElements = [];

    for (let skill in data.skills) {
      if (counter > showSkills) {
        break;
      } else if (counter % 3 === 0 && skillElements.length !== 0) {
        skillSets.push(skillElements);
        skillElements = [];
      }

      if (counter >= 3 && counter < 6) {
        signifyClass = "lessPopular";
      } else if (counter > 5) {
        signifyClass = "leastPopular";
      }

      let percent = Math.ceil((data.skills[skill] / data.total) * 100);
      skillElements.push(
        <Figure
          key={`${skill}-figure`}
          skill={skill}
          percent={percent}
          signify={signifyClass}
        />
      );
      counter += 1;
    }

    setSkillsContent(
      <Skills
        counter={counter}
        skillSets={skillSets}
        moreHandlerLast={(e) => {
          buildSkillsContent(data, 3);
          e.target.parentNode.scrollIntoView({ behavior: "smooth" });
        }}
        moreHandler={(e) => {
          buildSkillsContent(data, showSkills + 3);
          const y = e.target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: y - 44, behavior: "smooth" });
          // e.target.scrollIntoView({ top: -24, behavior: "smooth" });
        }}
      />
    );
  };

  const [combosContent, setCombosContent] = useState("");
  const buildCombosContent = (data, showCombos = 3) => {
    let counter = 0;
    let combosElements = [];

    for (let comboStr in data.comboSkills) {
      let combo = comboStr.split(",");
      if (counter >= showCombos) {
        break;
      }

      let comboEntryElements = [];
      for (let i = 0; i < combo.length; i++) {
        let count = data.skills[combo[i]];
        let percent = Math.ceil((count / data.total) * 100);

        comboEntryElements.push(
          <ComboEntry
            key={`${counter}-${combo[i]}`}
            entry={combo[i]}
            percent={percent}
            counter={i}
            max={combo.length}
          />
        );
      }

      combosElements.push(
        <ComboRow
          key={comboStr}
          comboStr={comboStr}
          data={data}
          counter={counter}
          entries={comboEntryElements}
        />
      );

      counter += 1;
    }

    setCombosContent(
      <ComboSkills
        counter={counter}
        skillComponents={combosElements}
        moreHandlerLast={(e) => {
          buildCombosContent(data, 3);
          e.target.parentNode.scrollIntoView({ behavior: "smooth" });
        }}
        moreHandler={(e) => {
          buildCombosContent(data, showCombos + 3);
          const y = e.target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: y - 120, behavior: "smooth" });
        }}
      />
    );
  };

  const [levelsContent, setLevelsContent] = useState("");
  const buildLevelsContent = (data) => {
    let total =
      data.levels.blank +
      data.levels.senior +
      data.levels.apprentice +
      data.levels.intern +
      data.levels.junior;

    setLevelsContent(
      <Levels
        blank={Math.ceil((data.levels.blank / total) * 100)}
        intern={Math.ceil((data.levels.intern / total) * 100)}
        apprentice={Math.ceil((data.levels.apprentice / total) * 100)}
        junior={Math.ceil((data.levels.junior / total) * 100)}
        senior={Math.ceil((data.levels.senior / total) * 100)}
      />
    );
  };

  const buildMainContent = (data) => {
    buildSkillsContent(data);
    buildCombosContent(data);
    buildLevelsContent(data);
    setLoading(false);
  };

  if (!stats.init) {
    setStats({ init: true });
    getStats();
  }

  return (
    <Layout>
      <LoadingWrapper isLoading={loading}>
        <Image src={"/jobs/loading.gif"} alt={``} width={200} height={200} />
      </LoadingWrapper>

      <Main isLoading={loading}>
        <Intro>
          There are a total of <ValueAnimation value={stats.total} /> software
          jobs data-mined.
        </Intro>

        {skillsContent}
        {combosContent}
        {levelsContent}
      </Main>
    </Layout>
  );
}

const LoadingWrapper = styled.div`
  display: ${(p) => (p.isLoading ? "block" : "none")};
  margin-left: auto;
  margin-right: auto;
  width: max-content;
`;

const Main = styled.div`
  display: ${(p) => (p.isLoading ? "none" : "flex")};
  flex-direction: column;
  gap: 32px;
  z-index: 1;
`;

const Intro = styled.div`
  text-align: center;
  font-family: var(--font-primary);
  color: var(--color-primary);
  font-size: 3rem;

  & div {
    display: inline-block;
  }
  & div span {
    font-size: 3rem;
    text-shadow: 2px 2px 2px var(--color-tertiary);
    color: var(--color-text);
    border: 5px solid var(--color-secondary);
    padding: 16px;
    border-radius: 5000px 10000px;
    background: linear-gradient(
      180deg,
      var(--color-primary) 33%,
      var(--color-secondary) 66%,
      var(--color-tertiary) 100%
    );
  }
`;
