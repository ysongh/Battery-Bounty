import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useToast,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';
import { QrReader } from 'react-qr-reader';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract } from 'ethers';

import BatteryBountyABI from "../artifacts/contracts/BatteryBounty.sol/BatteryBounty.json";

const BatteryBountyAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function RecyclingVerification() {
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [transactionId, setTransactionId] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [transaction, setTransaction] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const generateTransaction = () => {
    // In a real implementation, this would interact with the blockchain
    // to create a new recycling transaction
    const newTransactionId = Math.random().toString(36).substring(7);
    setTransactionId(newTransactionId);
  };

  const handleScan = (result) => {
    if (result) {
      // In a real implementation, this would verify the QR code with the blockchain
      const scannedTransactionId = result?.text.split('/').pop();
      if (scannedTransactionId === transactionId) {
        setVerificationResult('Valid');
        toast({
          title: 'Verification Successful',
          description: 'The recycling transaction has been verified.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setVerificationResult('Invalid');
        toast({
          title: 'Verification Failed',
          description: 'The scanned QR code is not valid.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    }
  };

  const verifyRecycleTransaction = async () => {
    if (!isConnected) throw Error('User disconnected');

    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const BatteryBountyContract = new Contract(BatteryBountyAddress, BatteryBountyABI.abi, signer);
    const txt = await BatteryBountyContract.verifyRecycleTransaction(transaction);

    console.log(txt);
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Recycling Verification
        </Heading>

        <Box bg="blue.50" p={6} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>
            Generate Recycling QR Code
          </Heading>
          <Text mb={4}>
            Click the button below to generate a QR code for your recycling transaction.
          </Text>
          <Button colorScheme="blue" onClick={generateTransaction}>
            Generate QR Code
          </Button>

          {transactionId && (
            <Box mt={4}>
              <Text mb={2}>Scan this QR code at the recycling center:</Text>
              <Box bg="white" p={4} display="inline-block">
                <QRCode value={`https://batterybounty.com/verify/${transactionId}`} size={200} />
              </Box>
              <Text mt={2} fontSize="sm">
                Transaction ID: {transactionId}
              </Text>
            </Box>
          )}
        </Box>

        <Box bg="green.50" p={6} borderRadius="md">
          <Heading as="h2" size="lg" mb={4}>
            Verify Recycling Transaction
          </Heading>
          <Text mb={4}>
            Click the button below to scan a QR code and verify a recycling transaction.
          </Text>
          <Button colorScheme="green" onClick={onOpen}>
            Scan QR Code
          </Button>

          <Text mt={3}>Or enter Transaction Hash</Text>

          <Input
            placeholder="Transaction Hash"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
            mb={2}
            mt={3}
          />

          <Button colorScheme="green" onClick={verifyRecycleTransaction}>
            Send
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Scan QR Code</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <QrReader
                  onResult={handleScan}
                  constraints={{ facingMode: 'environment' }}
                  style={{ width: '100%' }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>

          {verificationResult && (
            <Text mt={4} fontWeight="bold" color={verificationResult === 'Valid' ? 'green.500' : 'red.500'}>
              Verification Result: {verificationResult}
            </Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
}

export default RecyclingVerification;