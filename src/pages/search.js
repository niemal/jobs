import Layout from "../components/Layout";
import { useState, useEffect, createContext } from "react";
import { config } from "../../lib/config";
import SearchIndex from "../components/SearchIndex";

export async function getStaticProps() {
  return {
    props: {
      config: config,
    },
  };
}

export const MainContext = createContext();

export default function Search({ config }) {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [index, setIndex] = useState(0);
  const [cooldown, setCooldown] = useState(false);
  const [endSearch, setEndSearch] = useState(false);

  const getJobs = async () => {
    setLoading(true);
    const res = await fetch(`${config.siteUrl}/api/jobs/${index}`, {
      method: "GET",
    });
    const result = await res.json();

    if (result.error) {
      console.log("Error: ", result.error);
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
  };

  const search = async () => {
    setLoading(true);
    console.log(`${config.siteUrl}/api/search/${searchInput}=${index}`);
    const res = await fetch(
      `${config.siteUrl}/api/search/${searchInput}=${index}`,
      { method: "GET" }
    );
    const result = await res.json();

    if (result.error) {
      console.log("Error: ", result.error);
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
  };

  const searchWithSettings = async (settingType) => {
    setLoading(true);
    let queryTags;
    if (tags.length > 0) {
      queryTags = tags.join(",");
      queryTags = queryTags.replace("#", "sharp");
    } else {
      queryTags = "any";
    }

    let queryLevels;
    if (levels.length > 0) {
      queryLevels = levels.join(",");
    } else {
      queryLevels = "any";
    }

    let queryDate;
    if (dateInput.length > 0) {
      queryDate = dateInput;
    } else {
      queryDate = "any";
    }

    //console.log(queryDate);

    console.log(
      `${
        config.siteUrl
      }/api/search/${settingType}?tags=${queryTags}&levels=${queryLevels}&date=${queryDate.replaceAll(
        "/",
        "_"
      )}&search=${searchInput}&index=${index}`
    );
    const res = await fetch(
      `${
        config.siteUrl
      }/api/search/${settingType}?tags=${queryTags}&levels=${queryLevels}&date=${queryDate.replaceAll(
        "/",
        "_"
      )}&search=${searchInput}&index=${index}`,
      { method: "GET" }
    );
    const result = await res.json();

    if (result.error) {
      console.log("Error: ", result.error);
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
  };

  const [tags, setTags] = useState([]);
  const [levels, setLevels] = useState([]);
  const [dateInput, setDateInput] = useState("");
  const [looseMode, setLooseMode] = useState(true);

  const [genStats, setGenStats] = useState({});
  const getStats = async () => {
    const res = await fetch(`${config.siteUrl}/api/stats`, { method: "GET" });
    const result = await res.json();
    result.init = true;

    if (result.error) {
      console.log("Error: ", result.error);
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
      searchWithSettings(looseMode ? "loose" : "strict");
    }
  }, [
    // useEffect on change
    searchInput,
    index,
    levels,
    tags,
    looseMode,
    dateInput,
    // dependencies to make the warning go away
    getJobs,
    endSearch,
    search,
    searchWithSettings,
  ]);

  const [infoContent, setInfoContent] = useState([]);
  const [triggerInfoContent, setTriggerInfoContent] = useState(true);
  const [triggerSettings, setTriggerSettings] = useState(true);

  useEffect(() => {
    setTriggerSettings(false);
    const timer = setTimeout(() => {
      setTriggerSettings(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [levels, tags, looseMode]);

  return (
    <Layout>
      <MainContext.Provider
        value={{
          loading,
          endSearch,
          setEndSearch,
          jobs,
          infoContent,
          setInfoContent,
          triggerInfoContent,
          setTriggerInfoContent,
          tags,
          setTags,
          levels,
          setLevels,
          dateInput,
          setDateInput,
          searchInput,
          setSearchInput,
          looseMode,
          setLooseMode,
          index,
          setIndex,
          triggerSettings,
          genStats,
        }}
      >
        <SearchIndex />
      </MainContext.Provider>
    </Layout>
  );
}
