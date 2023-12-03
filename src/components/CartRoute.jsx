import { useOutletContext } from "react-router-dom";
import Cart from "./Cart";

const CartRoute = () => {
    const {products, error, isLoading, handleAddToCart, handleRemoveFromCart} = useOutletContext();

    return <Cart products={products} error={error} isLoading={isLoading} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart}/>
};

export default CartRoute;