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

import React from 'react';
import { EmptyState, EmptyStateVariant, Bullseye } from '@patternfly/react-core'
import { Tr,Td } from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';

interface MissingDataProps {
  colSpan: number;
}

export const MissingData: React.FunctionComponent<MissingDataProps> = ({ colSpan }) => {
  return (
    <Tr>
      <Td colSpan={colSpan}>
        <Bullseye>
          <EmptyState  headingLevel="h2" icon={SearchIcon}  titleText="No results found" variant={EmptyStateVariant.sm}>
            </EmptyState>
        </Bullseye>
      </Td>
    </Tr>
  )
}