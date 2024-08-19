import React from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { CheckIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons';

function Landing() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" py={20}>
        <VStack spacing={10} align="stretch">
          {/* Hero Section */}
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              Revolutionizing Battery Recycling
            </Heading>
            <Text fontSize="xl" color={textColor}>
              Join the movement to properly dispose of batteries and protect our environment
            </Text>
          </Box>

          {/* Problem Statement */}
          <Box bg="red.100" p={8} borderRadius="md">
            <Heading as="h2" size="xl" mb={4} color="red.700">
              The Problem
            </Heading>
            <Text fontSize="lg" color="red.700">
              People are not discarding batteries the correct way, leading to severe environmental consequences:
            </Text>
            <List spacing={3} mt={4}>
              <ListItem>
                <ListIcon as={CheckIcon} color="red.500" />
                Toxic materials leaching into soil and water
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="red.500" />
                Increased risk of fire hazards in waste facilities
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="red.500" />
                Missed opportunities for recycling valuable materials
              </ListItem>
            </List>
          </Box>

          {/* Solution */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              Our Solution
            </Heading>
            <Text fontSize="lg" mb={4}>
              Battery Bounty incentivizes proper battery disposal through blockchain technology and rewards:
            </Text>
            <HStack spacing={8} align="stretch">
              <Box flex={1} bg="green.100" p={6} borderRadius="md">
                <Icon as={RepeatIcon} w={8} h={8} color="green.500" mb={2} />
                <Heading as="h3" size="md" mb={2}>
                  Easy Recycling
                </Heading>
                <Text>Scan QR codes at designated recycling points to log your contribution</Text>
              </Box>
              <Box flex={1} bg="blue.100" p={6} borderRadius="md">
                <Icon as={StarIcon} w={8} h={8} color="blue.500" mb={2} />
                <Heading as="h3" size="md" mb={2}>
                  Token Rewards
                </Heading>
                <Text>Earn BatteryBounty tokens for each battery you recycle</Text>
              </Box>
              <Box flex={1} bg="purple.100" p={6} borderRadius="md">
                <Icon as={CheckIcon} w={8} h={8} color="purple.500" mb={2} />
                <Heading as="h3" size="md" mb={2}>
                  Community Impact
                </Heading>
                <Text>Track your environmental impact and compete with friends</Text>
              </Box>
            </HStack>
          </Box>

          {/* Call to Action */}
          <Box textAlign="center">
            <Button colorScheme="green" size="lg">
              Join Battery Bounty Now
            </Button>
          </Box>

          {/* Additional Information */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              Why It Matters
            </Heading>
            <Text fontSize="lg">
              Proper battery disposal is crucial for environmental protection and resource conservation. 
              By joining Battery Bounty, you're not just earning rewards – you're contributing to a 
              cleaner, safer planet for future generations.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default Landing;