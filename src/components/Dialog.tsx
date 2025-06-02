import style from "../styles/Dialog.module.css";

interface DialogProps {
    open: boolean;
    title: string;
    interaction: "addToCart" | "removeFromCart";
    onConfirm?: (e: React.MouseEvent<HTMLButtonElement> | number) => void;
    onCancel?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const Dialog : React.FC<DialogProps> = (props) => {
    const { interaction, title, onConfirm, onCancel, open } = props;

    if(!open) return null;
  return (
    <div className={style.backdrop} onClick={onCancel}>
        <div className={style.dialog}>
            <h1>Are You sure?</h1>
            {interaction === "addToCart" ? (
                <p>Do you want to add <strong>{title}</strong> in your cart?</p>
            ) : (
                <p>Do you want to remove <strong>{title}</strong> in your cart?</p>
            )}
            <div className={style.buttons}>
                <button className="button_50" onClick={onCancel}>Cancel</button>
                <button className="button_50" onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default Dialog
