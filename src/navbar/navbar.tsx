/**@jsx jsx */
import { jsx } from "@emotion/react";
import { PositionInput } from "../selection_context/position_input";
import { ProviderInput } from "../selection_context/provider_input";
import { RegionInput } from "../selection_context/region_input";
import { useStyleContext } from "../style_context/use_style_context";
import { navbarStyle } from "./navbar_style";

export function Navbar(): JSX.Element {
  const styleContext = useStyleContext();

  return (
    <div css={navbarStyle(styleContext)}>
      <div className="page-name-wrapper">
        <img className="aiven-logo" src="./aiven-home.svg" alt="aiven" />
        <span className="page-name">clouds</span>
      </div>
      <div className="position-input-wrapper">
        <RegionInput />
        <ProviderInput />
        <PositionInput />
      </div>
    </div>
  );
}
