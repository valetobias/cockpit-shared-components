import React, { useEffect } from 'react';
import { Nav, NavItem, NavList } from '@patternfly/react-core';
import cockpit from 'cockpit'

interface NavBarProps {
  pages: string[];
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

export const HorizontalNav: React.FunctionComponent<NavBarProps> = ({ pages, setCurrentPage }) => {
  const [activeItem, setActiveItem] = React.useState(0);

  const onSelect = (_event: React.FormEvent<HTMLInputElement>, result: { itemId: number | string; to: string }) => {
    setActiveItem(result.itemId as number);
    cockpit.location.go(result.to);
  };

  useEffect(() => {
      function handleLocationChange() {
        setCurrentPage(cockpit.location.path[0]);
      }
      cockpit.addEventListener("locationchanged", handleLocationChange);

      return () => cockpit.removeEventListener("locationchanged", handleLocationChange);
  })

  return (
    <Nav onSelect={onSelect} variant="horizontal" aria-label="Horizontal nav local">
      <NavList>
        {pages.map((value, index) => {
          return (
            <NavItem
              preventDefault
              key={index}
              itemId={index}
              isActive={activeItem === index}
              id={`horizontal-nav-${index}`}
              to={value}
            >
              {value}
            </NavItem>
          );
        })}
      </NavList>
    </Nav>
  );
};