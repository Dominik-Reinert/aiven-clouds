/**@jsx jsx */
import { jsx } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "../routes/routes";
import { useStyleContext } from "../style_context/use_style_context";
import { navbarStyle } from "./navbar_style";

export function Navbar(): JSX.Element {
  const styleContext = useStyleContext();
  const location = useLocation();

  function RouteLink(props: { route: Routes; label: string }): JSX.Element {
    const { route, label } = props;
    return (
      <div className={`link ${location.pathname === route ? "active" : ""}`}>
        <Link to={route}>{label}</Link>
      </div>
    );
  }

  return (
    <div css={navbarStyle(styleContext)}>
      <div className="page-name-wrapper">
        <span className="page-name">Aiven Clouds</span>
        <span className="dev-name">by Dominik Reinert</span>
      </div>
      <div className="link-wrapper">
        <RouteLink route={Routes.amazon} label="Amazon clouds" />
        <RouteLink route={Routes.google} label="Google clouds" />
      </div>
    </div>
  );
}
