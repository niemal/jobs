require('dotenv').config();
const { MongoClient } = require('mongodb');
const axios = require('axios');
const fs = require('fs');
const parser = require('node-html-parser');
const exec = require('child_process').execSync;

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const userAgents = [
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.79 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
    'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
]
function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length-1)];
}
let ua = getRandomUserAgent();
while (ua === undefined) { // ????
    ua = getRandomUserAgent();
}

function device() {
    ua = getRandomUserAgent();
    while (ua === undefined) { // ????
        ua = getRandomUserAgent();
    }
    return {
        name: 'Chrome XXX',
        userAgent: ua,
        viewport: {
            width: 1920,
            height: 1080,
            deviceScaleFactor: 3,
            isMobile: false,
            hasTouch: false,
            isLandscape: false
        }
    };
}

const INFO = {
    titles: [ 
        'software', 'engineer', 'eng', 
        'developer', 'dev', 'programmer',
        'swe'
    ],
    skills: [
        'ruby', 'javascript', 'python', 'html',
        'css', 'reactjs', 'react', 'angular',
        'c++', 'graphql', 'typescript',
        'frontend', 'front-end', 'backend',
        'back-end', 'rest api', 'postgres',
        'redis', 'aws', 'amazon web services',
        'docker', 'mysql', 'mongodb', 'kubernetes',
        'nodejs', 'node.js', 'typescript', 'php',
        'java.', 'java ', 'c#', ' .net',
        ' c ', ' c.', 'vue.js', 'vue', 'vuejs',
        'golang', ' go ', 'rust', 'swift', 'perl', 'haskell',
        'bash', 'groovy', 'clojure', 'redux'
    ],
    level: {
        senior: ['senior ', 'senior.', 'senior-', 'sr.'],
        junior: ['junior ', 'junior.', 'junior-', 'jr.'],
        intern: ['intern ', 'internship', 'intern.', 'intern-'],
        apprentice: ['apprentice ', 'apprentice.']
    },
    exp: {
        keywords: [
            'requirements', 'responsibilities',
            'about the role', 'qualifications'
        ],
        degree: [
            ' bs ', 'bsc ', ' ba ', ' bs',
            'equivalent experience', 'university'
        ],
        years: ['years of experience', 'years experience']
    }
};

const headers = {
    'User-Agent': 'https://jobs.niemal.dev crawler 0.1'
};

function sleep(timeout=[10000, 20000]) {
    return new Promise(res => {
        setTimeout(res, Math.floor((Math.random() * timeout[1]) + timeout[0]));
    });
}

