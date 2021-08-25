import * as React from "react";
import { DropdownComponent } from "../dropdown/dropdown_component";
import { useLanguageTranslation } from "../i18n";
import { useSelectionContext } from "./use_selection_context";

export function RegionInput(): JSX.Element {
  const { availableLocations, selectedLocations, setSelectedLocation } =
    useSelectionContext();
  const [t] = useLanguageTranslation();

  const adaptLocationsToItems = React.useCallback(() => {
    return availableLocations.map((location) => ({
      id: location,
      label: location,
      selected: selectedLocations.includes(location),
    }));
  }, [availableLocations, selectedLocations]);

  const onSelect = React.useCallback(
    (location) => {
      const newSelection = selectedLocations.includes(location)
        ? selectedLocations.splice(selectedLocations.indexOf(location), 1)
        : selectedLocations.concat(location);
      setSelectedLocation?.(newSelection);
    },
    [ selectedLocations, setSelectedLocation]
  );

  return (
    <div>
      <DropdownComponent
        label={t("regionDropdownLabel")}
        items={adaptLocationsToItems()}
        onSelect={onSelect}
      />
    </div>
  );
}
