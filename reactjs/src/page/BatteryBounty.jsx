import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, formatUnits } from 'ethers';

import BatteryBountyABI from "../artifacts/contracts/BatteryBounty.sol/BatteryBounty.json";

const BatteryBountyAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function BatteryBounty() {
  const { address, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const [balance, setBalance] = useState(0);
  const [batteryCount, setBatteryCount] = useState('');
  const [recycleTransactions, setRecycleTransactions] = useState([]);
  const [history, setHistory] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getBalance();
  }, [address])

  useEffect(() => {
    getUserRecycleTransaction();
  }, [address])
  
  const getBalance = async () => {
    if (!isConnected) throw Error('User disconnected');
    
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const BatteryBountyContract = new Contract(BatteryBountyAddress, BatteryBountyABI.abi, signer);
    const BBBalance = await BatteryBountyContract.balanceOf(address);
  
    console.log(formatUnits(BBBalance, 18));
    setBalance(BBBalance.toString());
  }

  const getUserRecycleTransaction = async () => {
    if (!isConnected) throw Error('User disconnected');
    
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const BatteryBountyContract = new Contract(BatteryBountyAddress, BatteryBountyABI.abi, signer);
    const transcations = await BatteryBountyContract.getUserRecycleTransaction();
   
    setRecycleTransactions(Object.values(transcations));
  }

  const handleRecycle = async () => {
    if (batteryCount && !isNaN(batteryCount)) {
      if (!isConnected) throw Error('User disconnected');
    
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      // The Contract object
      const BatteryBountyContract = new Contract(BatteryBountyAddress, BatteryBountyABI.abi, signer);
      const transactionHash = await BatteryBountyContract.createRecycleTransaction(batteryCount);
      console.log(transactionHash);
      
      const count = parseInt(batteryCount);
      const reward = count * 10; // Assume 10 tokens per battery
      setBalance(balance + reward);
      setHistory([
        { date: new Date().toLocaleString(), count, reward },
        ...history,
      ]);
      setBatteryCount('');
      toast({
        title: 'Recycling Successful',
        description: `You recycled ${count} batteries and earned ${reward} tokens!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box maxWidth="800px" margin="auto" padding={8}>
        <VStack spacing={6} align="stretch">
          <Text fontSize="xl">Current Balance: {balance} BB Tokens</Text>
          <Box>
            <Heading size="md" mb={2}>Recycle Batteries</Heading>
            <Input
              placeholder="Number of batteries"
              value={batteryCount}
              onChange={(e) => setBatteryCount(e.target.value)}
              mb={2}
            />
            <Button colorScheme="green" onClick={handleRecycle}>
              Recycle
            </Button>
          </Box>
          <Box>
            <Heading size="md" mb={2}>Your Recycle Transactions</Heading>
            {recycleTransactions?.map((r) => (
              <p key={r}>{r}</p>
            ))}
          </Box>
          <Box>
            <Heading size="md" mb={2}>Recycling History</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Batteries Recycled</Th>
                  <Th>Tokens Earned</Th>
                </Tr>
              </Thead>
              <Tbody>
                {history.map((entry, index) => (
                  <Tr key={index}>
                    <Td>{entry.date}</Td>
                    <Td>{entry.count}</Td>
                    <Td>{entry.reward}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default BatteryBounty;