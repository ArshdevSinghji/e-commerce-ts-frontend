import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { fecthProductById, type Product } from "../services/productAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/Product.module.css";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cart/cartSlice";

const ProductDiscription : React.FC = () => {
    const dispatch = useAppDispatch();

    const location = useLocation();
    const id : number = location.state

    const [productByID, setProductByID] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      fecthProductById(id, setProductByID, setLoading);
    }, []);

    const handleCart = () => {
      if(!productByID) return;
      dispatch(addToCart({
        title: productByID.title,
        price: productByID.price,
        image: productByID.thumbnail
      }))
    }

  return (
    loading ? (
        <FontAwesomeIcon className = "loading" icon={faCircleNotch} spin/>
      ) : ( 
      <>
        <div className={style.product}>
          <img src={productByID?.images[0]} alt={productByID?.title} />
          <div>
            <p><span className={style.price}>${productByID?.price}</span></p>
            <p className={style.title}>{productByID?.title}</p>
            {productByID?.brand && <span className={style.brand}>{productByID?.brand}</span>}
            <p>{productByID?.description}</p>
            <button className="button_50" onClick={handleCart}>Add to cart</button>
          </div>
        </div>
        <button className="button_50 back" onClick={() => window.history.back()}>Back</button>
      </>
    )
  );
}

export default ProductDiscription
