import QuickViewMobile from "../QuickViewMobile";
import QuickViewDesktop from "../QuickViewDesktop";
import { useContext } from "react";
import { QuickViewContext } from "../SearchIndex";

function QuickView() {
  const { quickView, setQuickView, infoContent, triggerInfoContent } =
    useContext(QuickViewContext);

  return (
    <>
      <QuickViewMobile
        infoContent={infoContent}
        quickView={quickView}
        closeButtonHandler={(e) => {
          setQuickView(false);
        }}
      />
      <QuickViewDesktop
        infoContent={infoContent}
        quickView={quickView}
        triggerInfoContent={triggerInfoContent}
      />
    </>
  );
}

export default QuickView;
