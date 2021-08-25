/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";

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
  const onItemClick = React.useCallback(
    (id) => props.onSelect(id),
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
          cursor: pointer;
        }

        .item {
          cursor: pointer;
        }
      `}
    >
      <div className="header" onClick={onToggleOpen}>
        {props.label}
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
