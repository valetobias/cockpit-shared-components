import React from 'react';
import { Nav, NavItem, NavList } from '@patternfly/react-core';
import cockpit from 'cockpit'

interface NavBarProps {
  location: cockpit.Location;
  pages: string[];
}

export const HorizontalNav: React.FunctionComponent<NavBarProps> = ({ pages, location }) => {
  const [activeItem, setActiveItem] = React.useState(0);

  const onSelect = (_event: React.FormEvent<HTMLInputElement>, result: { itemId: number | string; to: string }) => {
    setActiveItem(result.itemId as number);
    location.go(result.to);
  };

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