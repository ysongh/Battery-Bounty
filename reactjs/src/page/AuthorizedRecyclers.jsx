import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react';

function AuthorizedRecyclers() {
  const [newRecyclerAddress, setNewRecyclerAddress] = useState('');
  const [authorizedRecyclers, setAuthorizedRecyclers] = useState([]);
  const toast = useToast();

  // Simulated function to check if the current user is the contract owner
  const isContractOwner = () => {
    return true;
  };

  const handleAddRecycler = async () => {
    if (!isContractOwner()) {
      toast({
        title: 'Error',
        description: 'Only the contract owner can add authorized recyclers.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(newRecyclerAddress)) {
      toast({
        title: 'Invalid Address',
        description: 'Please enter a valid Ethereum address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // In a real implementation, this would call the smart contract function
    // to add the new authorized recycler
    setAuthorizedRecyclers([...authorizedRecyclers, newRecyclerAddress]);
    setNewRecyclerAddress('');
    toast({
      title: 'Recycler Added',
      description: 'The new recycler has been authorized successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Authorized Recyclers</Heading>
        
        <Box>
          <Heading size="md" mb={2}>Add New Recycler</Heading>
          <Input
            placeholder="Recycler's Ethereum Address"
            value={newRecyclerAddress}
            onChange={(e) => setNewRecyclerAddress(e.target.value)}
            mb={2}
          />
          <Button colorScheme="green" onClick={handleAddRecycler}>
            Add Recycler
          </Button>
        </Box>

        <Box>
          <Heading size="md" mb={2}>Current Authorized Recyclers</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Address</Th>
              </Tr>
            </Thead>
            <Tbody>
              {authorizedRecyclers.map((address, index) => (
                <Tr key={index}>
                  <Td>{address}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
}

export default AuthorizedRecyclers;