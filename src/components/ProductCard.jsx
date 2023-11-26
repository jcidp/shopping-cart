import { useOutletContext } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

const ProductCard = ({product, inCart}) => {
    const [quantity, setQuantity] = useState(product.cartQuantity || 1);
    const [isEditing, setIsEditing] = useState(false);
    const {handleAddToCart, handleRemoveFromCart, setShowCart} = useOutletContext();

    const handleInput = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddWithShowCart = (e) => {
        handleAddToCart(e);
        setShowCart(true);
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleConfirm = (e) => {
        handleAddToCart(e, true);
        toggleEdit();
    };

    const handleCancel = () => {
        setQuantity(product.cartQuantity);
        toggleEdit();
    };

    return(
        <div className={styles.product}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={product.image} alt={product.title} />
            </div>
            <div className="productInfo">
                <p>{product.title}</p>
                <span>${product.price}</span>
                {inCart && !isEditing ? (
                    <span>{quantity}</span>
                ) : (
                    <input className={styles.quantityInput} id={`qty-${product.id}-${inCart ? "cart" : ""}`} type="number" value={quantity} onChange={handleInput} />
                )}
                {!inCart? (
                    <button data-product-id={product.id} onClick={handleAddWithShowCart}>Add to cart</button>    
                ) : isEditing ? (<>
                    <button data-product-id={product.id} onClick={handleConfirm}>Confirm</button>    
                    <button data-product-id={product.id} onClick={handleCancel}>Cancel</button>    
                </>) : (
                    <button data-product-id={product.id} onClick={toggleEdit}>Edit</button>    
                )}
                {inCart && 
                    <button data-product-id={product.id} onClick={handleRemoveFromCart}>Remove from cart</button>
                }
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object,
    inCart: PropTypes.bool,
}

export default ProductCard;