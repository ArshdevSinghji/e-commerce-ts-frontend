import { useNavigate } from "react-router-dom";
import styles from "../styles/ProductCard.module.css"
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cart/cartSlice";

interface ProductCardProps {
    id: number;
    title: string;
    price: number;
    brand: string;
    thumbnail: string;
}
const ProductCard : React.FC<ProductCardProps> = (props) => {
    const dispatch = useAppDispatch();

    const { id, title, price, brand, thumbnail } = props;
    const navigate = useNavigate();

    const handlePage = () => {
      navigate("/product", {
        state: id
      })
    }

    const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(addToCart({
        title: title,
        price: price,
        image: thumbnail
      }))
      alert("Item added to cart");
    }
    
  return (
    <div className={styles.productCard} onClick={handlePage}>
      <img src={thumbnail} alt={title} />
      <p>{brand}</p>
      <div>
        <span>{title}</span>
        <span>${price}</span>
      </div>
      <button className="button" onClick={handleCart}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
