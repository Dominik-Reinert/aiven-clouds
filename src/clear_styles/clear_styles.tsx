/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";

export function ClearStyles(props: React.PropsWithChildren<{}>): JSX.Element {
  const style = css`
    label: clear-styles;
    
    height: 100%;

    ${/* remove all styles of the hyperlink <a> tag */ ""}
    a {
      color: inherit;
      text-decoration: none; /* no underline */
    }
  `;
  return <div css={style}>{props.children}</div>;
}
