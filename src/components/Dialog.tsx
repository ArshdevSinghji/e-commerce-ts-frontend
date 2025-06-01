import style from "../styles/Dialog.module.css";

interface DialogProps {
    interaction: string;
}

const handleConfirm = () => {
    
}

const handleCancel = () => {
    
}

const Dialog : React.FC<DialogProps> = (props) => {
    const { interaction } = props;
  return (
    <div className={style.dialog}>
        <h1>Are You sure?</h1>
        {interaction === "addToCart" ? (
            <p>Do you want to add this item in your cart?</p>
        ) : (
            <p>Do you want to remove this item in your cart?</p>
        )}
        <div className={style.buttons}>
            <button className="button_50" onClick={handleCancel}>Cancel</button>
            <button className="button_50" onClick={handleConfirm}>Confirm</button>
        </div>
    </div>
  )
}

export default Dialog
