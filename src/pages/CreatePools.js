import {
  Box,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  InputGroup,
  InputRightElement,
  Select,
  Image
} from "@chakra-ui/react";
import ComptrollerFactory from "../abis/ComptrollerFactory.json"
import DAMPoolFactory from "../abis/DAMPoolFactory.json"
import { useMoralis } from "react-moralis";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import assets from "../denominationAsset.json"
import { useState, useEffect } from "react";
import  DampLogo  from '../assets/damp.svg';

export default function CreatePools() {
  const { web3 } = useMoralis();
  const [ data, setData ] = useState({
    manager: "",
    poolName: "",
    assetName: "",
  });

  const handleSubmit = () => {
    console.log(data);   
  }

  const handleSelect = (e) => {
    setData({ ...data, assetName: e.target.value });
  };
  return (
    <Box p={20}>
    <Image src={DampLogo} height={14} bgColor="purple.700" px={2} py={1} mb={6} borderRadius='sm' />
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Manager</FormLabel>
          <InputGroup>
            <Input
              value={data.manager}
              type="text"
              onChange={(e) => setData({ ...data, manager: e.target.value })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => console.log("Add")}>
                <AddIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>We'll never share your address.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Name of the Pool</FormLabel>
          <Input
            value={data.poolName}
            type="text"
            onChange={(e) => setData({ ...data, poolName: e.target.value })}
          />
          <FormHelperText>We'll never share</FormHelperText>
        </FormControl>
        <Select
          placeholder="Domination Asset"
          value={data.assetName}
          icon={<ChevronDownIcon />}
          onChange={handleSelect}
        >
          {assets.map(asset => {
              return (
                  <option key={asset.address} value={asset.name}>{asset.name}</option>
              )
          })}
        </Select>
        <Button bgColor='green.400' color='whitesmoke' _hover={{bgColor: "green.600"}} variant="outline" onClick={handleSubmit}>Submit</Button>
      </Stack>
    </Box>
  );
}
