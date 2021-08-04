import { useState,useEffect } from "react";

// importing components
import {
  Avatar,
  Box,
  Flex,
  Text,
  Button,
  Spacer,
  Select,
  ButtonGroup,
  Wrap,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar/index";
import Graph from "../components/Graph/index";
import WrapCard from "../components/WrapCard";
import { VscCloudDownload } from "react-icons/vsc";
import axios from "axios";

const Valve = () => {

  const getData = async() => {
    const data = await axios.get(`https://deep-index.moralis.io/api/historical/token/erc20/transactions`,{
      "X-API-Key": "MnH9uqGXgnr8A0OU3su9DNgIxXdKuNQPhShrKor3KJ3oJePfjBMWYAKIo9BT5OQ7"
    })
    console.log(data);
  }

  useEffect(() => {
    getData();
  },[])
  // getData();
  return (
    <Flex direction="column" h="100vh">
      <NavBar />
      {/* Fund Name and Deposite Button */}
      <Box m={5}>
        <Flex dir="row" align="center" justify="auto" m={6}>
          <Avatar
            name="Dan Fincher"
            src="https://bit.ly/wrong-link"
            bg="teal.300"
          ></Avatar>
          <Text fontSize="3xl" fontWeight="bold" ml={4}>
            USF Fund I
          </Text>
          <Spacer />
          <Button
            display={{ base: "none", md: "inline-flex" }}
            leftIcon={<VscCloudDownload />}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bgGradient="linear(to-r, cyan.400, blue.500)"
            href={"#"}
            _hover={{
              bgGradient: "linear(to-l, cyan.500, blue.400)",
            }}
          >
            Deposite
          </Button>
        </Flex>
        <Box m="50px 0 0 30px">
          <Text fontSize="sm" color="gray.500">
            Share Price
          </Text>
        </Box>

        {/* Main Line: Price - Droption - Button group */}
        <Flex
          dir="row"
          m="0 30px 60px 30px"
          align="center"
          sx={{
            "@media (max-width: 770px)": {
              flexDirection: "column",
            },
          }}
        >
          <Text fontSize="5xl" fontWeight="bold">
            $2,120.42
          </Text>
          <Spacer />
          <Select variant="outline" placeholder="Share price" w="250px">
            <option>Assets under management</option>
          </Select>

          <ButtonGroup ml={6} p={1} spacing="-0.4">
            <Button rounded="10px 0 0 10px" border="1px" borderColor="gray.600">
              1D
            </Button>
            <Button rounded="none" border="1px" borderColor="gray.600">
              1W
            </Button>
            <Button rounded="none" border="1px" borderColor="gray.600">
              1M
            </Button>
            <Button rounded="none" border="1px" borderColor="gray.600">
              3M
            </Button>
            <Button rounded="none" border="1px" borderColor="gray.600">
              6M
            </Button>
            <Button rounded="0 10px 10px 0" border="1px" borderColor="gray.600">
              1Y
            </Button>
          </ButtonGroup>
        </Flex>

        <Graph />

        {/* Cards */}
        <Wrap
          justify="space-around"
          align="center"
          m="60px 10px 10px 60px"
          h="auto"
        >
          <WrapCard />
          <WrapCard />
          <WrapCard />
        </Wrap>
      </Box>
    </Flex>
  );
};

export default Valve;
