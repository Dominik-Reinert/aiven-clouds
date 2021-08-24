/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { Cloud } from "../store/cloud_store";

interface CloudProps extends Cloud {}

export function CloudComponent(props: CloudProps): JSX.Element {
  const { cloudName, cloudDescription, geoRegion, geoLatitude, geoLongitude } =
    props;
  return (
    <div
      css={css`
        label: cloud-component;
      `}
    >
      <div className="name">{cloudName}</div>
      <div className="description">{cloudDescription}</div>
      <div className="location-wrapper">
        <div className="region">{geoRegion}</div>
        <div className="distance-wrapper">
          <div className="distance">distance</div>
          <div className="coordinates">
            {geoLongitude} ||| {geoLatitude}
          </div>
        </div>
      </div>
    </div>
  );
}
