import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Link } from '@chakra-ui/react';

function Navbar() {
  return (
    <Box p={2} bg="yellow">
      <Container maxW="container.xl">
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Link as={ReactLink} to="/">
              <Heading color="green" mt="3" mb="5">Battery Bounty</Heading>
            </Link>
          </Box>
          <Link as={ReactLink} to="/">Home</Link>
          <Link as={ReactLink} to="/battery-bounty">Bounty</Link>
          <Link as={ReactLink} to="/recycling-verification">Verification</Link>
          <Link as={ReactLink} to="/admin">Admin</Link>
          <Spacer />
          <w3m-button />
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;