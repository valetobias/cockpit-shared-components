/*
 * This file is part of Cockpit-shared-components.
 *
 * Copyright (C) 2025 Tobias Vale
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

import React, { ReactNode, useState } from "react";
import { Table, Thead, Tr, Th, Tbody, ThProps } from '@patternfly/react-table';
import { SearchInput, Toolbar, ToolbarItem, ToolbarContent } from '@patternfly/react-core'
import { LoadingData } from "./LoadingData";
import { MissingData } from "./MissingData";
import './styles.scss';

export interface HeaderValue {
  text?: string;
  screenReaderText?: string;
  sortable?: boolean;
  filtrable?: boolean;
  width?: 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 60 | 70 | 80 | 90 | 100;
  modifier?: "wrap" | "breakWord" | "fitContent" | "nowrap" | "truncate";
  textCenter?: boolean;
}

interface RowProps {
  row: ReactNode;
  values: (string | number)[];
}

interface TableProps {
  headerValues: HeaderValue[];
  rows: RowProps[];
  ready?: boolean;
  additonalToolbarItems?: ReactNode[];
  secondaryToolbar?: ReactNode;
}

export const StandardTable: React.FunctionComponent<TableProps> = ({ headerValues, rows, ready=true, additonalToolbarItems, secondaryToolbar }) => {
  const [ searchValue, setSearchValue ] = useState('');
  const filteredRows = rows.filter(onFilter);
  const [activeSortIndex, setActiveSortIndex] = useState(0);
  const [activeSortDirection, setActiveSortDirection] = useState<'asc'|'desc'>('asc');

  const anyFiltrable = headerValues.findIndex(value => value.filtrable) !== -1;

  function onFilter(row: RowProps) {
    if (searchValue === '') {
      return true;
    }

    let input: RegExp;
    try {
      input = new RegExp(searchValue, 'i');
    } catch (err) {
      input = new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }
    for (const value of row.values) {
      if (typeof value === "number") {
        continue
      }
      if (value.search(input) >= 0) {
        return true
      }
    }
    return false;
  };

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection,
      defaultDirection: 'asc'
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex
  });

  function joinFilters(filters: string[]): string {
    if (filters.length === 0) return "";
    if (filters.length === 1) return filters[0];
    return `${filters.slice(0, -1).join(', ')} or ${filters[filters.length - 1]}`
  }

  
  let sortedRows = filteredRows.sort((a, b) => {
    const aValue = a.values[activeSortIndex];
    const bValue = b.values[activeSortIndex];
    if (typeof aValue === 'string' || typeof bValue === 'string') {
      if (activeSortDirection === 'asc') {
        return (aValue as string).localeCompare(bValue as string);
      }
      return (bValue as string).localeCompare(aValue as string);
    }
    if (activeSortDirection === 'asc') {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  return (
    <>
      {(anyFiltrable || additonalToolbarItems) &&
        <Toolbar isStatic>
          <ToolbarContent>
            {anyFiltrable &&
              <ToolbarItem className="expand">
                <SearchInput
                  placeholder={`Filter by ${joinFilters(headerValues.filter(value => value.filtrable).map(value => value.text!))}`}
                  value={searchValue}
                  onChange={(_event, value) => setSearchValue(value)}
                  onClear={() => setSearchValue('')}
                />
              </ToolbarItem>
            }
            {additonalToolbarItems && additonalToolbarItems.map(item =>
              <ToolbarItem>
                {item}
              </ToolbarItem>
            )}
          </ToolbarContent>
        </Toolbar>
      }
      {secondaryToolbar}
      <Table
      aria-label="Table"
      variant='compact'
      >
        <Thead>
          <Tr>
            {headerValues.map((headerValue, index) =>
              <Th // This is an incorrect error, as sort can indeed be undefined. I might just be using a too new version of TS
                screenReaderText={headerValue.screenReaderText}
                className={`pf-vt-c-table pf-m-width-${headerValue.width}`}
                modifier={headerValue.modifier}
                sort={headerValue.sortable ? getSortParams(index) : undefined}
                textCenter={headerValue.textCenter}
              >
                {headerValue.text}
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {!ready ? <LoadingData colSpan={6} /> : filteredRows.length === 0 ? <MissingData colSpan={6} /> : sortedRows.map(element => element.row)}
        </Tbody>
      </Table>
    </>
  )
}