async function parseJobLink(title, link, dbHandle, origin, more=true, spa=null) {
    const contentTags = ['li', 'p', 'b', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'];

    if (!spa) {
        axios.get(link, { headers, }).then(resp => {
            const root = parser.parse(resp.data);
    
            const elementsText = contentTags.map((tag) => {
                return root.querySelectorAll(tag).map((element) => element.text.toLowerCase());
            }).join().split(',');
    
            let found = elementsText.filter((text) => {
                for (let keyword of INFO.exp.keywords) {
                    if (text.indexOf(keyword) > -1) {
                        //console.log(`[${new Date().toLocaleString()}]--${keyword}---\n${text}\n-----`);
                        return true;
                    }
                }
                return false;
            }).length > 0;
            
            if (!found && more) { // gotta crawl some more
                root.querySelectorAll('a').map((element) => {
                    for (hint of INFO.titles) {
                        title = element.text.toLowerCase();
                        if (title.indexOf(hint) > -1) {
                            //console.log(`[${new Date().toLocaleString()}]--${hint}---\n${element.text.toLowerCase()}\n-----`);
                            let subLink = element.rawAttrs.match(/(?<=href=").*?(?=")/gs)[0];
                            //console.log(`[${new Date().toLocaleString()}]link: ${link} || subLink: ${subLink}`);

                            // deadend
                            if (link.indexOf(subLink) > -1) {
                                return;
                            }
                            //console.log(`[${new Date().toLocaleString()}]parsing endpoint: ${link} , ${subLink}`);
                            if (subLink.startsWith('https://') || subLink.startsWith('http://')) {
                                link = subLink;
                            } else if (subLink.startsWith('/')) {
                                //console.log(`[${new Date().toLocaleString()}]${link} || ${subLink}`);
                                if (link.startsWith('https://')) {
                                    link = link.substring('https://'.length, link.length);

                                    if (link.indexOf('/') > -1) {
                                        link = 'https://' + link.substring(0, link.indexOf('/')) + subLink;
                                    } else {
                                        link = 'https://' + link + subLink;
                                    }
                                } else if (link.startsWith('http://')) {
                                    link = link.substring('http://'.length, link.length);

                                    if (link.indexOf('/') > -1) {
                                        link = 'http://' + link.substring(0, link.indexOf('/')) + subLink;
                                    } else {
                                        link = 'http://' + link + subLink;
                                    }
                                } else {
                                    console.log(`[${new Date().toLocaleString()}][what] ${link} | ${subLink}`);
                                }
                            } else if (subLink.startsWith('?')) {
                                link = link + subLink;
                            }

                            // no more crawling (:
                            //console.log(`[${new Date().toLocaleString()}]initiating endpoint: ${link}`);
                            parseJobLink(title, link, dbHandle, origin, false);
                        }
                    }
                });
            } else {
                let info = {
                    skills: [... new Set(INFO.skills.filter((skill) => {
                        for (let text of elementsText) {
                            if (text === 'go' && (skill === ' go ' || skill === 'golang')) {
                                return true;
                            }
                            if (text.indexOf(skill) > -1) {
                                return true;
                            }
                        }
                        return false;
                    }).map((skill) => {
                        if (skill === 'java ' || skill === 'java.') {
                            return 'java';
                        } else if (skill === '.net ' || skill === ' .net') {
                            return 'c#';
                        } else if (skill === 'vue.js' || skill === ' vue' || skill === 'vuejs') {
                            return 'vue';
                        } else if (skill === 'front-end') {
                            return 'frontend';
                        } else if (skill === 'back-end') {
                            return 'backend';
                        } else if (skill === 'reactjs') {
                            return 'react';
                        } else if (skill === ' c ' || skill === ' c.') {
                            return 'c';
                        } else if (skill === 'amazon web services') {
                            return 'aws';
                        } else if (skill === 'node.js') {
                            return 'nodejs';
                        } else if (skill === ' go ' || skill === 'golang') {
                            return 'go';
                        } else {
                            return skill;
                        }
                    }))],
                    exp: [... new Set(INFO.exp.degree.map((degree) => {
                        for (let text of elementsText) {
                            if (text.indexOf(degree) > -1) {
                                return text;
                            }
                        }
                    }))].concat(INFO.exp.years.map((yearsKeyword) => {
                        for (let text of elementsText) {
                            if (text.indexOf(yearsKeyword) > -1) {
                                return text;
                            }
                        }
                    })).filter((entry) => entry !== undefined),
                    level: [],
                    content: elementsText.join('\n'),
                    time: new Date().getTime()
                };
                
                for (let text of elementsText) {
                    for (let key in INFO.level) {
                        if (text.endsWith(key)) {
                            info.level.push(key);
                        } else {
                            for (let entry of INFO.level[key]) {
                                if (text.indexOf(entry) > -1) {
                                    info.level.push(key);
                                }
                            }
                        }
                    }
                }

                title = title.replaceAll('\t', '').replaceAll('\n', '').trim();
                
                let t = title.toLowerCase();
                for (let key in INFO.level) {
                    if (t.endsWith(key)) {
                        info.level.push(key);
                    } else {
                        for (let entry of INFO.level[key]) {
                            if (t.indexOf(entry) > -1) {
                                info.level.push(key);
                            }
                        }
                    }
                }

                info.level = [... new Set(info.level)];
                let inTitle = info.level.map((l) => {
                    if (t.indexOf(l) > -1) {
                        return l;
                    }
                }).filter((entry) => entry !== undefined);
                if (inTitle.length > 0) {
                    info.level = inTitle;
                } else if (info.level.length === 0) {
                    info.level.push('blank');
                }
                
                if (info.skills.length > 0) {
                    console.log(title, link, origin);
                    /*console.log({
                        link: link,
                        title: title,
                        info: info,
                        origin: origin
                    });*/

                    dbHandle.updateOne(
                        { link: link },
                        { $setOnInsert: {
                            title: title,
                            link: link,
                            info: info,
                            origin: origin
                        }},
                        { upsert: true }
                    );
                }
            }
        }).catch((error) => {
            if (error.response) {
                console.log(`[${new Date().toLocaleString()}][error-hn-crawl][${error.response.status}] from ${link}`);
            } else if (error.request) {
                console.log(`[${new Date().toLocaleString()}][error-hn-crawl][req] link: ${link}`);
            }
        });
    } else {
        const page = spa.page;

        await page.waitForSelector(spa.selector);

        /*try {
            await page.waitForSelector(spa.selector);
        } catch (err) {
            console.log(`[${new Date().toLocaleString()}][error][parseJobLink=${link}] ${err}`);
            //await setRandomProxy(page, getRandomProxy());
            await page.goto(link);
            return await parseJobLink(title, link, dbHandle, origin, false, spa);
        }*/

        const info = await page.evaluate((data) => {
            let info = {
                skills: [],
                exp: [],
                level: [],
                content: [],
                time: new Date().getTime()
            };
            let main = document.querySelector(data.selector);

            for (selector of data.tags) {
                let elements = main.querySelectorAll(selector);

                if (elements.length) {
                    Array.from(elements).map((anchor) => {
                        let content = anchor.textContent.toLowerCase();
                        info.content.push(content);

                        data.INFO.skills.map((skill) => {
                            if (content === 'go') {
                                info.skills.push('go');
                            } else if (content.indexOf(skill) > -1) {
                                if (skill === 'java ' || skill === 'java.') {
                                    info.skills.push('java');
                                } else if (skill === '.net ' || skill === ' .net') {
                                    info.skills.push('c#');
                                } else if (skill === 'front-end') {
                                    info.skills.push('frontend');
                                } else if (skill === 'back-end') {
                                    info.skills.push('backend');
                                } else if (skill === ' c ' || skill === ' c.') {
                                    info.skills.push('c');
                                } else if (skill === 'node.js') {
                                    info.skills.push('nodejs');
                                } else if (skill === 'vue.js' || skill === ' vue' || skill === 'vuejs') {
                                    info.skills.push('vue');
                                } else if (skill === 'amazon web services') {
                                    info.skills.push('aws');
                                } else if (skill === ' go ' || skill === 'golang') {
                                    info.skills.push('go');
                                } else if (skill === 'reactjs') {
                                    info.skills.push('react');
                                } else {
                                    info.skills.push(skill);
                                }
                            }
                        });

                        data.INFO.exp.degree.map((degree) => {
                            if (content.indexOf(degree) > -1) {
                                info.exp.push(anchor.textContent);
                            }
                        });

                        data.INFO.exp.years.map((y) => {
                            if (content.indexOf(y) > -1) {
                                info.exp.push(anchor.textContent);
                            }
                        });

                        for (let key in data.INFO.level) {
                            if (content.endsWith(key)) {
                                info.level.push(key);
                            } else {
                                for (let entry of data.INFO.level[key]) {
                                    if (content.indexOf(entry) > -1) {
                                        info.level.push(key);
                                    }
                                }
                            }
                        }
                    });
                }
            }

            return info;
        }, {
            title: title.toLowerCase(),
            tags: contentTags,
            INFO: INFO,
            selector: spa.selector
        });

        if (info.skills.length > 0) {
            info.content = info.content.join('\n');
            info.skills = [... new Set(info.skills)];

            let t = title.toLowerCase();
            for (let key in INFO.level) {
                if (t.endsWith(key)) {
                    info.level.push(key);
                } else {
                    for (let entry of INFO.level[key]) {
                        if (t.indexOf(entry) > -1) {
                            info.level.push(key);
                        }
                    }
                }
            }
            info.level = [... new Set(info.level)];
            if (info.level.length === 0) {
                info.level.push('blank');
            }
            info.exp = [... new Set(info.exp)];

            let inTitle = info.level.map((l) => {
                if (t.indexOf(l) > -1) {
                    return l;
                }
            }).filter((entry) => entry !== undefined);

            if (inTitle.length > 0) {
                info.level = inTitle;
            }

            await dbHandle.updateOne(
                { link: link },
                { $setOnInsert: {
                    title: title,
                    link: link,
                    info: info,
                    origin: origin
                }},
                { upsert: true }
            );
        }

        console.log(title, link, origin);
        //console.log(info);
    }
}

async function crawlHN(dbHandle) {
    const origin = 'hn';

    axios.get('https://news.ycombinator.com/jobs', {
    headers,
    }).then(async resp => {
        const root = parser.parse(resp.data);
        let content = root.querySelectorAll('tr.athing td.title a');

        for (let entry of content) {
            for (let child of entry.childNodes) {
                if (child._rawText) {
                    let link = child.parentNode.rawAttrs.match(/(?<=href=").*?(?=")/gs)[0];

                    if (!link.startsWith('http')) {
                        link = 'https://news.ycombinator.com/jobs/' + link;
                    }
                    console.log(`[${new Date().toLocaleString()}][>] Entering ${link}..`);
                    await parseJobLink(child._rawText, link, dbHandle, origin);
                }
            }
        }

        return true;
    }).catch((error) => {
        if (error.response) {
            console.log(`[${new Date().toLocaleString()}][error-hn-entry][resp][status] ${error.response.status} from ${link}`);
        } else if (error.request) {
            console.log(`[${new Date().toLocaleString()}][error-hn-entry][req] link: ${link}`);
        }
    });
}

async function crawlYC(dbHandle, browser) {
    const origin = 'yc';

    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', async req => {
        if (req.resourceType() === 'image'|| req.resourceType() == 'font' || req.resourceType() == 'stylesheet') {
            req.abort();
        } else {
            req.continue();
        }
    });
    await page.setDefaultNavigationTimeout(0);
    await page.emulate(device());

    await page.goto('https://www.ycombinator.com/jobs');
   
    const selector = 'a.font-semibold.text-linkColor';
    const jobSelector = '.ycdc-section-title';

    try {
        await page.waitForSelector(selector);
    } catch (err) {
        console.log(`[${new Date().toLocaleString()}][yc-error] ${err}`);
        await page.close();
        
        return crawlYC(dbHandle, browser);
    }
    

    const links = await page.evaluate((selector) => {
        const anchors = Array.from(document.querySelectorAll(selector));

        return anchors.map((anchor) => {
            return { title: anchor.textContent, link: anchor.href };
        });
    }, selector);

    for (entry of links) {
        await page.goto(entry.link);
        await parseJobLink(entry.title, entry.link, dbHandle, origin, false, {
            page: page,
            selector: jobSelector
        });
    }

    await page.close();
}

