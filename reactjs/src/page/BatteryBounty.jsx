import React, { useCallback, useState, useEffect } from 'react';
import {
  ChakraProvider,
  HStack,
  Box,
  VStack,
  Heading,
  Icon,
  Progress,
  List,
  ListItem,
  CloseButton,
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
import { AttachmentIcon } from '@chakra-ui/icons';
import lighthouse from "@lighthouse-web3/sdk";

import { LIGHTHOUSE_API_KEY } from '../config';
import BatteryBountyABI from "../artifacts/contracts/BatteryBounty.sol/BatteryBounty.json";

// Morph Holesky Testnet Contract Address
const BatteryBountyAddress = "0x2Fe28e60d6272e833CeC32F6b1cdC9D4eE8744bd";

function BatteryBounty() {
  const { address, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const [balance, setBalance] = useState(0);
  const [batteryCount, setBatteryCount] = useState('');
  const [recycleTransactions, setRecycleTransactions] = useState([]);
  const [history, setHistory] = useState([]);
  const [files, setFiles] = useState([]);
  const [photoURL, setPhotoURL] = useState('');
  const [isDragging, setIsDragging] = useState(false);
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
      const transactionHash = await BatteryBountyContract.createRecycleTransaction(batteryCount, photoURL);
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

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
    
    toast({
      title: 'Files added',
      description: `Added ${droppedFiles.length} files`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  const onFileSelect = async(e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
    await uploadFileOnchain(selectedFiles);
    
    toast({
      title: 'Files added',
      description: `Added ${selectedFiles.length} files`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const uploadFileOnchain = async (selectedFiles) => {
    const apiKey = LIGHTHOUSE_API_KEY;
    const dealParams = {
        num_copies: 2,
        repair_threshold: 28800,
        renew_threshold: 240,
        miner: ["t017840"],
        network: "calibration",
        deal_duration: 1756643958,
    };
    const uploadResponse = await lighthouse.upload(selectedFiles, apiKey, dealParams);
    if (uploadResponse) {
      console.log(`https://gateway.lighthouse.storage/ipfs/${uploadResponse.data.Hash}`);
      setPhotoURL(`https://gateway.lighthouse.storage/ipfs/${uploadResponse.data.Hash}`);
    }
  }

  const removeFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
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
            <Heading size="md" mb={2} mt={3}>
              Upload photo of Batteries
            </Heading>
            <Box maxW="xl" mx="auto" mt={8}>
              <VStack spacing={4} align="stretch">
                {/* Drop Zone */}
                <Box
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  borderWidth={2}
                  borderStyle="dashed"
                  borderRadius="lg"
                  p={6}
                  textAlign="center"
                  bg={isDragging ? 'blue.50' : 'transparent'}
                  borderColor={isDragging ? 'blue.500' : 'gray.200'}
                  transition="all 0.2s"
                >
                  <Icon as={AttachmentIcon} w={8} h={8} color="gray.400" />
                  <VStack spacing={2}>
                    <Text color="gray.600">
                      Drag and drop your files here, or
                    </Text>
                    <Button
                      size="sm"
                      onClick={() => document.getElementById('file-upload').click()}
                      colorScheme="blue"
                      variant="outline"
                    >
                      Browse Files
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={onFileSelect}
                      style={{ display: 'none' }}
                    />
                  </VStack>
                </Box>

                {/* File List */}
                {files.length > 0 && (
                  <List spacing={2}>
                    {files.map((file, index) => (
                      <ListItem
                        key={index}
                        borderWidth={1}
                        borderRadius="md"
                        p={2}
                        bg="gray.50"
                      >
                        <HStack justify="space-between">
                          <VStack align="start" spacing={0}>
                            <Text fontSize="sm" fontWeight="medium">
                              {file.name}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {(file.size / 1024).toFixed(2)} KB
                            </Text>
                          </VStack>
                          <CloseButton
                            size="sm"
                            onClick={() => removeFile(index)}
                          />
                        </HStack>
                        <Progress
                          value={100}
                          size="xs"
                          colorScheme="blue"
                          mt={2}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </VStack>
            </Box>

            <Button colorScheme="green" onClick={handleRecycle} mt="3">
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