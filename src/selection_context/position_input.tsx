/**@jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import { useLanguageTranslation } from "../i18n";
import { useStyleContext } from "../style_context/use_style_context";
import { positionInputStyle } from "./position_input_style";
import { useSelectionContext } from "./use_selection_context";

const minLon = -180;
const maxLon = 180;
const minLat = -90;
const maxLat = 90;

export function PositionInput(): JSX.Element {
  const { lon, lat, setLon, setLat } = useSelectionContext();
  const styleContext = useStyleContext();
  const [t] = useLanguageTranslation();

  // credits: https://stackoverflow.com/a/6676606/3643533
  function onlyZeros(value: string): boolean {
    return +value === 0;
  }

  function getValidationCallback(
    min: number,
    max: number,
    valueLabel: string,
    setError: (errorMessage: string | undefined) => void,
    setValue: ((newValue: number) => void) | undefined
  ): (newValue: any) => void {
    return (newValue) => {
      if (
        isNaN(newValue) &&
        /* allow inputing a minus sign at the not-first index, if only zeroes are preceeding */
        !(
          onlyZeros(newValue.slice(0, newValue.length - 1)) &&
          newValue[newValue.length - 1] === "-"
        )
      ) {
        setError(t("positionValidationNotANumber", { lonOrLat: valueLabel }));
      } else if (newValue < min || newValue > max) {
        setError(
          t("positionValidationWrongValue", { lonOrLat: valueLabel, min, max })
        );
      } else {
        setError(undefined);
        if (newValue[newValue.length - 1] === "-") {
          setValue?.("-" as any);
        } else {
          setValue?.(newValue);
        }
      }
    };
  }

  const [lonError, setLonError] = React.useState<string | undefined>(undefined);
  const onSetLon = React.useCallback(
    getValidationCallback(minLon, maxLon, "Longitude", setLonError, setLon),
    [lon, setLon, setLonError]
  );

  const [latError, setLatError] = React.useState<string | undefined>(undefined);
  const onSetLat = React.useCallback(
    getValidationCallback(minLat, maxLat, "Latitude", setLatError, setLat),
    [lat, setLat, setLatError]
  );

  return (
    <div css={positionInputStyle(styleContext)}>
      <InputWithError
        id={"longitude"}
        label={"Longitude"}
        value={lon.toString()}
        onChange={onSetLon}
        errorMessage={lonError}
      />
      <InputWithError
        id={"latitude"}
        label={"Latitude"}
        value={lat.toString()}
        onChange={onSetLat}
        errorMessage={latError}
      />
    </div>
  );
}

interface InputWithErrorProps {
  id: string;
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  errorMessage?: string;
}

function InputWithError(props: InputWithErrorProps): JSX.Element {
  return (
    <div className="input-with-error">
      <div className="input-wrapper">
        <label htmlFor={props.id}>{props.label}</label>
        <input
          id={props.id}
          value={props.value}
          onChange={(evt) => props.onChange(evt.target.value)}
        />
      </div>
      <div className="error-message">{props.errorMessage}</div>
    </div>
  );
}
