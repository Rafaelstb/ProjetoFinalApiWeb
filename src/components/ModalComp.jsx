import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [senha, setSenha] = useState(dataEdit.senha || "");
    const [codigo, setCodigo] = useState(dataEdit.codigo || "");
    const [telefone, setTelefone] = useState(dataEdit.telefone || "");
    const [endereco, setEndereco] = useState(dataEdit.endereco || "");
    const [funcao, setFuncao] = useState(dataEdit.funcao || "");
    const handleSave = () => {
      if (!name || !email || !senha || !codigo ||!telefone ||!endereco ||!funcao) return;
  
      if (emailAlreadyExists()) {
        return alert("E-mail já cadastrado!");
      }
  
      if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = { name, email, senha, codigo, telefone, endereco, funcao};
      }
  
      const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { name, email, senha, codigo, telefone, endereco,funcao}]
        : [...(data ? data : [])];
  
      localStorage.setItem("cad_func", JSON.stringify(newDataArray));
  
      setData(newDataArray);
  
      onClose();
    };
  
    const emailAlreadyExists = () => {
      if (dataEdit.email !== email && data?.length) {
        return data.find((item) => item.email === email);
      }
  
      return false;
    };
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastro de Funcionários da Infosupri</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl display="flex" flexDir="column" gap={1}>
                <Box>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>              
                <Box>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Codigo Funcionário</FormLabel>
                  <Input
                    type="codigo"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>telefone</FormLabel>
                  <Input
                    type="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Endereço</FormLabel>
                  <Input
                    type="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Função</FormLabel>
                  <Input
                    type="funcao"
                    value={funcao}
                    onChange={(e) => setFuncao(e.target.value)}
                  />
                </Box>
              </FormControl>
            </ModalBody>
  
            <ModalFooter justifyContent="start">
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                SALVAR
              </Button>
              <Button colorScheme="blue" onClick={onClose}>
                FECHAR
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalComp;
  