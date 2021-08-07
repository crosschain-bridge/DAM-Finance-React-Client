import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useDisclosure,
  Stack,
  Input,
  SlideFade,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import NavBar from "../components/NavBar";
import DAMTable from "../components/table/Table";
import {initSuperfluid,createBatchCall,flow} from "../superfluid"
import {Link as RouterLink} from "react-router-dom"

export default function Home() {
  const { Moralis, user, isAuthenticated } = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(isAuthenticated, "IS AUHT");
  // console.log("USER",user.getUsername());
  // console.log("USERD ",user.attributes)

  const getBalances = async () => {
    const options = {
      chain: "matic",
      address: "0x452181dAe31Cf9f42189df71eC64298993BEe6d3",
    };
    const balances = await Moralis.Web3.getAllERC20(options);
    let b = balances[0].balance / 10 ** 18;
    console.log("BALANCES", balances);
  };

  const getTransaction = async () => {
    const options = {
      chain: "matic",
      address: "0x452181dAe31Cf9f42189df71eC64298993BEe6d3",
      order: "desc",
    };
    const transactions = await Moralis.Web3.getTransactions(options);
    console.log("Transactions", transactions);
  };

  return (
    // Main Wrapper
    <Flex direction="column" h="100vh">
      {/* Wrapper of the main content */}
      {/* Heading and button */}
      <NavBar />
      <Box m="30px 20px 0 20px">
        <Flex
          dir="row"
          justifyContent="space-between"
          sx={{
            "@media (max-width: 415px)": {
              flexDirection: "column",
            },
          }}
        >
          <Text fontSize="3xl" fontWeight="700">
            Browse and Deposit
          </Text>
          <Button onClick={getBalances}>Get Balance</Button>
          <Button onClick={getTransaction}>Get Transaction</Button>
          <Button onClick={initSuperfluid}>SuperFluid</Button>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            as={RouterLink}
            to='/createpools'
            bgGradient="linear(to-r, cyan.400, blue.500)"
            
            _hover={{
              bgGradient: "linear(to-l, cyan.500, blue.400)",
            }}
          >
            Deposites
          </Button>
        </Flex>
        {/* Tabs for table content */}
        <Tabs variant="line" mt={30} w="100%" p={3}>
          <TabList>
            <Tab>Browse Leaderboard</Tab>
            <Tab>Browse All</Tab>
            <Tab>My Deposites</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DAMTable />
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
