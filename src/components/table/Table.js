/* eslint-disable react/jsx-key */
import { useState,useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Button,
  Link
} from "@chakra-ui/react";
import { useTable } from "react-table";
import { useMemo } from "react";
import { useMoralis } from "react-moralis";
import {initComptroller} from "../../comptroller"
import { Redirect,Link as ReachLink } from "react-router-dom";

export default function DAMTable() {

  const comptrollerAddress = "0x4C470baC1172B5E20690ce65E1146AfE94Ff1053";
  

  return (
    <Box border="1px" borderColor="gray.600" rounded="lg">
      <Table size="lg">
        <Thead>
          <Tr>
            <Th>
              Pool
            </Th>
            <Th>
              Denomination Assets
            </Th>
            <Th>
              Total Amount
            </Th>
          </Tr>
        </Thead>
        <Tbody >
          <Tr >
            <Td>DAMP Pool</Td>
            <Td>AaveDaix</Td>
            <Td>100eth</Td>
            <Td>
            <Link as={ReachLink} to={`valve/${comptrollerAddress}`}>Click me</Link>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

