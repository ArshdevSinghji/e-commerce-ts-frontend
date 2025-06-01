import style from "../styles/Dialog.module.css";

interface DialogProps {
    interaction: string;
    title: string;
    open: boolean;
    confirm: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dialog : React.FC<DialogProps> = (props) => {
    const { interaction, setConfirm, setOpen, title } = props;

    const handleConfirm = () => {
        setConfirm(true);
        setOpen(false);
    }

    const handleCancel = () => {
        setConfirm(false);
        setOpen(false);
    }

  return (
    <div className={style.dialog}>
        <h1>Are You sure?</h1>
        {interaction === "addToCart" ? (
            <p>Do you want to add {title} in your cart?</p>
        ) : (
            <p>Do you want to remove {title} in your cart?</p>
        )}
        <div className={style.buttons}>
            <button className="button_50" onClick={handleCancel}>Cancel</button>
            <button className="button_50" onClick={handleConfirm}>Confirm</button>
        </div>
    </div>
  )
}

export default Dialog
