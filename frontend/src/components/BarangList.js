import React from "react";
import { Box, Button, Heading, Text, VStack, HStack, StackDivider } from "@chakra-ui/react";
// import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const BarangList = ({ barangs, onDelete, onEdit }) => {
  return (
    <VStack spacing={4} align="stretch" divider={<StackDivider borderColor="gray.200" />}>
      {barangs.length === 0 ? (
        <Text align="center" color="gray.500">Tidak ada barang.</Text>
      ) : (
        barangs.map((barang) => (
          <Box key={barang._id} borderWidth="1px" borderRadius="md" p={4} boxShadow="md">
            <Heading size="md" mb={2}>{barang.title}</Heading>
            <Text mb={4}>{barang.content}</Text>
            <HStack spacing={2}>
              <Button size="sm" colorScheme="blue" onClick={() => onEdit(barang)}>
                Edit
              </Button>
              <Button size="sm" colorScheme="red" onClick={() => onDelete(barang._id)}>
                Hapus
              </Button>
            </HStack>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default BarangList;