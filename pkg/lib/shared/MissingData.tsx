import React from 'react';
import { EmptyState, EmptyStateVariant, EmptyStateIcon, EmptyStateHeader, Bullseye } from '@patternfly/react-core'
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
          <EmptyState variant={EmptyStateVariant.sm}>
            <EmptyStateHeader
              icon={<EmptyStateIcon icon={SearchIcon} />}
              titleText="No results found"
              headingLevel="h2"
            />
          </EmptyState>
        </Bullseye>
      </Td>
    </Tr>
  )
}