import { Link, useLocation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";

const Cart = () => {
    const {products, error, isLoading} = useOutletContext();
    const location = useLocation();

    if (error) return <><h2>Error loading data</h2><p>Please try reloading the page.</p></>;
    if (isLoading) return <h2>Loading...</h2>

    const cartProducts = products.filter(product => product.cartQuantity > 0);

    if (cartProducts.length === 0) return (<>
        <h2>Your cart is empty!</h2>
        {location.pathname === "/shop" ? (
            <p>Add a product to your cart to see it here</p>
        ) : (
            <>
                <p>Visit our shop and add what you like to your cart.</p>
                <Link to="/shop">Visit Shop</Link>
            </>
        )}
    </>);


    return (<>
        <h2>Cart total: ${Intl.NumberFormat().format(cartProducts.reduce((sum, product) => sum + product.price * product.cartQuantity, 0))}</h2>
        <Link to="/thank-you">Go to Checkout</Link>
        {location.pathname !== "/cart" && 
            <Link to="/cart">Go to Cart</Link>
        }
        {cartProducts.map(product => 
            <ProductCard key={product.id} product={product} inCart={true}/>
        )}
    </>);
}

export default Cart;