async function crawlTotalJobs(dbHandle, browser, init_i=1, init_y=0, pages=0) {
    console.log('-> crawltotal start');
    const origin = 'totaljobs';
    //await browser.userAgent(getRandomUserAgent());
    let page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', async req => {
        if (req.resourceType() === 'image'|| req.resourceType() == 'font' || req.resourceType() == 'stylesheet') {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.setDefaultTimeout(20000);

    if (init_i === 1) {
        try {
            await page.goto('https://www.totaljobs.com/jobs/software');
        } catch (err) {
            console.log(err);
            await page.close();
            return crawlTotalJobs(dbHandle, browser, init_i, init_y, pages);
        }
    }

    const selector = 'div.ResultsWrapper-sc-h54hyq-2';
    const jobSelector = 'div.job-description';

    if (init_i === 1) {
        try {
            await page.waitForSelector(selector);
        } catch (err) {
            return crawlTotalJobs(dbHandle, browser);
        }
    }

    const getInfo = (page) => {
        return page.evaluate(() => {
            const anchorsHref = Array.from(document.querySelectorAll('a.sc-fzqAbL'));
            const anchorsTitles = Array.from(document.querySelectorAll('h2.sc-fzqMAW'));

            let info = [];
            for (let i = 0; i < anchorsHref.length; i++) {
                info.push({
                    title: anchorsTitles[i].textContent,
                    link: anchorsHref[i].href
                });
            }

            return info;
        });
    };

    let data = {};

    if (init_i === 1) {
        data = await page.evaluate(() => {
            const anchorsHref = Array.from(document.querySelectorAll('a.sc-fzqAbL'));
            const anchorsTitles = Array.from(document.querySelectorAll('h2.sc-fzqMAW'));

            let info = [];
            for (let i = 0; i < anchorsHref.length; i++) {
                info.push({
                    title: anchorsTitles[i].textContent,
                    link: anchorsHref[i].href
                });
            }
    
            //const pages = Array.from(document.querySelectorAll('a.PageLink-sc-1v4g7my-0.gwcKwa'));
            return {
                info: info,
                pages: 9//+pages[pages.length-1].textContent
            };
        });

        for (let y = init_y; y < data.info.length; y++) {
            try {
                await page.goto(data.info[y].link);
                await parseJobLink(data.info[y].title, data.info[y].link, dbHandle, origin, false, {
                    page: page,
                    selector: jobSelector
                });
            } catch (err) {
                await sleep();
                console.log(`[${new Date().toLocaleString()}][error][totaljobs][inside-1st=${data.info[y].link}] ${err}`);
                await page.close();
                return crawlTotalJobs(dbHandle, browser, 1, y, data.pages);
            }
        }
        init_i = 2;
    } else {
        data.info = [];
        data.pages = pages;
    }

    let runners = {};
    let runnersOnHold = {};
    let newBrowser = false;
    let proxySwitch = 0;
    let proxies = JSON.parse(process.env.PROXIES);

    const getActiveRunners = () => {
        let active = 0;

        for (let id in runners) {
            if (runners[id].running) {
                active += 1;
            }
        }

        return active;
    }

    const createBrowser = async (id=null) => {
        if (id !== null) {
            if (runners[id]) {
                runners[id].running = true;
            } else {
                runners[id] = {
                    running: true
                }
            }
        }

        /*while (runners.length !== 1 && runners.indexOf(id) === -1) {
            await sleep([1000, 1500]);
            runners.splice(runners.indexOf(id), 1);
            await sleep([200, 500]);
            runners.push(id);
        }*/

        proxySwitch = (proxySwitch + 1) % proxies.length;
        let proxy = proxies[proxySwitch];

        try {
            await browser.close();
            ua = getRandomUserAgent();
            browser = await puppeteer.launch({ args: [
                '--disk-cache-size=0',
                `--set-user-agent=${ua}`,
                //'--disable-dev-shm-usage',
                //'--disable-accelerated-2d-canvas',
                //'--no-first-run',
                proxy
            ]});
            newBrowser = true;
            console.log(`[${new Date().toLocaleString()}][totaljobs][created_new_browser] for ${id !== null ? id : init_i}`);
        } catch (err) {
            console.log(`[${new Date().toLocaleString()}][totaljobs][error][creating_browser] ${err}`);
        }

        if (id !== null) {
            runners[id].running = false;
        }
    }
    const deployRunner = async (info, id) => {
        if (runners[id]) {
            runners[id].running = true;
        } else {
            runners[id] = {
                info: info,
                running: true,
                tries: 1
            };
        }

        try {
            console.log(`[${new Date().toLocaleString()}][totaljobs][runner] initiating runner ${id}`);
            const page = await browser.newPage();
            newBrowser = false;

            await page.setRequestInterception(true);
            page.on('request', req => {
                if (req.resourceType() === 'image'|| req.resourceType() == 'font' || req.resourceType() == 'stylesheet') {
                    req.abort();
                } else {
                    req.continue();
                }
            });

            await page.setDefaultTimeout(10000);
            
            if (id.startsWith('0')) {
                await page.setExtraHTTPHeaders({ referer: 'https://www.totaljobs.com/jobs/software' });
            } else {
                await page.setExtraHTTPHeaders({ referer: `https://www.totaljobs.com/jobs/software?page=${id.split('_')[0]}` });
            }
            
            console.log(`[${new Date().toLocaleString()}][totaljobs][runner] Going to: ${info.link}`);
            await page.goto(info.link);
            await parseJobLink(info.title, info.link, dbHandle, origin, false, {
                page: page,
                selector: jobSelector
            });

            await page.close();
            runners[id].running = false;
        } catch (err) {
            console.log(`[${new Date().toLocaleString()}][error][totaljobs][inside][old_proxy=${proxies[proxySwitch]}] ${err}`);
            try {
                await page.close();
            } catch (err) {
                //console.log(err);
            }

            runners[id].running = false;
            //console.log(`[${new Date().toLocaleString()}][totaljobs][id] ${id}`);
            while (getActiveRunners() !== 0) {
                await sleep([100, 200]);
            }

            if (!newBrowser) {
                await createBrowser(id);
            }
                
            if (runners[id].tries === 4) {
                if (runnersOnHold[id]) {
                    runnersOnHold[id].done = true;
                } else {
                    runnersOnHold[id] = {
                        info: info,
                        done: false
                    }
                    runners[id].tries = 1;
                }
                
                return;
            } else {
                runners[id].tries += 1;
                return deployRunner(info, id);
            }
        }
    }

    for (; init_i < data.pages; init_i++) {
        let nextPageError = true;
        data.info = [];

        while (nextPageError && data.info.length === 0) {
            try {
                if (newBrowser) {
                    page = await browser.newPage();
                    await page.setRequestInterception(true);
                    page.on('request', async req => {
                        if (req.resourceType() === 'image'|| req.resourceType() == 'font' || req.resourceType() == 'stylesheet') {
                            req.abort();
                        } else {
                            req.continue();
                        }
                    });
                    await page.setDefaultTimeout(20000);
                    newBrowser = false;
                }

                console.log(`[${new Date().toLocaleString()}]=> switching page.. ${init_i}`);
                await page.setExtraHTTPHeaders({ referer: 'https://www.totaljobs.com/jobs/software' });
                await page.goto(`https://www.totaljobs.com/jobs/software?page=${init_i}&action=paging_next`);
                await page.waitForSelector(selector);
                data.info = await getInfo(page);
                nextPageError = false;
            } catch (err) {
                nextPageError = true;
                console.log(`[${new Date().toLocaleString()}][error][totaljobs][page=${init_i}][old_proxy=${proxies[proxySwitch]}][nextPageError] ${err}`);

                await createBrowser();
            }
        }

        for (let y = init_y; y < data.info.length; y++) {
            console.log(`[${new Date().toLocaleString()}]=> deploying page.. ${init_i} -> ${y}`);
            deployRunner(data.info[y], `${init_i}_${y}`);

            while (getActiveRunners() === 8) {
                await sleep([500, 1000]);
            }
        }

        let choked = 0;
        while (getActiveRunners() !== 0) {
            console.log(`[${new Date().toLocaleString()}][*totaljobs* runners] ${getActiveRunners()}..`);
            console.log(`[${new Date().toLocaleString()}][totaljobs][runnersOnHold] ${Object.keys(runnersOnHold).length}`)

            choked += 1;
            if (choked === 15) {
                for (let id in runners) {
                    if (runners[id].running) {
                        runners[id].running = false;
                        runnersOnHold[id] = {
                            info: runners[id].info
                        };
                    }

                }
                break;
            }
            await sleep([1000, 2000]);
        }

        if (init_y > 0) {
            init_y = 0;
        }
    }

    console.log(`[${new Date().toLocaleString()}][totaljobs] => finishing up with runnersOnHold`);
    for (let id in runnersOnHold) {
        console.log(`[${new Date().toLocaleString()}][runnersOnHold][id=${id}] -->`);
        deployRunner(runnersOnHold[id].info, id);

        while (getActiveRunners() === 8) {
            console.log(`[${new Date().toLocaleString()}][runnersOnHold] Waiting.. ${getActiveRunners()}`);
            await sleep([500, 1000]);
        }
    }

    const isOnHoldDone = async () => {
        let toDo = 0;
        for (let key in runnersOnHold) {
            if (!runnersOnHold[key].done) {
                toDo += 1;
            }
        }
        return toDo === 0;
    };
    let choked = 0;
    while (!isOnHoldDone()) {
        console.log(`[${new Date().toLocaleString()}][totaljobs] Waiting for everything to finish... ${getActiveRunners()}`);
        choked += 1;

        if (choked === 15) {
            break;
        }
        await sleep([4300, 6400]);
    }

    try {
        await page.close();
        await browser.close();
    } catch (err) {
        //console.log(err);
    }

    console.log('-> crawltotal done');
    return true;
}

async function crawlRemoteio(dbHandle, browser, init_i=1, init_y=0) {
    console.log('-> crawlremoteio start');
    const origin = 'remoteio';

    let page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', async req => {
        if (req.resourceType() === 'image'|| req.resourceType() == 'font' || req.resourceType() == 'stylesheet') {
            req.abort();
        }
        else {
            req.continue();
        }
    });
    await page.setDefaultNavigationTimeout(0);
    await page.emulate(device());

    const selector = 'div.container.grid.grid-cols-12.px-4.mx-auto > div.col-span-12.space-y-4';
    const jobSelector = 'div#job-description';

    const getInfo = (page) => {
        return page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a.font-500.text-lg.text-black.whitespace-pre-wrap[data-title="true"]'));
    
            let info = [];

            for (let i = 0; i < anchors.length; i++) {
                info.push({
                    title: anchors[i].textContent,
                    link: anchors[i].href
                });
            }

            const pages = Array.from(document.querySelectorAll('a.default-transition.rounded-sm.uppercase'));

            return {
                info: info,
                nextPage: pages[pages.length-1].textContent === 'Next' ? pages[pages.length-1].href : null
            };
        });
    };

    try {
        await page.goto(`https://www.remote.io/remote-software-development-jobs?pg=${init_i}`);
        await page.waitForSelector(selector);
    } catch (err) {
        console.log(`[${new Date().toLocaleString()}][error][remoteio][initiate=${init_i}] ${err}`);

        await sleep();
        await page.close();
        return await crawlRemoteio(dbHandle, browser, init_i, y, true);
    }

    let data = await getInfo(page);

    while (data.nextPage !== null) {
        for (let y = init_y; y < data.info.length; y++) {
            try {
                await page.goto(data.info[y].link);
                await parseJobLink(data.info[y].title, data.info[y].link, dbHandle, origin, false, {
                    page: page,
                    selector: jobSelector
                });
            } catch (err) {
                console.log(`[${new Date().toLocaleString()}][error][remoteio][inside=${data.info[y].link}] ${err}`);
                await sleep();

                await page.close();
                return await crawlRemoteio(dbHandle, browser, init_i, y);
            }
        }

        init_i += 1;
        try {
            await page.goto(`https://www.remote.io/remote-software-development-jobs?pg=${init_i}`);
            await page.waitForSelector(selector);
        } catch (err) {
            console.log(`[${new Date().toLocaleString()}][error][remoteio][pg=${init_i}] ${err}`);

            await page.close();
            return await crawlRemoteio(dbHandle, browser, init_i, 0);
        }

        data = await getInfo(page);
    
        if (init_y > 0) {
            init_y = 0;
        }
    }

    for (let y = init_y; y < data.info.length; y++) {
        try {
            await page.goto(data.info[y].link);
            await parseJobLink(data.info[y].title, data.info[y].link, dbHandle, origin, false, {
                page: page,
                selector: jobSelector
            });
        } catch (err) {
            console.log(`[${new Date().toLocaleString()}][error][remoteio][last_parse=${data.info[y].link}] ${err}`);
            await sleep();
            
            await page.close();
            return await crawlRemoteio(dbHandle, browser, init_i, y);
        }
    }

    await page.close();
    console.log('-> remoteio done');
}

