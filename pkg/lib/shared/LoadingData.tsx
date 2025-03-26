import React from "react";
import { Bullseye, Spinner } from "@patternfly/react-core";
import { Tr,Td } from '@patternfly/react-table';

interface LoadingDataProps {
  colSpan: number;
}

export const LoadingData: React.FunctionComponent<LoadingDataProps> = ({ colSpan }) => {
  return (
    <Tr>
      <Td colSpan={colSpan}>
        <Bullseye>
          <Spinner/>
        </Bullseye>
      </Td>
    </Tr>
  )
}