import { useState } from "react";
import { removeFromCart } from "../redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import style from "../styles/Cart.module.css";
import Dialog from "../components/Dialog";

const Cart = () => {
  const cart = useAppSelector((state) => state.perisitedReducer.cart);
  const dispatch = useAppDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [itemIndex, setItemIndex] = useState<number | null>(null);

  const handleRemove = (n: number) => {
    setItemIndex(n);
    setOpenDialog(true);
  };

  const handleConfirm = (index: number) => {
    dispatch(removeFromCart(index));
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      {cart.items.length === 0 ? (
        <div className={style.emptyCart}>
          <h2>Your cart is empty</h2>
          <p>Add items to your cart to see them here.</p>
        </div>
      ) : (
        <table className={style.cartTable}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>
                  <p>{item.title}</p>
                </td>
                <td>
                  <p>${item.price}</p>
                </td>
                <td>
                  <button
                    className="button"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="button_50 back" onClick={() => window.history.back()}>
        Back
      </button>
      {openDialog && (
        <Dialog
          open={openDialog}
          title={cart.items[itemIndex!]?.title || ""}
          interaction="removeFromCart"
          onConfirm={() => {
            if (itemIndex !== null) handleConfirm(itemIndex);
          }}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Cart;
