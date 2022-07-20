import SearchSettings from "../SearchSettings";
import SearchModalTags from "../SearchModalTags";
import SearchModalLevels from "../SearchModalLevels";
import { useState, useContext, useEffect } from "react";
import { MainContext } from "../../pages/search";
import { SKILLS } from "../constants";

function SettingsAndModals({ mobileCloseButtonHandler, mainRef }) {
  const {
    genStats,
    triggerSettings,
    loading,
    setIndex,
    setTags,
    tags,
    levels,
    setLevels,
    setEndSearch,
    looseMode,
    setLooseMode,
    setDateInput,
  } = useContext(MainContext);

  const [levelsModal, setLevelsModal] = useState(false);
  const [levelsModalView, setLevelsModalView] = useState([]);
  const allLevels = ["blank", "intern", "apprentice", "junior", "senior"];
  // if (levelsModalView.length === 0) {
  //   setLevelsModalView(allLevels);
  // }

  const [tagsModal, setTagsModal] = useState(false);
  const [tagsModalView, setTagsModalView] = useState([]);
  const allTags = Object.keys(SKILLS);
  // if (tagsModalView.length === 0) {
  //   setTagsModalView(allTags);
  // }

  useEffect(() => {
    setLevelsModalView(allLevels);
    setTagsModalView(allTags);
  }, []);

  useEffect(() => {
    if (tagsModal || levelsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [tagsModal, levelsModal]);
  return (
    <>
      <SearchSettings
        loading={loading}
        triggerSettings={triggerSettings}
        tags={tags}
        levels={levels}
        mobileCloseButtonHandler={mobileCloseButtonHandler}
        tagsClickHandler={(tag) => (e) => {
          mainRef.current.scrollIntoView();
          setEndSearch(false);
          setIndex(0);
          setTags(tags.filter((t) => t !== tag));
        }}
        tagsButtonHandler={(e) => {
          if (levelsModal) {
            setLevelsModal(false);
          }
          setTagsModal(true);
        }}
        levelsClickHandler={(level) => (e) => {
          mainRef.current.scrollIntoView();
          setEndSearch(false);
          setIndex(0);
          setLevels(levels.filter((l) => l !== level));
        }}
        levelsButtonHandler={(e) => {
          if (tagsModal) {
            setTagsModal(false);
          }
          setLevelsModal(true);
        }}
        dateInputHandler={(e) => {
          setEndSearch(false);
          setIndex(0);
          setDateInput(e.target.value);
        }}
        looseMode={looseMode}
        checkboxHandler={(e) => {
          mainRef.current.scrollIntoView();
          setLooseMode((looseMode) => !looseMode);
          setEndSearch(false);
          setIndex(0);
        }}
      />

      <SearchModalTags
        tagsModal={tagsModal}
        closeButtonHandler={(e) => {
          setTagsModalView(allTags);
          setTagsModal(false);
        }}
        inputHandler={(e) => {
          console.log(e.target.value);
          if (e.target.value.length === 0) {
            setTagsModalView(allTags);
          } else {
            setTagsModalView(
              allTags.filter(
                (tag) => tag.indexOf(e.target.value.toLowerCase()) > -1
              )
            );
          }
        }}
        view={tagsModalView}
        genStats={genStats}
        tags={tags}
        modalTagClickHandler={(tag) => (e) => {
          mainRef.current.scrollIntoView();
          setEndSearch(false);
          setIndex(0);
          if (!tags.includes(tag)) {
            let updatedTags = [...tags];
            updatedTags.push(tag);
            setTags(updatedTags);
          } else {
            setTags(tags.filter((t) => t !== tag));
          }
        }}
      />

      <SearchModalLevels
        levelsModal={levelsModal}
        closeButtonHandler={(e) => {
          setLevelsModal(false);
        }}
        view={levelsModalView}
        genStats={genStats}
        levels={levels}
        modalLevelClickHandler={(level) => (e) => {
          mainRef.current.scrollIntoView();
          setEndSearch(false);
          setIndex(0);
          if (!levels.includes(level)) {
            let updatedLevels = [...levels];
            updatedLevels.push(level);
            setLevels(updatedLevels);
          } else {
            setLevels(levels.filter((l) => l !== level));
          }
        }}
      />
    </>
  );
}

export default SettingsAndModals;
