import axios from "axios";

export const getBarangs = async () => {
  try {
    const response = await axios.get("/api/barangs");
    return response.data;
  } catch (error) {
    console.error("Error fetching barangs:", error);
    throw error;
  }
};

export const createBarang = async (barang) => {
  try {
    const response = await axios.post("/api/barangs", barang);
    return response.data;
  } catch (error) {
    console.error("Error creating barang:", error);
    throw error;
  }
};

export const updateBarang = async (id, barang) => {
  try {
    const response = await axios.put(`/api/barangs/${id}`, barang);
    return response.data;
  } catch (error) {
    console.error("Error updating barang:", error);
    throw error;
  }
};

export const deleteBarang = async (id) => {
  try {
    await axios.delete(`/api/barangs/${id}`);
  } catch (error) {
    console.error("Error deleting barang:", error);
    throw error;
  }
};