import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { fecthProductById, type Product } from "../services/productAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/Product.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart } from "../redux/cart/cartSlice";
import { fetchProductById } from "../redux/thunk/productSlice";

const ProductDiscription: React.FC = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const id: number = location.state;

  // const [product, setProductByID] = useState<Product | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  const product = useAppSelector((state) => state.product);

  useEffect(() => {
    // fecthProductById(id, setProductByID, setLoading);
    dispatch(fetchProductById(id));
  }, []);

  const handleCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        title: product.title,
        price: product.price,
        image: product.thumbnail,
      })
    );
  };

  return product.isLoading ? (
    <FontAwesomeIcon className="loading" icon={faCircleNotch} spin />
  ) : (
    <>
      <div className={style.product}>
        <img src={product?.thumbnail} alt={product?.title} />
        <div>
          <p>
            <span className={style.price}>${product?.price}</span>
          </p>
          <p className={style.title}>{product?.title}</p>
          {product?.brand && (
            <span className={style.brand}>{product?.brand}</span>
          )}
          <p>{product?.description}</p>
          <button className="button_50" onClick={handleCart}>
            Add to cart
          </button>
        </div>
      </div>
      <button className="button_50 back" onClick={() => window.history.back()}>
        Back
      </button>
    </>
  );
};

export default ProductDiscription;
