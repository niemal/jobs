import Layout from '../components/layout';
import Header from '../components/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { ValueAnimation } from '../components/animations';
import { config } from '../lib/config';
import ReactTooltip from 'react-tooltip';

export async function getStaticProps() {
  return {
    props: {
      config: config
    }
  };
}

export default function Home({ config }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  //const [total, setTotal] = useState('');

  const getStats = async () => {
    setLoading(true);
    const res = await fetch(`${config.siteUrl}/api/stats`, { method: 'GET' });
    const result = await res.json();
    result.init = true;
  
    if (result.error) {
      console.log('Error: ', result.error);
      setLoading(false);
      setMainContent('-');
    } else {
      setStats(result);
      //setTotal(<ValueAnimation value={result.total}></ValueAnimation>)
      buildMainContent(result);
    }
  };

  const [skillsContent, setSkillsContent] = useState('');
  const buildSkillsContent = (data, showSkills=3) => {
    let counter = 0;
    let signifyClass = 'mostPopular';

    let skillSets = [];
    let skillElements = [];
    
    for (let skill in data.skills) {
      if (counter > showSkills) {
        break;
      } else if (counter % 3 === 0 && skillElements.length !== 0) {
        skillSets.push(skillElements);
        skillElements = [];
      }

      let originSkill = skill;
      if (skill === 'c#') {
        skill = 'csharp';
      } else if (skill === 'c++') {
        skill = 'cplusplus';
      } else if (skill === 'rest api') {
        skill = 'restApi';
      }

      if (counter >= 3 && counter < 6) {
        signifyClass = 'lessPopular';
      } else if (counter > 5) {
        signifyClass = 'leastPopular';
      }
      
      let percent = Math.ceil(data.skills[originSkill] / data.total * 100);
      skillElements.push(
        <figure data-tip={`${skill}: ${percent}%`} key={skill} className={`${styles.chart} ${styles[signifyClass]}`} data-percent={percent}>
          <ValueAnimation value={percent} percent={true}></ValueAnimation>
          <img className={`${styles.language} ${styles[skill]}`} alt={`${skill}`} src={`/jobs/${skill}.png`} />
          <svg width={200} height={200}>
            <circle className={styles.outer} cx="95" cy="95" r="85" transform="rotate(-90, 95, 95)"/>
          </svg>
        </figure>
      );
      skillElements.push(<ReactTooltip key={`${skill}-tooltip`} className={styles.tooltip} effect={`solid`} arrowColor={`#05668D`} />);
      counter += 1;
    }

    setSkillsContent(
      <div id={styles.skills}>
        <h2 className={styles.headerText}>skills</h2>
        <div className={styles.skillsContainer}>
          {skillSets.map((set, idx) => (
            <div key={idx} className={styles.skillSet}>
              {set}
            </div>
          ))}
        </div>
        {counter === 25 ? (
          <button className={styles.more} type={`button`} onClick={(e) => { buildSkillsContent(data, 3); e.target.parentNode.scrollIntoView({ behavior: 'smooth' }); }}>
            close
          </button>
        ) : (
          <button className={styles.more} type={`button`} onClick={(e) => { buildSkillsContent(data, showSkills+3); e.target.scrollIntoView({ behavior: 'smooth' }); }} disabled={counter === 25}>
            more
          </button>
        )}
      </div>
    );
  };

  const [combosContent, setCombosContent] = useState('');
  const buildCombosContent = (data, showCombos=3) => {
    let counter = 0;
    let combosElements = [];

    for (let comboStr in data.comboSkills) {
      let combo = comboStr.split(',');
      if (counter >= showCombos) {
        break;
      }

      let comboEntryElements = [];
      for (let i = 0; i < combo.length; i++) {
        let count = data.skills[combo[i]];

        if (combo[i] === 'c#') {
          combo[i] = 'csharp';
        } else if (combo[i] === 'c++') {
          combo[i] = 'cplusplus';
        } else if (combo[i] === 'rest api') {
          combo[i] = 'restApi';
        }

        let percent = Math.ceil(count / data.total * 100);
        // <img alt={``} src={`/jobs/${combo[i]}.png`} />
        if (i+1 !== combo.length) {
          comboEntryElements.push(
            <div key={i} className={`inline-block`}>
              <span data-tip={`${combo[i]}: ${percent}%`} className={`${styles.comboEntryContainer} flex-col p-2`}>
                <div className={styles.skillPercentage}>{percent}%</div>
                <Image style={{ position: 'absolute', display: 'inline-block',}} src={`/jobs/${combo[i]}.png`} width={100} height={100} objectFit={`contain`}/>
              </span>
              <ReactTooltip key={`${i}_tooltip`} className={styles.tooltip} effect={`solid`} arrowColor={`#05668D`}/>
              <span key={`${i}_+`} className={`${styles.comboEntryPlus} flex-col`}>+</span>
            </div>
          );
          /*comboEntryElements.push(
            <span key={i} data-tip={`${combo[i]}: ${percent}%`} className={`${styles.comboEntryContainer} flex-col p-2`}>
              <div className={styles.skillPercentage}>{percent}%</div>
              <img alt={``} src={`/${combo[i]}.png`} />
            </span>
          );
          comboEntryElements.push(
            <ReactTooltip key={`${i}_tooltip`} className={styles.tooltip} effect={`solid`} arrowColor={`#05668D`}/>
          );
          comboEntryElements.push(
            <span key={`${i}_+`} className={`${styles.comboEntryPlus} flex-col`}>+</span>
          );*/
          /*comboEntryElements.push(
            <span key={i}>
              <span data-tip={`${combo[i]}: ${percent}%`} className={`${styles.comboEntryContainer} flex-col`}>
                <div className={styles.skillPercentage}>{percent}%</div>
                <img alt={``} src={`/${combo[i]}.png`} />
              </span>
              <ReactTooltip className={styles.tooltip} effect={`solid`} arrowColor={`#05668D`}/>
              <span className={`${styles.comboEntryPlus} flex-col`}>+</span>
            </span>
          );*/
        } else {
          //<img alt={``} src={`/jobs/${combo[i]}.png`} />
          comboEntryElements.push(
            <div key={i} className={`inline-block`}>
              <span data-tip={`${combo[i]}: ${percent}%`} className={`${styles.comboEntryContainer} flex-col p-2`}>
                <div className={styles.skillPercentage}>{percent}%</div>
                <Image style={{ position: 'absolute', display: 'inline-block',}} src={`/jobs/${combo[i]}.png`} width={100} height={100} objectFit={`contain`}/>
              </span>
              <ReactTooltip key={`${i}-tooltip`} className={styles.tooltip} effect={`solid`} arrowColor={`#05668D`} />
            </div>
          );
          /*comboEntryElements.push(
            <span key={i} data-tip={`${combo[i]}: ${percent}%`} className={`${styles.comboEntryContainer} flex-col p-2`}>
              <div className={styles.skillPercentage}>{percent}%</div>
              <img alt={``} src={`/${combo[i]}.png`} />
            </span>
          );
          comboEntryElements.push(<ReactTooltip key={`${i}-tooltip`} className={styles.tooltip} effect={`solid`} arrowColor={`#05668D`} />)*/
        }
      }

      combosElements.push(
        <div key={comboStr} className={`${styles.comboEntry} flex justify-center items-center`}>
          <div className={`flex flex-row flex-nowrap`}>
            <span className={`${styles.comboEntryRank} flex-col`}>{counter + 1}.</span>
            <span key={comboStr + 'in'} className={`flex-col`}>
              {comboEntryElements}
            </span>
          </div>

          <span className={`${styles.comboSkillPercentage} flex flex-row items-center`}>
            <ValueAnimation value={(data.comboSkills[comboStr] / data.total) * 100} percent={true} toFixed={2}></ValueAnimation>
            <span className={styles.ofTotal}>of total job entries</span>
          </span>
        </div>
      );
      counter += 1;
    }

    setCombosContent(
      <div id={styles.comboSkills}>
        <h2 className={styles.headerText}>skill combos</h2>
        <div className={`${styles.skillsContainer} p-3`}>
          {combosElements}
        </div>
        {counter === 20 ? (
          <button className={styles.more} type={`button`} onClick={(e) => {
            buildCombosContent(data, 3);
            console.log(e.target);
            e.target.parentNode.scrollIntoView({ behavior: 'smooth' });
          }}>
            close
          </button>
        ) : (
          <button className={styles.more} type={`button`} onClick={(e) => {
            buildCombosContent(data, showCombos+3);
            console.log(e.target);
            e.target.scrollIntoView({ behavior: 'smooth' });
          }} style={{marginTop: '2rem'}} disabled={counter === 25}>
            more
          </button>
        )}
      </div>
    );
  };

  const [levelsContent, setLevelsContent] = useState('');
  const buildLevelsContent = (data) => {
    let total = data.levels.blank + data.levels.senior + data.levels.apprentice + data.levels.intern + data.levels.junior;

    setLevelsContent(
      <div id={styles.levels}>
        <h2 className={styles.headerText}>levels</h2>
        <div className={styles.levelsContainerOuter}>
          <span className={styles.levelsContainerInner}>
            <ValueAnimation value={Math.ceil(data.levels.blank / total * 100)} percent={true}></ValueAnimation>
            <div className={styles.levelText}>blank</div>
            <Image style={{ position: 'absolute', display: 'inline-block',}} src={`/jobs/blank.png`} width={100} height={100} objectFit={`contain`}/>
          </span>
          <span className={styles.levelsContainerInner}>
            <ValueAnimation value={Math.ceil(data.levels.intern / total * 100)} percent={true}></ValueAnimation>
            <div className={styles.levelText}>intern</div>
            <Image style={{ position: 'absolute', display: 'inline-block',}} src={`/jobs/intern.png`} width={100} height={100} objectFit={`contain`}/>
          </span>
          <span className={styles.levelsContainerInner}>
            <ValueAnimation value={Math.ceil(data.levels.apprentice / total * 100)} percent={true}></ValueAnimation>
            <div className={styles.levelText}>apprentice</div>
            <Image style={{ position: 'absolute', display: 'inline-block',}} src={`/jobs/apprentice.png`} width={100} height={100} objectFit={`contain`}/>
          </span>
          <span className={styles.levelsContainerInner}>
            <ValueAnimation value={Math.ceil(data.levels.junior / total * 100)} percent={true}></ValueAnimation>
            <div className={styles.levelText}>junior</div>
            <Image style={{ position: 'absolute', display: 'inline-block',}} src={`/jobs/junior.png`} width={100} height={100} objectFit={`contain`}/>
          </span>
          <span className={styles.levelsContainerInner}>
            <ValueAnimation value={Math.ceil(data.levels.senior / total * 100)} percent={true}></ValueAnimation>
            <div className={styles.levelText}>senior</div>
            <Image style={{ position: 'absolute', display: 'inline-block',}} src={`/jobs/senior.png`} width={100} height={100} objectFit={`contain`}/>
          </span>
        </div>
      </div>
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
    <div>
      <Header></Header>
      <Layout>
        <div className={`${loading ? 'visible' : 'hidden'} mx-auto w-1/2`}>
          <Image src={'/jobs/loading.gif'} alt={``} width={200} height={200} />
        </div>
        <div id={styles.main} className={`${loading ? 'hidden' : 'visible'}`}>
          <div id={styles.intro}>There are a total of <ValueAnimation value={stats.total}></ValueAnimation> software jobs data-mined.</div>
          {skillsContent}
          {combosContent}
          {levelsContent}
        </div>
      </Layout>
    </div>
  );
}