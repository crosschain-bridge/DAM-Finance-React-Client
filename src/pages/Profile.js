import React, { useState } from "react";
import {
  Flex,
  Heading,
  Avatar,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  WrapItem,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiBell,
} from "react-icons/fi";

export default function Profile() {
  const [display, changeDisplay] = useState("hide");
  return (
    <Flex
      h={[null, null, "100vh"]}
      maxW="2000px"
      flexDir={["column", "column", "row"]}
      overflow="hidden"
    >
      {/* Nav and currency */}
      <Flex
        w={["100%", "100%", "10%", "15%", "15%"]}
        flexDir="column"
        alignItems="center"
        backgroundColor="purple.700"
        color="#fff"
      >
        <Flex
          flexDir="column"
          h={[null, null, "100vh"]}
          justifyContent="space-between"
        >
          <Flex flexDir="column" as="nav">
            <Heading
              mt={50}
              mb={[25, 50, 100]}
              fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
              alignSelf="center"
              letterSpacing="tight"
            >
              DAM <br />
              Finance
            </Heading>
            <Flex
              flexDir={["row", "row", "column", "column", "column"]}
              align={["center", "center", "center", "flex-start", "flex-start"]}
              wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
              justifyContent="center"
            >
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="/"
                  _hover={{textDecor: "none"}}
                >
                  <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                  <Text className="active" ml={2}>Home</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{textDecor: "none"}}
                >
                  <Icon as={FiPieChart} fontSize="2xl" />
                  <Text ml={2}>Token Balance</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{textDecor: "none"}}
                >
                  <Icon as={FiDollarSign} fontSize="2xl" />
                  <Text ml={2}>Wallet</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{textDecor: "none"}}
                >
                  <Icon as={FiBox} fontSize="2xl" />
                  <Text ml={2}>Assets</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Avatar my={2} src="avatar-1.jpg" />
            <Text textAlign="center">Manager</Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Portfolio */}
      <Flex
        w={["100%", "100%", "60%", "60%", "55%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        <Heading fontWeight="normal" mb={4} letterSpacing="wide">
          Welcome back, Manager
        </Heading>

        <Flex dir="row" align="center" justify="flex-start">
          <Avatar
            name="USDC"
            src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
            mt={2}
          />
          <Box ml={6}>
            <Text color="gray.400" fontSize="sm" fontWeight="500" mt="10px">
              Pool Balance
            </Text>
            <Text fontWeight="bold" fontSize="2xl">
              $5,750.20
            </Text>
          </Box>
        </Flex>

        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              Transactions
            </Heading>
            <Text fontSize="small" color="gray" ml={4}>
              Apr 2021
            </Text>
          </Flex>
          <IconButton icon={<FiCalendar />} />
        </Flex>
        <Flex flexDir="column">
          <Flex overflow="auto">
            <Table variant="unstyled" mt={4}>
              <Thead>
                <Tr color="gray">
                  <Th>Transaction</Th>
                  <Th>Top Assets</Th>
                  <Th isNumeric>Value</Th>
                  <Th isNumeric>Pool Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src="amazon.jpeg" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          USF Fund I
                        </Heading>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>WETH</Td>
                  <Td isNumeric>$2,000</Td>
                  <Td isNumeric>
                    <Text fontWeight="bold" display="inline-table">
                      -$242
                    </Text>
                    .00
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src="starbucks.png" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          USF Fund I
                        </Heading>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>WBTC</Td>
                  <Td isNumeric>+$23</Td>
                  <Td isNumeric>
                    <Text fontWeight="bold" display="inline-table">
                      -$32
                    </Text>
                    .00
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src="youtube.png" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          USF Fund I
                        </Heading>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>USDC</Td>
                  <Td isNumeric>+$4</Td>
                  <Td isNumeric>
                    <Text fontWeight="bold" display="inline-table">
                      -$112
                    </Text>
                    .00
                  </Td>
                </Tr>
                {display == "show" && (
                  <>
                    <Tr>
                      <Td>
                        <Flex align="center">
                          <Avatar size="sm" mr={2} src="amazon.jpeg" />
                          <Flex flexDir="column">
                            <Heading size="sm" letterSpacing="tight">
                              USF Fund I
                            </Heading>
                          </Flex>
                        </Flex>
                      </Td>
                      <Td>DAI</Td>
                      <Td isNumeric>+$2</Td>
                      <Td isNumeric>
                        <Text fontWeight="bold" display="inline-table">
                          -$242
                        </Text>
                        .00
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Flex align="center">
                          <Avatar size="sm" mr={2} src="starbucks.png" />
                          <Flex flexDir="column">
                            <Heading size="sm" letterSpacing="tight">
                              USF Fund I
                            </Heading>
                          </Flex>
                        </Flex>
                      </Td>
                      <Td>MLN</Td>
                      <Td isNumeric>+$23</Td>
                      <Td isNumeric>
                        <Text fontWeight="bold" display="inline-table">
                          -$32
                        </Text>
                        .00
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Flex align="center">
                          <Avatar size="sm" mr={2} src="youtube.png" />
                          <Flex flexDir="column">
                            <Heading size="sm" letterSpacing="tight">
                              USF Fund I
                            </Heading>
                          </Flex>
                        </Flex>
                      </Td>
                      <Td>WBTC</Td>
                      <Td isNumeric>+$4</Td>
                      <Td isNumeric>
                        <Text fontWeight="bold" display="inline-table">
                          -$112
                        </Text>
                        .00
                      </Td>
                    </Tr>
                  </>
                )}
              </Tbody>
            </Table>
          </Flex>
          <Flex align="center">
            <Divider />
            <IconButton
              icon={display == "show" ? <FiChevronUp /> : <FiChevronDown />}
              onClick={() => {
                if (display == "show") {
                  changeDisplay("none");
                } else {
                  changeDisplay("show");
                }
              }}
            />
            <Divider />
          </Flex>
        </Flex>
      </Flex>

      {/* Aave transaction */}
      <Flex
        w={["100%", "100%", "30%"]}
        bgColor="white"
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, "300px", "300px", "400px"]}
      >
        <Flex alignContent="center">
          <InputGroup
            bgColor="#fff"
            mb={4}
            borderColor="purple.700"
            borderRadius="10px"
            mr={2}
          >
            <InputLeftElement
              pointerEvents="none"
              Icon={<FiSearch color="gray" />}
            />
            <Input type="number" placeholder="Search" borderRadius="10px" />
          </InputGroup>
          <IconButton
            icon={<FiBell />}
            fontSize="sm"
            bgColor="#fff"
            borderRadius="50%"
            p="10px"
          />
          <Flex
            w={30}
            h={25}
            bgColor="#B57295"
            borderRadius="50%"
            color="#fff"
            align="center"
            justify="center"
            ml="-3"
            mt="-2"
            zIndex="100"
            fontSize="xs"
          >
            2
          </Flex>
        </Flex>

        {/* <Flex flexDir="column" my={4}>
                    <Flex justify="space-between" mb={2}>
                        <Text>Current Balance</Text>
                        <Text fontWeight="bold">$xx</Text>
                    </Flex>
                    <Flex justify="space-between">
                        <Text>Withdraw limit</Text>
                        <Text fontWeight="bold">$xx</Text>
                    </Flex>
                </Flex> */}
        <Heading letterSpacing="tight" size="md" my={4}>
          Interact with Aave{" "}
        </Heading>
        <ButtonGroup>
          <Button>Deposit</Button>
          <Button>Withdraw</Button>
        </ButtonGroup>
        <Button
          mt={4}
          bgColor="purple.700"
          color="#fff"
          p={7}
          borderRadius={15}
          _hover={{ bgColor: "purple.500", color: "#fff" }}
        >
          Confirm Transaction
        </Button>
      </Flex>
    </Flex>
  );
}

{
  /* <WrapItem>
<Avatar name='USDC' src='https://cryptologos.cc/logos/usd-coin-usdc-logo.png' className='' />
</WrapItem> */
}
