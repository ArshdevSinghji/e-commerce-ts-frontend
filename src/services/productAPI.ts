import { AxiosInstance } from "./AxiosInstance";

export interface Products {
  id: number;
  title: string;
  price: number;
  brand: string;
  thumbnail: string;
}

export const fetchData = async (
  currentPage: number,
  PAGE_SIZE: number,
  setProduct: (products: Products[]) => void,
  setTotal: (total: number) => void,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  try {
    const res = await AxiosInstance.get(
      `?limit=${PAGE_SIZE}&skip=${currentPage * PAGE_SIZE}`
    );
    setTotal(res.data.total);
    setProduct(res.data.products);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
