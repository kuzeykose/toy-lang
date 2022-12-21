import React, { useState } from 'react';
import './App.css';
import {
  Table,
  Center,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Box, Heading, Text, ChakraProvider, Divider, Code
} from '@chakra-ui/react'
import Playground from './layout/Playground'

function App() {

  const ruleSet = [
    { name: 'Program:', value: 'Assignment*' },
    { name: 'Assignment:', value: 'Identifier = Exp;' },
    { name: 'Exp:', value: 'Exp + Term | Exp - Term | Term' },
    { name: 'Term:', value: 'Term * Fact  | Fact' },
    { name: 'Fact:', value: '( Exp ) | - Fact | + Fact | Literal | Identifier' },
    { name: 'Identifier:', value: 'Letter [Letter | Digit]*' },
    { name: 'Letter:', value: 'a|...|z|A|...|Z|_' },
    { name: 'Literal:', value: '0 | NonZeroDigit Digit*' },
    { name: 'NonZeroDigit:', value: '1|...|9' },
    { name: 'Digit:', value: '0|1|...|9' },
  ]

  return (
    <div className="App">
      <title>TITLE </title>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 12px' }}>
        <ChakraProvider>
          <Playground />
          <Divider my={12} />
          <Box textAlign='center' mb={20}>
            <Heading>Rule Set</Heading>
            <Text fontSize='l'>
              The following defines a simple language, in which a program consists of assignments and each variable is assumed to be of the integer type. For the sake of simplicity, only operators that give integer values are included.
            </Text>
            <Box borderRadius='lg' w={'70%'} textAlign='start' p={6} mx='20%'>
              <Table variant='simple'>
                <Center>
                  <Tbody>
                    {ruleSet.map(item => (
                      <Tr>
                        <Td>
                          <Code>{item.name}</Code>
                        </Td>
                        <Td>
                          <Code>{item.value}</Code>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Center>
              </Table>
            </Box>
          </Box>
        </ChakraProvider>
      </div >
    </div >
  );
}

export default App;
