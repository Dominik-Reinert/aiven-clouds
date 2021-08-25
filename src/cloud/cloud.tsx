/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { Cloud } from "../store/cloud_store";
import { useStyleContext } from "../style_context/use_style_context";

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
    <div
      css={css`
        label: cloud-component;

        width: 70%;

        background-color: ${styleContext.colors.cardBackground};
        border-bottom: 1px solid ${styleContext.colors.aivenBright};

        margin: auto auto 0;
        padding: 16px;

        display: flex;
        align-items: center;

        .description {
          font-size: ${styleContext.sizes.font.text};
          color: ${styleContext.colors.aivenDark};
        }

        .name {
          margin-left: 4px;
          color: ${styleContext.colors.aivenDark};
        }

        .name,
        .region,
        .distance,
        .coordinates {
          font-size: ${styleContext.sizes.font.smallText};
        }

        > * {
          flex: 1 0 0;
        }
      `}
    >
      <div className="description">{cloudDescription}</div>
      <div className="name">({cloudName})</div>
      <div className="region">{geoRegion}</div>
      <div className="distance">{distanceInKm}</div>
      <div className="coordinates">
        {geoLongitude} ||| {geoLatitude}
      </div>
    </div>
  );
}