async function crawlIndeed(dbHandle, browser, init_i=0, init_y=0, proxySwitch=0) {
    console.log('-> crawlindeed start');
    const origin = 'indeed';

    let page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', req => {
        if (req.resourceType() === 'image'|| req.resourceType() == 'font' || req.resourceType() == 'stylesheet') {
            req.abort();
        } else {
            req.continue();
        }
    });
    await page.setDefaultNavigationTimeout(5000);
    await page.emulate(device());

    //const selector = 'a.jcs-JobTitle';
    const jobSelector = 'html';

    let proxies = JSON.parse(process.env.PROXIES);
    while (init_i <= 10) { // 630
        try {
            await page.goto(`https://www.indeed.com/jobs?q=Software&sort=date&start=${init_i}`);
            await page.waitForFunction(() => document.querySelector("#vjs-container-iframe").contentDocument.children[0].innerHTML.length > 1000);
        } catch (err) {
            console.log(`[${new Date().toLocaleString()}][indeedjobs][error][initiate=${init_i}] ${err}`);

            await page.close();
            await browser.close();

            ua = getRandomUserAgent();
            proxySwitch = (proxySwitch + 1) % 4;
            browser = await puppeteer.launch({ args: [
                '--disk-cache-size=0',
                `--set-user-agent=${ua}`,
                //'--disable-dev-shm-usage',
                //'--disable-accelerated-2d-canvas',
                //'--no-first-run',
                proxies[proxySwitch]
            ]});
            
            return crawlIndeed(dbHandle, browser, init_i, init_y, proxySwitch);
        }
    
        console.log(`[${new Date().toLocaleString()}][indeedjobs] Getting titles.. ${init_i}`);
        let titles = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a.jcs-JobTitle span')).map((e) => e.innerHTML);
        });
        //console.log(titles);
        console.log(`[${new Date().toLocaleString()}][indeedjobs] Getting elements to click.. ${init_i}`);
        let elements = await page.$$('a.jcs-JobTitle');
        let link;

        for (let y = init_y; y < titles.length; y++) {
            try {
                console.log(`[${new Date().toLocaleString()}][indeedjobs] Clicking... ${init_i} -> ${y}..`);
                await elements[y].click();

                await page.waitForFunction(() => document.querySelector('#vjs-container-iframe').contentDocument.children[0].querySelector('div.jobsearch-JobComponent-embeddedHeader a.icl-Button') !== null);

                link = await page.evaluate(() => {
                    return document.querySelector('#vjs-container-iframe').contentDocument.children[0].querySelector('div.jobsearch-JobComponent-embeddedHeader a.icl-Button').href;
                    //return document.querySelector('#vjs-container-iframe').contentDocument.children[0].innerHTML;
                });

                //console.log(titles[y], link);
                const newPage = await browser.newPage();
                await newPage.goto(link);
                await parseJobLink(titles[y], link, dbHandle, origin, false, {
                    page: newPage,
                    selector: jobSelector
                });
                await newPage.close();
            } catch (err) {
                console.log(`[${new Date().toLocaleString()}][indeedjobs][error][inside=${init_i}->${y}] ${err}`);
                console.log('creating new browser..');

                await page.close();
                await browser.close();

                ua = getRandomUserAgent();
                proxySwitch = (proxySwitch + 1) % 4;
                browser = await puppeteer.launch({ args: [
                    '--disk-cache-size=0',
                    `--set-user-agent=${ua}`,
                    //'--disable-dev-shm-usage',
                    //'--disable-accelerated-2d-canvas',
                    //'--no-first-run',
                    proxies[proxySwitch]
                ]});
                
                return crawlIndeed(dbHandle, browser, init_i, y, proxySwitch);
            }
        }

        init_i += 10;
        if (init_y > 0) {
            init_y = 0;
        }
    }

    await page.close();
    console.log('-> crawlindeed done');
}

