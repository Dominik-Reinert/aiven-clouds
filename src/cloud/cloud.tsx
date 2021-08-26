/**@jsx jsx */
import { jsx } from "@emotion/react";
import { Cloud } from "../store/cloud_store";
import { useStyleContext } from "../style_context/use_style_context";
import { cloudStyle } from "./cloud_style";

interface CloudProps extends Cloud {}

export function CloudComponent(props: CloudProps): JSX.Element {
  const {
    cloudName,
    cloudDescription,
    geoRegion,
    geoLatitude,
    geoLongitude,
    distanceInKm,
  } = props;
  const styleContext = useStyleContext();
  return (
    <div css={cloudStyle(styleContext)}>
      <div className="description">{cloudDescription}</div>
      <div className="name">({cloudName})</div>
      <div className="region">{geoRegion}</div>
      <div className="distance">{distanceInKm?.toFixed(2).concat(" km")}</div>
      <div className="coordinates">
        {prettifyCoordinates(geoLongitude, geoLatitude)}
      </div>
    </div>
  );
}

function prettifyCoordinates(lon: number, lat: number): string {
  return "( "
    .concat(lon.toString().padStart(10, " "))
    .concat(" | ")
    .concat(lat.toString().padEnd(10, " "))
    .concat(" )");
}
