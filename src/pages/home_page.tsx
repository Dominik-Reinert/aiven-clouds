/**@jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { CloudComponent } from "../cloud/cloud";
import { useLanguageTranslation } from "../i18n";
import { useStyleContext } from "../style_context/use_style_context";
import { createCloudPage } from "./create_cloud_page";
import { homePageStyle } from "./home_page_style";

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
    return (
      <div>
        {props.clouds?.map((cloud) => {
          return (
            <CloudComponent
              key={cloud.cloudName + cloud.cloudDescription}
              {...cloud}
            />
          );
        })}
      </div>
    );
  },
  { name: "HomePageSuspending" }
);
