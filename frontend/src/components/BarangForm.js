import React, { useEffect, useState, useRef } from "react";
import { Box, FormControl, FormLabel, Input, Textarea, Button, VStack, Spinner } from "@chakra-ui/react";

const BarangForm = ({ onSubmit, initialBarang = null }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const titleInputRef = useRef(null);

  // Efek untuk memperbarui form saat initialBarang berubah
  useEffect(() => {
    if (initialBarang) {
      setTitle(initialBarang.title || "");
      setContent(initialBarang.content || "");
    } else {
      // Reset form jika tidak ada initialBarang
      setTitle("");
      setContent("");
    }

    // autofocus
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [initialBarang]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validasi sederhana
    if (title.trim().length <3) {
      alert("Nama barang minimal 3 karakter.");
      return;
    }

    setLoading(true);
    await onSubmit({
      title,
      content,
      _id: initialBarang ? initialBarang._id : undefined,
    });
    setLoading(false);

    // Reset form setelah submit
    if (!initialBarang) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="barang-form">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nama Barang</FormLabel>
          <Input
            ref={titleInputRef}
            value={title}
            onChange={ (e) => setTitle(e.target.value)}
            placeholder="Masukkan nama barang"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Deskripsi keperluan barang</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Deskripsi keperluan barang"
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" isFullWidth isLoading={loading}>
          {initialBarang ? "Update" : "Simpan"}
        </Button>
      </VStack>
      
    </form>
  );
};

export default BarangForm;