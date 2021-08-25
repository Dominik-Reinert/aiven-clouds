import * as React from "react";
import { DropdownComponent } from "../dropdown/dropdown_component";
import { useLanguageTranslation } from "../i18n";
import { useSelectionContext } from "./use_selection_context";

export function ProviderInput(): JSX.Element {
  const { availableProvider, selectedProvider, setSelectedProvider } =
    useSelectionContext();
  const [t] = useLanguageTranslation();

  const adaptProvidersToItems = React.useCallback(() => {
    return availableProvider.map((provider) => ({
      id: provider,
      label: provider,
      selected: selectedProvider.includes(provider),
    }));
  }, [availableProvider, selectedProvider]);

  const onSelect = React.useCallback(
    (provider) => {
      const newSelection = selectedProvider.includes(provider)
        ? selectedProvider.splice(selectedProvider.indexOf(provider), 1)
        : selectedProvider.concat(provider);
      setSelectedProvider?.(newSelection);
    },
    [selectedProvider, setSelectedProvider]
  );

  return (
    <div>
      <DropdownComponent
        label={t("providerDropdownLabel")}
        items={adaptProvidersToItems()}
        onSelect={onSelect}
      />
    </div>
  );
}
