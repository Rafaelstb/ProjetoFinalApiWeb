import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_func")
      ? JSON.parse(localStorage.getItem("cad_func"))
      : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);

    localStorage.setItem("cad_func", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="10px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="90%" h="90vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          Cadastro de funcinário da INFOSUPRI
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="7px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px">
                  E-Mail
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px">
                  Senha
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px">
                  Código
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px">
                  Telefone
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px">
                  Endereço
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px">
                  Função
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, email, senha, codigo, telefone, endereco, funcao }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{senha}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{codigo}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{telefone}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{endereco}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{funcao}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={15}
                      onClick={() => [
                        setDataEdit({ name, email, senha, codigo, telefone, endereco, funcao,  index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={15}
                      onClick={() => handleRemove(email)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
