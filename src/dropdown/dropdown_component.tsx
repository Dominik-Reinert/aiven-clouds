/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { useStyleContext } from "../style_context/use_style_context";

interface DropdownItem {
  id: string;
  label: string;
  selected: boolean;
  onClick: (id: string) => void;
}
interface DropdownComponentProps {
  label: string;
  items: Omit<DropdownItem, "onClick">[];
  onSelect: (id: string) => void;
}

export function DropdownComponent(props: DropdownComponentProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const onToggleOpen = React.useCallback(() => setOpen(!open), [open, setOpen]);
  const onItemClick = React.useCallback((id) => props.onSelect(id), [props]);
  const styleContext = useStyleContext();
  const numberOfSelectedItems: number = React.useMemo(
    () => props.items.filter((item) => item.selected).length,
    [props]
  );

  function renderItem(item: DropdownItem): JSX.Element {
    const { id, label, selected, onClick } = item;
    return (
      <span
        key={`${item.id}-${item.label}`}
        className={`item ${selected ? "selected" : ""}`}
        onClick={() => onClick(id)}
      >
        {label}
      </span>
    );
  }

  return (
    <div
      css={css`
        label: dropdown-component;

        .header {
          color: ${styleContext.shades.text};
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;

          .label {
            margin: 8px 8px 8px ${numberOfSelectedItems > 0 ? "2px" : "4px"};
          }
        }

        .items {
          position: absolute;
          display: flex;
          flex-direction: column;
          background-color: white;
          box-shadow: 5px 5px 11px -2px ${styleContext.shades.boxShadow};
          border-radius: 4px;
          border-top-left-radius: 0;
        }

        .item {
          cursor: pointer;
          padding: 4px 12px;

          &.selected {
            color: ${styleContext.shades.text};
            background-color: ${styleContext.colors.aivenBright};
          }

          &:hover {
            color: ${styleContext.shades.text};
            background-color: ${styleContext.colors.aivenDark};
          }
        }
      `}
    >
      <div className="header" onClick={onToggleOpen}>
        {numberOfSelectedItems > 0 && (
          <div className="number-selected">{numberOfSelectedItems}</div>
        )}
        <div className="label">{props.label}</div>
      </div>
      {open && (
        <div className="items">
          {props.items.map((item) => {
            return renderItem({ ...item, onClick: onItemClick });
          })}
        </div>
      )}
    </div>
  );
}
