import Layout from '../components/layout';
import Header from '../components/head';
import Image from 'next/image';
import styles from '../styles/Search.module.css';
import { useTransition, animated, useSpring } from 'react-spring';
import { isMobile } from 'react-device-detect';
import { useState, useRef, useEffect } from 'react';
import { config } from '../lib/config';

import dynamic from "next/dynamic";
const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export async function getStaticProps() {
  return {
    props: {
      config: config
    }
  };
}

export default function Search({ config }) {
    const skillImages = {
        'ruby': 'ruby.png',
        'javascript': 'javascript.png',
        'python': 'python.png',
        'html': 'html.png',
        'css': 'css.png',
        'react': 'react.png',
        'angular': 'angular.png',
        'c++': 'cplusplus.png',
        'graphql': 'graphql.png',
        'typescript': 'typescript.png',
        'frontend': 'frontend.png',
        'backend': 'backend.png',
        'rest api': 'restApi.png',
        'postgres': 'postgres.png',
        'redis': 'redis.png',
        'aws': 'aws.png',
        'docker': 'docker.png',
        'mysql': 'mysql.png',
        'mongodb': 'mongodb.png',
        'kubernetes': 'kubernetes.png',
        'nodejs': 'nodejs.png',
        'java': 'java.png',
        'php': 'php.png',
        'c#': 'csharp.png',
        'c': 'c.png',
        'vue': 'vue.png',
        'redux': 'redux.png',
        'go': 'go.png',
        'rust': 'rust.png',
        'swift': 'swift.png',
        'perl': 'perl.png',
        'haskell': 'haskell.png',
        'bash': 'bash.png',
        'groovy': 'groovy.png',
        'clojure': 'clojure.png'
    };
    const contentRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [index, setIndex] = useState(0);
    const [cooldown, setCooldown] = useState(false);
    const [endSearch, setEndSearch] = useState(false);

    const getJobs = async () => {
        setLoading(true);
        const res = await fetch(`${config.siteUrl}/api/jobs/${index}`, { method: 'GET' });
        const result = await res.json();

        if (result.error) {
            console.log('Error: ', result.error);
        } else {
            if (result.length === 1) {
                setLoading(false);
                setEndSearch(true);
                return;
            }
            if (index === 0) {
                setJobs(result);
            } else {
                setJobs((jobs) => {
                    jobs.pop();
                    return jobs.concat(result);
                });
            }
        }
        setLoading(false);
    }

    const search = async () => {
        setLoading(true);
        console.log(`${config.siteUrl}/api/search/${searchInput}=${index}`);
        const res = await fetch(`${config.siteUrl}/api/search/${searchInput}=${index}`, { method: 'GET' });
        const result = await res.json();

        if (result.error) {
            console.log('Error: ', result.error);
        } else {
            if (result?.notFound) {
                setLoading(false);
                setEndSearch(true);
                setInfoContent([]);
                setJobs([]);
                return;
            }
            if (result.length === 1) {
                setLoading(false);
                setEndSearch(true);
                return;
            }
            
            if (index === 0) {
                setJobs(result);
            } else {
                setJobs((jobs) => {
                    jobs.pop();
                    return jobs.concat(result);
                });
            }
        }
        setLoading(false);
    }

    const searchWithSettings = async (settingType) => {
        setLoading(true);
        let queryTags;
        if (tags.length > 0) {
            queryTags = tags.join(',');
            queryTags = queryTags.replace('#', 'sharp');
        } else {
            queryTags = 'any';
        }

        let queryLevels;
        if (levels.length > 0) {
            queryLevels = levels.join(',');
        } else {
            queryLevels = 'any';
        }

        let queryDate;
        if (dateInput.length > 0) {
            queryDate = dateInput;
        } else {
            queryDate = 'any';
        }

        //console.log(queryDate);

        console.log(`${config.siteUrl}/api/search/${settingType}?tags=${queryTags}&levels=${queryLevels}&date=${queryDate.replaceAll('/', '_')}&search=${searchInput}&index=${index}`);
        const res = await fetch(`${config.siteUrl}/api/search/${settingType}?tags=${queryTags}&levels=${queryLevels}&date=${queryDate.replaceAll('/', '_')}&search=${searchInput}&index=${index}`, { method: 'GET' });
        const result = await res.json();

        if (result.error) {
            console.log('Error: ', result.error);
        } else {
            if (result.notFound || result.invalidDate) {
                console.log(result);
                setLoading(false);
                setEndSearch(true);
                setInfoContent([]);
                setJobs([]);
                return;
            }
        
            if (result.length === 1) {
                setLoading(false);
                setEndSearch(true);
                return;
            }

            if (index === 0) {
                setJobs(result);
            } else {
                setJobs((jobs) => {
                    jobs.pop();
                    return jobs.concat(result);
                });
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        window.onscroll = () => {
            let bottom = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;
            if (bottom - window.scrollY <= 200 && !cooldown) {
                setIndex(i => (i+5));
                setCooldown(true);
                
                const timer = setTimeout(() => {
                    setCooldown(false);
                }, 700);
                return () => clearTimeout(timer);
            }
        }
    }, [index, searchInput, cooldown]);

    const animationProp = {
        from: { opacity: 0.7, transform: 'scaleY(-1)', },
        enter: { opacity: 1, transform: 'scaleY(1)', },
        trail: 500
    };
    const upArrowTrans = useTransition(index, animationProp);

    const [tags, setTags] = useState([]);
    const [levels, setLevels] = useState([]);
    const [dateInput, setDateInput] = useState('');
    const [looseMode, setLooseMode] = useState(true);
    const content = useRef(null);
    
    const [levelsModal, setLevelsModal] = useState(false);
    const levelsTrans = useTransition(levelsModal, animationProp);

    const [levelsModalView, setLevelsModalView] = useState([]);
    const allLevels = ['blank', 'intern', 'apprentice', 'junior', 'senior'];
    if (levelsModalView.length === 0) {
        setLevelsModalView(allLevels);
    }

    const [tagsModal, setTagsModal] = useState(false);
    const tagsTrans = useTransition(tagsModal, animationProp);

    const [tagsModalView, setTagsModalView] = useState([]);
    const allTags = Object.keys(skillImages);
    if (tagsModalView.length === 0) {
        setTagsModalView(allTags);
    }

    const [genStats, setGenStats] = useState({});
    const getStats = async () => {
        const res = await fetch(`${config.siteUrl}/api/stats`, { method: 'GET' });
        const result = await res.json();
        result.init = true;
      
        if (result.error) {
          console.log('Error: ', result.error);
        } else {
          setGenStats(result);
        }
    };
    if (!genStats.init) {
        getStats();
    }

    useEffect(() => {
        if (endSearch) {
            return;
        }

        if (levels.length === 0 && tags.length === 0 && dateInput.length === 0) {
            if (searchInput.length === 0) {
                getJobs();
            } else {
                search();
            }
        } else {
            searchWithSettings(looseMode ? 'loose' : 'strict');
        }
    }, [searchInput, index, levels, tags, looseMode, dateInput]);

    /*const [contentLoading, setContentLoading] = useState(false);
    const getContent = async (title, link) => {
        setContentLoading(true);
        console.log(`${config.siteUrl}/api/content?${link}`)
        const res = await fetch(`${config.siteUrl}/api/content?${link}`, { method: 'GET' });
        const result = await res.json();

        if (result.error) {
            console.log('Error: ', result.error);
        } else {
            console.log(result);
            let content = result.info.content.split('\n');
            let trimmed = [title];
            trimmed = trimmed.concat(content.map((c) => c.trim()));
            if (trimmed.join() !== infoContent.join()) {
                setInfoContent(trimmed);
            }
        }
        setContentLoading(false);
    }*/
    const [infoContent, setInfoContent] = useState([]);
    const [triggerInfoContent, setTriggerInfoContent] = useState(true);
    const springContent = useSpring({
        opacity: triggerInfoContent ? 1 : 0,
        transform: `perspective(800px) rotateY(${triggerInfoContent ? 360 : 0}deg)`,
        config: { mass: 10, tension: 500, friction: 200 },
    });
    useEffect(() => {
        contentRef.current?.scrollTo(0, 0);
        setTriggerInfoContent(false);
        const timer = setTimeout(() => {
            setTriggerInfoContent(true);
        }, 100);

        return () => clearTimeout(timer);
    }, [infoContent]);

    const [triggerSettings, setTriggerSettings] = useState(true);
    const springSettings = useSpring({
        opacity: triggerSettings ? 1 : 0,
        transform: `perspective(600px) rotateX(${triggerSettings ? 360 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });
    useEffect(() => {
        setTriggerSettings(false);
        const timer = setTimeout(() => {
            setTriggerSettings(true);
        }, 100);

        return () => clearTimeout(timer);
    }, [levels, tags, looseMode]);


    const [settingsCollapse, setSettingsCollapse] = useState(false);
    
    const [quickView, setQuickView] = useState(false);
    const springContentMobile = useSpring({
        opacity: quickView ? 1 : 0,
        transform: `perspective(1000px) rotateY(${quickView ? 360 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 200 },
    });

    return (
        <div>
            <Header></Header>
            <Layout>
                <div id={styles.content} ref={content}>
                    <input
                    type="text"
                    className={`${styles.search} form-control w-1/6 px-3 py-1.5 text-base font-normal bg-clip-padding transition`}
                    placeholder="Search content.."
                    onChange={(e) => {
                        setEndSearch(false);
                        setSearchInput(e.target.value);
                        setIndex(0);
                    }}
                    />
                    {jobs.length !== 0 ? (
                        <div className={styles.header}>{jobs[jobs.length-1] === 1 ? '' : 'A total of '}<span>{jobs[jobs.length-1]}</span> {jobs[jobs.length-1] === 1 ? 'job has' : 'jobs have'} been found.</div>
                    ) : ''}
                    <div id={styles.mobileSettings} onClick={(e) => {
                        setSettingsCollapse(true);
                    }}>
                        <img alt={`mobile-settings`} src={`settings.png`} width={100} height={100} />
                    </div>
                    <div id={styles.jobs} key={index}>
                        {(jobs.length !== 0) ?
                        jobs.map((job, idx) => {
                            if (idx+1 === jobs.length) {
                                return;
                            }
                            return (
                                <div key={`jobs-${idx}`} className={styles.jobWrapper}>
                                    <a className={styles.jobEntry} href={job.link} onMouseEnter={(e) => {
                                        let content = job.info.content.split('\n');
                                        let trimmed = [job.title];
                                        trimmed = trimmed.concat(content.map((c) => c.trim()));
                                        if (trimmed.join() !== infoContent.join()) {
                                            setInfoContent(trimmed);
                                        }
                                        //setInfoContent(['']);
                                        //getContent(job.title, job.link);
                                    }}>
                                        <div className={styles.title}>{job.title}</div>
                                        <div className={styles.skillsContainer}>
                                            {job.info.skills.map((skill) => (
                                                <span key={`${idx}-${skill}`}>
                                                    <img src={`/${skillImages[skill]}`} alt={`${skill}`} />
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className={styles.levelsContainer}>
                                            {job.info.level.map((level, l_idx) => {
                                                if (l_idx+1 === job.info.level.length) {
                                                    return (
                                                        <span key={`${idx}-${level}`}>{level}</span>
                                                    );
                                                } else {
                                                    return (
                                                        <span key={`${idx}-${level}`}>{level} <span>/</span></span>
                                                    );
                                                }
                                            })}
                                        </div>
                                        <div className={styles.dateContainer}>
                                            <div>Parsed: <span>{new Date(job.info.time).toLocaleString()}</span></div>
                                        </div>
                                    </a>
                                    <button className={styles.quickView} onClick={() => {
                                        //setInfoContent(['']);
                                        //getContent(job.title, job.link);
                                        let content = job.info.content.split('\n');
                                        let trimmed = [job.title];
                                        trimmed = trimmed.concat(content.map((c) => c.trim()));
                                        if (trimmed.join() !== infoContent.join()) {
                                            setInfoContent(trimmed);
                                        }
                                        setQuickView(true);
                                    }}>quick view</button>
                                </div>
                            );
                        }) : (
                            <div id={styles.notFound}>Search result not found.</div>
                        )}
                    </div>
                    <animated.div ref={contentRef} id={styles.contentInfoMobile} className={quickView ? 'visible' : 'hidden'} style={springContentMobile}>
                        <div>
                            <div className={`${/*contentLoading ? 'visible' : */'hidden'} mx-auto w-1/2`}>
                                <Image src={'/loading.gif'} alt={``} width={200} height={200} />
                            </div>
                            <button className={styles.closeButton} onClick={(e) => { setQuickView(false); }}></button>
                            {infoContent.map((c, idx) => {
                                if (idx === 0) {
                                    return (
                                        <h1 key={`infoContent-${idx}`}>{c}</h1>
                                    );
                                }
                                return (
                                    <p key={`infoContent-${idx}`}>{c}</p>
                                );
                            })}
                        </div>
                    </animated.div>
                    {(infoContent.length > 0) && !isMobile ? (
                    <animated.div ref={contentRef} id={styles.contentInfo} style={springContent}>
                        <div className={`${/*contentLoading ? 'visible' : */'hidden'} mx-auto w-1/2`}>
                            <Image src={'/loading.gif'} alt={``} width={200} height={200} />
                        </div>
                        <div>
                        {infoContent.map((c, idx) => {
                            if (idx === 0) {
                                return (
                                    <h1 key={`infoContent-${idx}`}>{c}</h1>
                                );
                            }
                            return (
                                <p key={`infoContent-${idx}`}>{c}</p>
                            );
                        })}
                        </div>
                    </animated.div>
                    ) : ''}
                    <animated.div id={styles.searchOptions} className={`${loading ? 'hidden' : 'visible'} ${settingsCollapse ? styles.showOptions : ''} -mt-16`} style={springSettings}>
                        <div className={styles.closeButton} onClick={(e) => { setSettingsCollapse(false); }}></div>
                        <h1>settings</h1>
                        <div className={styles.rowContainer}>
                            <span className={styles.rowPreface}>skills:</span>
                            {tags.map((tag, idx) => (
                                <span key={`tags-${idx}`} className={styles.rowColumn} onClick={(e) => {
                                    content.current.scrollIntoView();
                                    setEndSearch(false);
                                    setIndex(0);
                                    setTags(tags.filter((t) => t !== tag));
                                }}>
                                    <img alt={``} src={`/${skillImages[tag]}`} />
                                </span>
                            ))}
                            
                            <button type={`button`} onClick={(e) => {
                                if (levelsModal) {
                                    setLevelsModal(false);
                                }
                                setTagsModal(true);
                            }}>
                                add
                            </button>
                        </div>
                        <div className={styles.rowContainer}>
                            <span className={styles.rowPreface}>levels:</span>
                            {levels.map((level, idx) => (
                                <span key={`levels-${idx}`} className={styles.rowColumn} onClick={(e) => {
                                    content.current.scrollIntoView();
                                    setEndSearch(false);
                                    setIndex(0);
                                    setLevels(levels.filter((l) => l !== level));
                                }}>
                                    <img alt={``} src={`/${level}.png`} />
                                </span>
                            ))}

                            <button type={`button`} onClick={(e) => {
                                if (tagsModal) {
                                    setTagsModal(false);
                                }
                                setLevelsModal(true);
                            }}>
                                add
                            </button>
                        </div>
                        <div className={styles.rowContainer}>
                            <span className={styles.rowPreface}>date:</span>
                            <input
                                id={styles.dateInput}
                                data-tip={`You can use the following format: DD/MM/YYYY-DD/MM/YYYY, with the former being "from" and the latter being "to" as date ranges.`}
                                type="text"
                                className={`${styles.search} form-control w-1/2 ml-3.5 px-3 py-1.5 text-base font-normal bg-clip-padding transition`}
                                placeholder="DD/MM/YYYY"
                                onChange={(e) => {
                                    setEndSearch(false);
                                    setIndex(0);
                                    setDateInput(e.target.value);
                                }}
                            />
                            <ReactTooltip className={styles.tooltip} effect={`solid`} place={`right`} arrowColor={`#52796F`} />
                        </div>
                        <div id={styles.checkboxContainer}>
                            <span className={looseMode ? '' : styles.primaryShadow}>strict</span>
                            <span className={styles.typeSearchCheckbox}>
                                <input type={"checkbox"} name={"typeSearchToggle"} id={styles.typeSearchToggle} checked={looseMode} onChange={() => false}/>
                                <label htmlFor={styles.typeSearchToggle} onClick={(e) => {
                                    content.current.scrollIntoView();
                                    setLooseMode(looseMode => !looseMode);
                                    setEndSearch(false);
                                    setIndex(0);
                                }}></label>
                            </span>
                            <span className={looseMode ? styles.primaryShadow : ''}>loose</span>
                        </div>
                    </animated.div>
                    {tagsModal ? tagsTrans((props, animate) => (
                        <animated.div id={styles.tagsModal} className={styles.modal} style={props}>
                            <div className={styles.closeButton} onClick={(e) => {
                                setTagsModalView(allTags);
                                setTagsModal(false);
                            }}></div>
                            <div className={styles.modalMain}>
                                <input
                                type="text"
                                className={`${styles.search} form-control w-1/3 px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid transition`}
                                placeholder="Filter tags.."
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    if (e.target.value.length === 0) {
                                        setTagsModalView(allTags);
                                    } else {
                                        setTagsModalView(allTags.filter((tag) => tag.indexOf(e.target.value.toLowerCase()) > -1));
                                    }
                                }}
                                />
                                <div className={styles.tagsContainer}>
                                    {tagsModalView.map((tag, idx) => {
                                        if (genStats.skills[tag]) {
                                            return (
                                                <div key={`tagsModalView-${idx}`} className={`${styles.tagWrapper} ${tags.includes(tag) ? styles.addedTag : ''}`} onClick={(e) => {
                                                    content.current.scrollIntoView();
                                                    setEndSearch(false);
                                                    setIndex(0);
                                                    if (!tags.includes(tag)) {
                                                        let updatedTags = [...tags];
                                                        updatedTags.push(tag);
                                                        setTags(updatedTags);
                                                    } else {
                                                        setTags(tags.filter((t) => t !== tag));
                                                    }
                                                }}>
                                                    <span className={styles.tagContainer}>
                                                        <div>{Math.ceil(genStats.skills[tag] / genStats.total * 100)}%</div>
                                                        <img alt={``} src={`/${skillImages[tag]}`} />
                                                    </span>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </animated.div>
                    )) : ''}
                    {levelsModal ? levelsTrans((props, animate) => (
                        <animated.div id={styles.levelsModal} className={styles.modal} style={props}>
                            <div className={styles.closeButton} onClick={(e) => { setLevelsModal(false); }}></div>
                            <div className={styles.modalMain}>
                                <div className={styles.tagsContainer}>
                                    {levelsModalView.map((level, idx) => {
                                        if (genStats.levels[level]) {
                                            return (
                                                <div key={`levelsModalView-${idx}`} className={`${styles.tagWrapper} ${levels.includes(level) ? styles.addedTag : ''}`} onClick={(e) => {
                                                    content.current.scrollIntoView();
                                                    setEndSearch(false);
                                                    setIndex(0);
                                                    if (!levels.includes(level)) {
                                                        let updatedLevels = [...levels];
                                                        updatedLevels.push(level);
                                                        setLevels(updatedLevels);
                                                    } else {
                                                        setLevels(levels.filter((l) => l !== level));
                                                    }
                                                }}>
                                                    <span className={styles.tagContainer}>
                                                        <div className={styles.tagHeader}>{level}</div>
                                                        <div>{Math.ceil(genStats.levels[level] / genStats.total * 100)}%</div>
                                                        <img alt={``} src={`/${level}.png`} />
                                                    </span>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </animated.div>
                    )) : ''}
                    {index > 0 ? (!endSearch ? upArrowTrans((props, animate) => (
                        <animated.div
                        id={styles.upArrow}
                        style={props}
                        onClick={(e) => {
                            e.target.parentNode.scrollIntoView({ behavior: 'smooth' });
                        }}>↑</animated.div>
                    )) : (
                        <div
                        id={styles.upArrow}
                        onClick={(e) => {
                            e.target.parentNode.scrollIntoView({ behavior: 'smooth' });
                        }}>↑</div>
                    )) : ''}
                    <div className={`${loading ? 'visible' : 'hidden'} mx-auto w-1/2`}>
                        <Image src={'/loading.gif'} alt={``} width={200} height={200} />
                    </div>
                    {endSearch && (jobs.length !== 0) ? (
                        <div className={styles.header}>{jobs[jobs.length-1] === 1 ? '' : 'A total of '}<span>{jobs[jobs.length-1]}</span> {jobs[jobs.length-1] === 1 ? 'job has' : 'jobs have'} been fetched.</div>
                    ) : ''}
                </div>
            </Layout>
        </div>
    );
}