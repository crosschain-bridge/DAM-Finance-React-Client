/* eslint-disable react/jsx-key */
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
} from "@chakra-ui/react";
import { useTable } from "react-table";
import { useMemo } from "react";

export default function DAMTable() {
  const columns = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "TOP ASSETS",
        accessor: "top_assets",
      },
      {
        Header: "SINCE INCEPTION",
        accessor: "since_inception",
      },
      {
        Header: "THIS MONTH",
        accessor: "this_month",
      },
      {
        Header: "24H",
        accessor: "aday",
      },
      {
        Header: "LAST 7 DAYS",
        accessor: "last_7_days",
      },
    ],
    []
  );
  const data = useMemo(
    () => [
      {
        name: "USF Fund 1",
        top_assets: ["eth", "sol", ""],
        aday: "Hello",
        since_inception: "-37.51%",
        this_month: "-7.65%",
        last_7_days: "World",
      },
      {
        name: "USF Fund 1",
        top_assets: ["eth", "sol", ""],
        aday: "Hello",
        since_inception: "-37.51%",
        this_month: "-7.65%",
        last_7_days: "World",
      },
      {
        name: "USF Fund 1",
        top_assets: ["eth", "sol", ""],
        aday: "Hello",
        since_inception: "-37.51%",
        this_month: "-7.65%",
        last_7_days: "World",
      },
      {
        name: "USF Fund 1",
        top_assets: ["eth", "sol", ""],
        aday: "Hello",
        since_inception: "-37.51%",
        this_month: "-7.65%",
        last_7_days: "World",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Box border="1px" borderColor="gray.600" rounded="lg">
      <Table size="lg" {...getTableProps()}>
        <Thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, idx) => (
              // Apply the header row props
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <Th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </Th>
                  ))
                }
              </Tr>
            ))
          }
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <Tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <Td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </Td>
                      );
                    })
                  }
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </Box>
  );
}

// export default function Table() {
//   const tableInstance = useTable({ columns, data });
//   return (
//     <Table variant="simple" bg="blue.900">
//       <Thead>
//         <Tr>
//           <Th>NAME</Th>
//           <Th>TOP ASSETS</Th>
//           <TH>SINCE INCEPTION</TH>
//           <Th>THIS MONTH</Th>
//           <Th>24H</Th>
//           <Th>LAST 7</Th>
//         </Tr>
//       </Thead>
//       <Tbody>
//         <Tr>
//           <Td>inches</Td>
//           <Td>millimetres (mm)</Td>
//           <Td isNumeric>25.4</Td>
//         </Tr>
//         <Tr>
//           <Td>feet</Td>
//           <Td>centimetres (cm)</Td>
//           <Td isNumeric>30.48</Td>
//         </Tr>
//         <Tr>
//           <Td>yards</Td>
//           <Td>metres (m)</Td>
//           <Td isNumeric>0.91444</Td>
//         </Tr>
//       </Tbody>
//     </Table>
//   );
// }
