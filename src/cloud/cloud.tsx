/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { Cloud } from "../store/cloud_store";
import { useStyleContext } from "../style_context/use_style_context";

interface CloudProps extends Cloud {}

export function CloudComponent(props: CloudProps): JSX.Element {
  const { cloudName, cloudDescription, geoRegion, geoLatitude, geoLongitude } =
    props;
  const styleContext = useStyleContext();
  return (
    <div
      css={css`
        label: cloud-component;

        width: 70%;

        background-color: ${styleContext.colors.cardBackground};

        margin: auto auto 20px auto;
        padding: 16px;

        box-shadow: 1px 3px 3px 1px ${styleContext.shades.boxShadow};
        border-radius: 20px;

        display: flex;
        align-items: center;

        .description {
          font-size: ${styleContext.sizes.font.subHeadline};
          color: ${styleContext.colors.aivenDark};
        }

        .name {
          margin-left: 4px;
          font-size: ${styleContext.sizes.font.text};
          color: ${styleContext.colors.aivenDark};
        }

        > * {
          flex: 1 0 0;
        }
      `}
    >
      <div className="description">{cloudDescription}</div>
      <div className="name">({cloudName})</div>
      <div className="region">{geoRegion}</div>
      <div className="distance">distance</div>
      <div className="coordinates">
        {geoLongitude} ||| {geoLatitude}
      </div>
    </div>
  );
}
