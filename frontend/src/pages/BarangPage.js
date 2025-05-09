import React, { useState, useEffect, useCallback } from "react";
import { Container, VStack, Heading, useToast, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, } from "@chakra-ui/react";
import BarangForm from "../components/BarangForm";
import BarangList from "../components/BarangList";
import * as barangService from "../services/barangService"; //penghubung dengan backend.

const Barangspage = () => {
  const [barangs, setBarangs] = useState([]);
  const [editingBarang, setEditingBarang] = useState(null);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchBarangs = useCallback(async () => {
    try {
      const fetchedBarang = await barangService.getBarangs();
      setBarangs(fetchedBarang);
    } catch (error) {
      toast({
        title: "Gagal mengambil barang dari server",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchBarangs();
  }, [fetchBarangs]);

  const handleAddBarang = async (barangData) => {
    try {
      if (barangData._id) {
        // Proses update
        const updatedBarang = await barangService.updateBarang(barangData._id, {
          title: barangData.title,
          content: barangData.content,
        });

        // Update barangs di state
        setBarangs(barangs.map((barang) => (barang._id === barangData._id ? updatedBarang : barang)));

        // Reset editing
        setEditingBarang(null);

        toast({
          title: "Barang diperbarui",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Proses tambah barang baru
        const newBarang = await barangService.createBarang(barangData);
        setBarangs([newBarang, ...barangs]);

        toast({
          title: "Barang berhasil ditambahkan",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      onClose(); //tutup modal setelah submit berhasil
    } catch (error) {
      toast({
        title: "Gagal menyimpan barang",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteBarang = async (id) => {
    try {
      await barangService.deleteBarang(id);
      setBarangs(barangs.filter((barang) => barang._id !== id));

      // Reset editing jika barang yang dihapus sedang diedit
      if (editingBarang && editingBarang._id === id) {
        setEditingBarang(null);
      }

      toast({
        title: "Barang telah dihapus",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Gagal menghapus barang",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditBarang = (barang) => {
    setEditingBarang(barang);
    onOpen();
  };

  const handleOpenAdd = () => {
    setEditingBarang(null);
    onOpen();
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} width="full">
        <Heading>Aplikasi Barang Sederhana</Heading>

        <Button colorScheme="blue" onClick={handleOpenAdd}>
          Tambah Barang
        </Button>

        <BarangList barangs={barangs} onDelete={handleDeleteBarang} onEdit={handleEditBarang} />
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingBarang ? "Edit Barang" : "Tambah Barang"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <BarangForm onSubmit={handleAddBarang} initialBarang={editingBarang} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Barangspage;