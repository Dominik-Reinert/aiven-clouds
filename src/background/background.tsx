/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { useStyleContext } from "../style_context/use_style_context";

export function Background(props: React.PropsWithChildren<{}>): JSX.Element {
  const styleContext = useStyleContext();
  const style = css`
    label: background;
    background-image: linear-gradient(${styleContext.colors.aivenDark},
      ${styleContext.colors.aivenBright});
    height: 100%;
  `;
  return <div css={style}>{props.children}</div>;
}
