/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { useLanguageTranslation } from "../i18n";
import { useStyleContext } from "../style_context/use_style_context";

export function HomePage(): JSX.Element {
  return (
    <React.Suspense fallback="Fetching clouds...">
      <HomePageSuspending />
    </React.Suspense>
  );
}

function HomePageSuspending(): JSX.Element {
  const [t] = useLanguageTranslation();
  const styleContext = useStyleContext();
  return (
    <div
      css={css`
        label: home-page;

        display: flex;

        margin: 80px auto;
        flex-direction: column;
        width: 70%;
        text-align: center;

        .welcome {
          font-size: ${styleContext.sizes.font.welcome};
          color: ${styleContext.shades.text};
        }

        .instruction {
          font-size: ${styleContext.sizes.font.headline};
          color: ${styleContext.shades.text};
        }
      `}
    >
      <span className="welcome">{t("welcome")}</span>
      <span className="instruction">{t("homeInstruction")}</span>
    </div>
  );
}
