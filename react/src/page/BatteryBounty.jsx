import React, { useState } from 'react';
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

function BatteryBounty() {
  const [balance, setBalance] = useState(0);
  const [batteryCount, setBatteryCount] = useState('');
  const [history, setHistory] = useState([]);
  const toast = useToast();

  const handleRecycle = () => {
    if (batteryCount && !isNaN(batteryCount)) {
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