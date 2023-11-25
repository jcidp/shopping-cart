import { useOutletContext } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

const ProductCard = ({product}) => {
    const [quantity, setQuantity] = useState(product.cartQuantity || 1);
    const [isEditing, setIsEditing] = useState(false);
    const {handleAddToCart, handleRemoveFromCart} = useOutletContext();

    const handleInput = (e) => {
        setQuantity(e.target.value);
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleConfirm = (e) => {
        handleAddToCart(e);
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
                {product.cartQuantity > 0 && !isEditing ? (
                    <span>{quantity}</span>
                ) : (
                    <input id={`qty-${product.id}`} type="number" value={quantity} onChange={handleInput} />
                )}
                {product.cartQuantity === 0 ? (
                    <button data-product-id={product.id} onClick={handleAddToCart}>Add to cart</button>    
                ) : isEditing ? (<>
                    <button data-product-id={product.id} onClick={handleConfirm}>Confirm</button>    
                    <button data-product-id={product.id} onClick={handleCancel}>Cancel</button>    
                </>) : (
                    <button data-product-id={product.id} onClick={toggleEdit}>Edit</button>    
                )}
                {product.cartQuantity > 0 && 
                    <button data-product-id={product.id} onClick={handleRemoveFromCart}>Remove from cart</button>
                }
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object,
}

export default ProductCard;