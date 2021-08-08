import { useEffect,useState } from "react";

// importing components
import {
  Avatar,
  Box,
  Flex,
  Text,
  Button,
  Spacer,
  Select,
  Wrap,
  Input
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"
import NavBar from "../components/NavBar/index";
import {createFlow} from "../superfluid"
import { useMoralis } from "react-moralis";
// import Graph from "../components/Graph/index";
import WrapCard from "../components/WrapCard";
import { VscCloudDownload } from "react-icons/vsc";
import axios from "axios";
import { useParams } from "react-router";
import {withdrawable,withdrawAmount,calcUserInvested,calcUserUninvested,calcShare,calcTotalAmount,getNetFlow,calcTotalInvested,calcTotalUninvested,initComptroller} from "../comptroller"


const WithDrawButton =  (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {user} = useMoralis();
  const userAddress =user?.attributes.accounts[0]
  const [data,setData] = useState();
  const [Amount,setAmount] = useState();

  const getInvestedAmount = () => {
    const InvestedAmount = calcUserInvested(userAddress);
    console.log(InvestedAmount);
  }

  const getUnInvestedAmount = () => {
    const unInvestedAmount = calcUserUninvested(userAddress);
    console.log(unInvestedAmount);
  }

  const getUserShare = () => {
    const  calShareValue = calcShare(userAddress);
    console.log(calShareValue);
  }

  const handleWithDraw = () => {
    const test =  withdrawAmount(Amount,userAddress);
    console.log(test);
  };


  const getWithDrawAmount = async() => {
    const amount = await withdrawable(userAddress);
    setAmount(amount);
  }
  
  useEffect(() => {
      getWithDrawAmount();
  },[]);


  return (
    <>
    <Button 
            {...props}
            display={{ base: "none", md: "inline-flex" }}
            leftIcon={<VscCloudDownload />}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bgGradient="linear(to-r, cyan.400, blue.500)"
            onClick={onOpen}
            _hover={{
              bgGradient: "linear(to-l, cyan.500, blue.400)",
            }}
          >
            WithDraw
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>WithDraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The Amount You can WithDraw is {Amount}</Text>
            <Input onChange={(e) => setAmount(e.target.value)} value={Amount} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleWithDraw}>Max</Button>
            <Button variant="ghost" onClick={handleWithDraw}>WithDraw</Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
  )
}

const Valve = () => {

  const { compAdd } = useParams();
  const getData = async() => {
    const data = await axios.get(`https://deep-index.moralis.io/api/historical/token/erc20/transactions`,{
      "X-API-Key": "MnH9uqGXgnr8A0OU3su9DNgIxXdKuNQPhShrKor3KJ3oJePfjBMWYAKIo9BT5OQ7"
    })
    console.log(data);
  }


  const [totalAmount,setTotalAmount] = useState(0);
  const [totalInvested,setTotalInvested] = useState(0);
  const [totalUnInvested,setTotalUnInvested] = useState(0);


  const {user,} = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [flowAmount,setFlowAmount] = useState("");


  const getTotalAmount = async() => {
    const data = await calcTotalAmount();
    const res = parseFloat(data);
    const fix = res.toFixed(4);
    setTotalAmount(fix);
  }

  const getTotalInvested = async() => {
    const data = await calcTotalInvested();
    console.log("INVSTED AMOUNT",data);
    if(data == undefined){
      setTotalInvested(0);
      return;
    }
    setTotalInvested(data);
  }

  const getTotalUnInvested = async () => {
    const data = await calcTotalUninvested();
    const res = parseFloat(data);
    const fix = res.toFixed(4);
    setTotalUnInvested(fix);
  }

  const handleDeposit = () => {
    console.log("Clicked");
    console.log(user.get("ethAddress"));
    createFlow(500,flowAmount,"0x4C470baC1172B5E20690ce65E1146AfE94Ff1053",user.get("ethAddress") )
  }
  useEffect(() => {
    initComptroller(compAdd)
    getData();
    getTotalAmount();
    getTotalInvested();
    getTotalUnInvested();
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
            onClick={onOpen}
            _hover={{
              bgGradient: "linear(to-l, cyan.500, blue.400)",
            }}
          >
            Deposit
          </Button>
          <WithDrawButton ml={2} />
          <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Flow Tokens</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Flow Amount" value={flowAmount} onChange={(e) =>setFlowAmount(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleDeposit}>Create Flow</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Flex>
        <Box m="50px 0 0 30px">
          <Text fontSize="sm" color="gray.500">
            Total Asset
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
        </Flex>


        {/* Cards */}
        <Wrap
          justify="space-around"
          align="center"
          m="60px 10px 10px 60px"
          h="auto"
          color='whitesmoke'
        >
          <WrapCard title="Total Amount Deposited" value={totalAmount} />
          <WrapCard title="Total Invested" value={totalInvested}  />
          <WrapCard title="Total UnInvested" value={totalUnInvested} />
        </Wrap>
      </Box>
    </Flex>
  );
};

export default Valve;