async function buildStats(db) {
    const stats = db.collection('statistics');
    const jobs = db.collection('jobs');

    const skills = [
        'ruby', 'javascript', 'python', 'html',
        'css', 'react', 'angular', 'c++', 'graphql', 'typescript',
        'frontend', 'backend', 'rest api', 'postgres',
        'redis', 'aws', 'docker', 'mysql', 'mongodb', 'kubernetes',
        'nodejs', 'java', 'php', 'c#', 'c', 'vue', 'redux',
        'go', 'rust', 'swift', 'perl', 'haskell', 'bash', 'groovy', 'clojure'
    ];
    const levels = ['blank', 'apprentice', 'intern', 'junior', 'senior'];

    console.log(`[${new Date().toLocaleString()}]Starting general stats building on ${new Date().toString()}...`);

    const data = await jobs.find({}, { "info.skills": 1, "_id": 0 }).toArray();

    // max skills column array length
    /*let cursor = jobs.aggregate([
        { $unwind: "$info.skills" },
        { $group: {
            _id: "$_id",
            length: { $sum: 1 }
        } },
        { $sort: { length: -1 } },
        { $limit: 1 }]);

    const maxLength = +(await cursor.next())?.length ?? 0;*/

    const general = { skills: {}, levels: {}, total: data.length };

    for (let skill of skills) {
        for (entry of data) {
            if (entry.info.skills.includes(skill)) {
                if (general.skills[skill] === undefined) {
                    general.skills[skill] = 1;
                } else {
                    general.skills[skill] += 1;
                }
            }
        }
    }

    for (let level of levels) {
        general.levels[level] = 0;

        for (entry of data) {
            if (entry.info?.level?.includes(level)) {
                general.levels[level] += 1;
            }
        }
    }
 
    console.log(`[${new Date().toLocaleString()}]Finished building general stats, updating on ${new Date().toString()}...`);
    await stats.deleteMany({ type: 'general' });
    await stats.updateOne(
        { type: 'general' },
        { $setOnInsert: general },
        { upsert: true }
    );

    console.log(`[${new Date().toLocaleString()}]Starting combo stats building on ${new Date().toString()}...`);

    const isSubArray = (mainArray, secondaryArray) => secondaryArray.every(e => mainArray.includes(e));
    const comboData = {};

    for (let i = 0; i < data.length; i++) {
        if (data[i].info.skills.length === 1) {
            continue;
        }

        let combo = data[i].info.skills.join();
        comboData[combo] = 1;

        for (let j = 0; j < data.length; j++) {
            if (i === j) {
                continue;
            }

            if (isSubArray(data[j].info.skills, data[i].info.skills)) {
                comboData[combo] += 1;
            }
        }
    }

    for (let key in comboData) {
        let comboArray1 = key.split(',');

        for (let key2 in comboData) {
            if (key === key2) {
                continue;
            }
            let comboArray2 = key2.split(',');
            if (isSubArray(comboArray1, comboArray2)) {
                delete comboData[key];
            }
        }
    }

    console.log(`[${new Date().toLocaleString()}]Finished combo stats building on ${new Date().toString()}.`);
    await stats.deleteMany({ type: 'combo' });
    await stats.updateOne(
        { type: 'combo' },
        { $setOnInsert: comboData },
        { upsert: true }
    );

    /*console.log('Dumping combo_stats_tmp...');
    exec('mongodump --db jobs --collection combo_stats_tmp --out tmp_dump');

    console.log('Emptying current combo_stats collection...');
    await db.collection('combo_stats').deleteMany({});

    console.log('Importing combo_test_tmp into combo_test...');
    exec('mongorestore --db jobs --collection combo_stats "tmp_dump/jobs/combo_stats_tmp.bson"');

    console.log('Cleaning up :)..');
    exec('rm -rf tmp_dump');*/
}

