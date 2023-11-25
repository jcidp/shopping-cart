import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";

const cart = [
    {productId: 1, quantity: 4},
    {productId: 2, quantity: 1},
    {productId: 3, quantity: 6},
];

const Cart = () => {
    const [products, error, isLoading] = useOutletContext();

    const cartProducts = cart.map(cartProduct => {
        return {
            ...products[cartProduct.productId - 1], 
            quantity: cartProduct.quantity,
        };
    });

    if (error) return <><h2>Error loading data</h2></>;
    if (isLoading) return <h2>Loading...</h2>
    if (cart.length === 0) return (<>
        <h2>Your cart is empty!</h2>
        <p>Visit our shop and add what you like to your cart.</p>
        <Link to="/shop">Visit Shop</Link>
    </>);

    return (<>
        <h2>Your cart!</h2>
        <button>Go to Checkout</button>
        {cartProducts.map(product => 
            <ProductCard key={product.id} product={product} />
        )}
    </>);
}

export default Cart;