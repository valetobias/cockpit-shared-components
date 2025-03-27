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