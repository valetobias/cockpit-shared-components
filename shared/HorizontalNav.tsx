/*
 * This file is part of Cockpit-shared-components.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit-shared-components is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit-shared-components is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

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