import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { RiFileCopyLine } from 'react-icons/ri';
import { PasswordGenerator } from '../lib/PasswordGenerator';
import Header from '../components/Header';
import Page from '../components/Page';
import Form from '../components/Form';
import Footer from '../components/Footer';

export default function Home() {
  const [
    generatedPasswordSectionIsOpen,
    setGeneratedPasswordSectionIsOpen,
  ] = useState<boolean>(false);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  const toast = useToast();

  const openGeneratedPasswordSection = ():void => {
    if (!generatedPasswordSectionIsOpen) {
      setGeneratedPasswordSectionIsOpen(true);
    }
  };

  const generatePassword = (
    passwordType: string,
    charactersQuantity: number | null,
  ): void => {
    const acceptableTypes = {
      ALPHA: 'alpha',
      NUMERIC: 'numeric',
    };
    const passwordGenerators = {
      [acceptableTypes.ALPHA]: PasswordGenerator.generateAlphanumeric,
      [acceptableTypes.NUMERIC]: PasswordGenerator.generateNumeric,
    };

    const generator = passwordGenerators[passwordType];

    const newPassword = generator(charactersQuantity);

    setGeneratedPassword(newPassword);

    openGeneratedPasswordSection();
  };

  const copyPasswordGeneratedToClipboard = (): void => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      toast({
        description: 'A senha gerada foi copiada para a área de transferência!',
        duration: 5000,
      });
    }
  };

  return (
    <Page>
      <Head>
        <title>medaumasenha - Gerador de senhas</title>
      </Head>
      <Header />
      <Center>
        <VStack w={['100%', 560]} py="16" spacing="8">
          <Heading color="blue.600" fontSize="2xl">Gere sua nova senha agora</Heading>
          <Text>Gerador de senha moderno e seguro</Text>

          <Form onSubmit={generatePassword} />

          { generatedPasswordSectionIsOpen && (
            <Box
              w="100%"
              h="10"
              border="1px"
              borderColor="gray.500"
              borderRadius={['5px', '10px']}
            >
              <HStack h="100%" px="4" justify="center">
                <Text>{generatedPassword}</Text>
                <Spacer />
                <Button
                  data-testid="copy-to-clipboard-button"
                  color="gray.500"
                  variant="outline"
                  border="none"
                  onClick={copyPasswordGeneratedToClipboard}
                  _hover={{
                    bgColor: null,
                  }}
                >
                  <RiFileCopyLine fontSize={24} />
                </Button>
              </HStack>
              <Text
                fontSize={[10, 12]}
                color="gray.500"
                mt="2"
              >
                Clique no botão para copiar e cole onde desejar
              </Text>
            </Box>
          ) }
        </VStack>
      </Center>
      <Footer />
    </Page>
  );
}
