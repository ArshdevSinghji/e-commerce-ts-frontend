import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard';
import style from '../styles/Home.module.css';
import Pagination from '../components/Pagination';
import { fetchData, type Products } from '../services/productAPI';

const Home = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<Products[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
    setLoading(true);
    fetchData(currentPage, PAGE_SIZE, setProduct, setTotal, setLoading);
    }, [currentPage]);

    const handlePrev = () => {
        setCurrentPage(prev => prev - 1);
    }

    const handleNext = () => {
        setCurrentPage(prev => prev + 1);
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const PAGE_SIZE = 10;
    const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    loading ? (
        <FontAwesomeIcon className = "loading" icon={faCircleNotch} spin/>
    ) : ( 
        <div className={style.container}>
            <div className={style.productContainer}>
                {product.map((item) => (
                    <ProductCard
                        key = {item.id} 
                        id = {item.id}
                        title = {item.title} 
                        price = {item.price} 
                        brand = {item.brand} 
                        thumbnail = {item.thumbnail}/>
                ))}
            </div>
            <Pagination
                total = {totalPages}
                currentPage = {currentPage}
                handleNext = {handleNext}
                handlePrev = {handlePrev}
                handlePageChange = {handlePageChange}/>
        </div>
        )
    );
}

export default Home