async function niemalCrawler(db, browser) {
    let handle = db.collection('jobs');
    let preSweepNumber = await handle.find().count();

    crawlHN(handle);
    await crawlYC(handle, browser);
    await crawlRemoteio(handle, browser);
    await crawlTotalJobs(handle, browser);

    try {
        await browser.close();
    } catch (err) {}

    browser = await puppeteer.launch({ args: browserArgs });
    await crawlIndeed(handle, browser);

    await buildStats(db);
    try {
        await browser.close();
    } catch (err) {}

    let afterSweepNumber = await handle.find().count();
    console.log(`[${new Date().toLocaleString()}][+] Got ${afterSweepNumber - preSweepNumber} new jobs. [+]`);

    process.emit('SIGTERM');
    process.emit('SIGINT');
    /*await sleep([20 * 60 * 60000, 20 * 60 * 60000]);

    browser = await puppeteer.launch({ args: browserArgs });
    niemalCrawler(db, browser);*/
}

const uri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/`;
const client = new MongoClient(uri);
const browserArgs = [
    '--disk-cache-size=0',
    `--set-user-agent=${ua}`,
    //'--disable-dev-shm-usage',
    //'--disable-accelerated-2d-canvas',
    //'--no-first-run',
];

async function main() {
    await client.connect();

    const db = client.db('jobs');
    const handle = db.collection('jobs');
    const jobs = ['hn', 'yc', 'totaljobs', 'remoteio'];

    console.log(`[${new Date().toLocaleString()}][+] Opening with ${ua}`);

    let browser = await puppeteer.launch({ args: browserArgs });
    niemalCrawler(db, browser);

    process.on('SIGTERM', async () => {
        await client.close();
    });
    process.on('SIGINT', async () => {
        await client.close();
    });
}

main();