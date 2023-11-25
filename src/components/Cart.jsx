import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";

const Cart = () => {
    const {products, error, isLoading} = useOutletContext();

    if (error) return <><h2>Error loading data</h2></>;
    if (isLoading) return <h2>Loading...</h2>

    const cartProducts = products.filter(product => product.cartQuantity > 0);

    if (cartProducts.length === 0) return (<>
        <h2>Your cart is empty!</h2>
        <p>Visit our shop and add what you like to your cart.</p>
        <Link to="/shop">Visit Shop</Link>
    </>);


    return (<>
        <h2>Your cart!</h2>
        <button>Go to Checkout</button>
        {cartProducts.map(product => 
            <ProductCard key={product.id} product={product}/>
        )}
    </>);
}

export default Cart;