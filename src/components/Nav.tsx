import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/Nav.module.css";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const Nav = () => {
  const count = useAppSelector(
    (state) => state.perisitedReducer.cart.items.length
  );
  const user = useAppSelector((state) => state.perisitedReducer.auth.user);
  return (
    <>
      <nav>
        <div>
          <h1>Product Store</h1>
        </div>
        <div>
          <div className={style.cart}>
            <Link to={"/cart"}>
              <FontAwesomeIcon className={style.icon} icon={faCartShopping} />
            </Link>
            <span
              className={`${style.cartCount} ${
                count === 0 ? style.hidden : ""
              }`}
            >
              {count}
            </span>
          </div>
          <p>{user?.username}</p>
        </div>
      </nav>
      <hr />
      <Outlet />
    </>
  );
};

export default Nav;
