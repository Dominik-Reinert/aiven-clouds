/**@jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { CloudComponent } from "../cloud/cloud";
import { useLanguageTranslation } from "../i18n";
import { useStyleContext } from "../style_context/use_style_context";
import { createCloudPage } from "./create_cloud_page";
import { homePageStyle, homePageSuspendingStyle } from "./home_page_style";

export function HomePage(): JSX.Element {
  return (
    <React.Suspense fallback={<HomePageFallback />}>
      <HomePageSuspending />
    </React.Suspense>
  );
}

function HomePageFallback(): JSX.Element {
  const [t] = useLanguageTranslation();
  const styleContext = useStyleContext();
  return (
    <div css={homePageStyle(styleContext)}>
      <span className="welcome">{t("welcome")}</span>
      <span className="instruction">{t("homeInstruction")}</span>
    </div>
  );
}

const HomePageSuspending = createCloudPage<{}>(
  (props) => {
    const styleContext = useStyleContext();
    const [t] = useLanguageTranslation();
    return (
      <div css={homePageSuspendingStyle(styleContext)}>
        <div className="header">
          <div className="name">{t("tableHeaderName")}</div>
          <div className="id">{t("tableHeaderId")}</div>
          <div className="region">{t("tableHeaderRegion")}</div>
          <div className="distance">{t("tableHeaderDistanceInKm")}</div>
          <div className="lonlat">{t("tableHeaderLonLat")}</div>
        </div>
        <div className="scrollable-content">
          {props.clouds?.map((cloud) => {
            return (
              <CloudComponent
                key={cloud.cloudName + cloud.cloudDescription}
                {...cloud}
              />
            );
          })}
        </div>
      </div>
    );
  },
  { name: "HomePageSuspending" }
);
