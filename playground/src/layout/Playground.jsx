import React, { useState } from 'react';
import {   Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,Code, Button, Text, Heading, Flex, Textarea,  Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { Tokenizer } from '../toy-lang/tokenizer';
import { Parser } from '../toy-lang/parser';
import { Interpretter } from '../toy-lang/interpretter';
import ReactJson from 'react-json-view'

function Playground() {
  const [value, setValue] = useState('x = 2+2;\ny = 12+x;\nt = x+y;');
  const [error,setError] = useState();
  const [tokens, setTokens] = useState();
  const [parseTree, setParseTree] = useState();
  const [interpreterResult, setInterpreter] = useState();

  const handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const handleRun = () => {
    setError('')
    setInterpreter()
    if (value !== '') {
      let generatedTokens = generateTokens()
      let generatedPT = generateParseTree(generatedTokens)
      runInterpretter(generatedPT)  
    }
  }

  const generateTokens = () => {
    try {
      const tokenizer = new Tokenizer();
      tokenizer.tokenize(value);
      const generatedTokens = tokenizer.readTokens();
      setTokens(generatedTokens)
      return generatedTokens  
    } catch (error) {
      console.log(error);
      setError(error.message)
      setTokens()
      setParseTree()
      setInterpreter()
    }
  }

  const generateParseTree = (generatedTokens) => {
    try {
      const parser = new Parser(generatedTokens);
      parser.startParser()
      const parset = parser.readProgram()
      setParseTree(parset)
      return parset  
    } catch (error) {
      console.log(error);
      setError(error.message)
      setTokens()
      setParseTree()
      setInterpreter()
    }
  }

  const runInterpretter = (generatedPT) => {
    try {
      const interpretter = new Interpretter(generatedPT);
      interpretter.run()
      const test = interpretter.read_values()
      printResults(test)  
    } catch (error) {
      console.log(error);
      setError(error.message) 
      setTokens()
      setParseTree()
      setInterpreter()
    }
  }

  const printResults = (test) => {
    const res = Object.entries(test).map(([key, value]) => (<Code m="0.5">{`${key} = ${value}`}</Code>))
    setInterpreter(res)
  }

  const clearTextArea = ()=>{
    setValue('')
    setError()
    setTokens()
    setParseTree()
    setInterpreter()
  }

  return (
          <>
          <Box mt={20}>
            <Box textAlign='center'>
              <Heading>Toy Language</Heading>
              <Text fontSize='xl'>
                Simple interpreter example written in JavaScript.
              </Text>
            </Box>

            <Flex color='white' my={6}>
              <Flex w='100%' direction='column' mx={3}>
                <Textarea
                lineHeight={'150%'}
                  color={'black'}
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Write Your Code!' w="100%" h='500px'
                />
                <Flex my={2}>
                <Button onClick={handleRun} w={100} color={'black'} mr={3}>Run</Button>
                  <Button onClick={clearTextArea} colorScheme='orange' mr={3} w={100} >Clear</Button>
                </Flex>
              </Flex>

              <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' w="60%" h={'500px'} mx={3}>
                <Tabs color='black'>
                  <TabList display='flex' justifyContent='center'>
                    <Tab>Result</Tab>
                    <Tab>Tokens</Tab>
                    <Tab>Parse Three</Tab>
                  </TabList>

                  <TabPanels h={'100%'}>
                    <TabPanel>
                      {
                        interpreterResult &&
                        <Box display='flex' flexDirection="column">
                          {interpreterResult}
                        </Box>
                      }
                      {error && <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error</AlertTitle>
                  </Alert>}
                    </TabPanel>
                    <TabPanel>
                      <Box overflowY='auto' h={425}>
                        {
                          tokens &&
                          <ReactJson  
                            displayObjectSize={false} 
                            displayDataTypes={false} 
                            quotesOnKeys={false} 
                            enableClipboard={false} 
                            src={tokens} 
                          />
                        }
                        {error &&
                          <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle>Error</AlertTitle>
                          </Alert>
                        }
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box overflowY='auto' h={425}>
                        {
                          parseTree &&
                          <ReactJson 
                            displayObjectSize={false} 
                            displayDataTypes={false} 
                            quotesOnKeys={false} 
                            enableClipboard={false} 
                            src={parseTree} 
                          />
                        }
                        {error &&
                           <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle>Error</AlertTitle>
                          </Alert>
                        }
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Flex>
          </Box>
          </>
  );
}

export default Playground;
