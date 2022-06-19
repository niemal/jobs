import styles from '../styles/Layout.module.css';
import { useTransition, animated } from 'react-spring';
import { useState, useEffect } from 'react';
import { NavLink } from './animations';
import uuid from 'uuidjs';

export default function Layout({ children }) {
    const [svgHeaderX, setSvgHeaderX] = useState(0);
    const [svgHeaderY, setSvgHeaderY] = useState(0);
    const [svgFooterX, setSvgFooterX] = useState(0);
    const [svgFooterY, setSvgFooterY] = useState(0);
    const [svgHeight, setSvgHeight] = useState(0);
    const [svgWidth, setSvgWidth] = useState(0);

    useEffect(() => {
        while (window.innerHeight === 0) {}
        while (window.innerWidth === 0) {}

        const processSize = () => {
            setSvgHeight(window.innerHeight * 0.45);

            console.log(window.innerHeight);
            if (window.innerWidth > 1200) {
                setSvgWidth(window.innerWidth-500);

                if (window.innerHeight < 900) {
                    setSvgFooterY(-20);
                } else {
                    setSvgFooterY(-150);
                }
            } else {
                setSvgWidth(window.innerWidth);
                setSvgHeaderX(0);
                setSvgHeaderY(0);
                setSvgFooterX(300);
                setSvgFooterY(0);

                if (window.innerHeight < 741) {
                    setSvgFooterY(window.innerHeight * -0.05);
                } else {
                    setSvgFooterY(window.innerHeight * -(window.innerHeight * 0.00017));
                }
            }
        };

        processSize();
        window.addEventListener('resize', processSize);
    }, []);

    const animationProp = {
        from: {opacity: 0.7, transform: 'scaleY(-1)', },
        enter: { opacity: 1, transform: 'scaleY(1)', },
        trail: 500
    };

    const navEntries = {
        'home': {
            spring: <NavLink key={uuid.generate()} link={'/jobs'} name={'home'}></NavLink>,
            link: '/jobs'
        },
        'search': {
            spring: <NavLink key={uuid.generate()} link={'/jobs/search'} name={'search'}></NavLink>,
            link: '/jobs/search'
        },
        'blog': {
            spring: <NavLink key={uuid.generate()} link={'/blog'} name={'blog'}></NavLink>,
            link: '/blog'
        }
    }

    const [burgerToggle, setBurgerToggle] = useState(false);
    const burgerTransition = useTransition(burgerToggle, { 
        ...animationProp,
        from: {opacity: 0.7, transform: 'scaleY(0)', },
        trail: 0
    });

    return (
        <div id={styles.layout}>
            <header id={styles.header} className={`${burgerToggle ? styles.burgerSticky : ''}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`${svgHeaderX} ${svgHeaderY} ${svgWidth} ${svgHeight}`} preserveAspectRatio={"none"}>
                        <path fillOpacity="1" d="M0,288L80,250.7C160,213,320,139,480,128C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                    </svg>
                </div>
                <div id={styles.headerNote} className={`${burgerToggle ? 'hidden' : 'visible'}`}>
                    <span id={styles.logo}>&lt;/&gt;</span><span>Explore statistics and search for software jobs.</span>
                </div>
                <nav id={styles.navLinks}>
                    {Object.keys(navEntries).map((k) => navEntries[k].spring)}
                </nav>
                <div id={styles.burgerMenu}>
                    <input id={`toggle-burger`} className={`${styles.menuTrigger} hidden`} type={`checkbox`} onClick={() => { setBurgerToggle(prev => !prev); }} />
                    <label className={styles.burgerWrapper} htmlFor={`toggle-burger`}><div className={styles.hamburger}></div></label>
                </div>
            </header>

            {burgerToggle ? burgerTransition((props, animate) => (
                <animated.div id={styles.burgerCard} style={props}>
                    <div id={styles.burgerContainer}>
                        {Object.keys(navEntries).map((k) => (
                            <a key={`${k}-burger`} className={styles.burgerEntry} href={navEntries[k].link}><img alt={k} src={`${k}.png`} />{k}</a>
                        ))}
                    </div>
                    <div id={styles.burgerFooter}>Search for a software job or just take a peek on what&apos;s going on. Alternatively, you can also check out my blog. :)</div>
                </animated.div>
            )) : ''}

            <main id={styles.main}>{children}</main>

            <footer id={styles.footer}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={`${svgFooterX} ${svgFooterY} ${svgWidth} ${svgHeight}`} preserveAspectRatio={"none"}>
                    <path fillOpacity="1" d="M0,288L80,250.7C160,213,320,139,480,128C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
                <div id={styles.footerNote}>
                    <span>Web-design and maintenance by </span><a href="https://niemal.dev/">niemal</a>
                </div>
                <div id={styles.footerLinks}>
                    {Object.keys(navEntries).map((k) => (
                        <a key={`${k}-footer`} className={`inline-block mt-4 lg:mt-0 mr-4`} href={navEntries[k].link}>{k}</a>
                    ))}
                </div>
            </footer>
        </div>
    );
}