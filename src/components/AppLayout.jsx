import { Link, Outlet } from "react-router-dom";
import styles from "../styles/AppLayout.module.css";
import useFetchAPI from "../hooks/useFetchAPI";
import { useEffect, useState } from "react";

function AppLayout() {
    const [products, setProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const {data, error, isLoading} = useFetchAPI();

    useEffect(() => {
        if(data) {
            console.log("Setting products up");
            setProducts(data.map(product => ({...product, cartQuantity: 0})));
        }
    }, [data])

    const handleAddToCart = (e, isEdit) => {
        const id = +e.target.dataset.productId;
        const quantity = +document.getElementById(`qty-${id}-${isEdit ? "cart" : ""}`).value;
        setProducts(products.map(product => {
            const newQuantity = isEdit ? quantity : product.cartQuantity + quantity;
            if (product.id !== id) return product;
            return {...product, cartQuantity: newQuantity};
        }));
    };

    const handleRemoveFromCart = (e) => {
        const id = +e.target.dataset.productId;
        setProducts(products.map(product => {
            if (product.id !== id) return product;
            return {...product, cartQuantity: 0}
        }));
    };

    const toggleShowCart = () => setShowCart(!showCart);

    return (<>
        <header className={styles.header}>
            <h1><Link to="/">MyShop</Link></h1>
            <nav className={styles.nav}>
                <ul className={styles.navMenu}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li className={styles.centerContent}>
                        <button className={styles.cart} onClick={toggleShowCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cart-outline</title><path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" /></svg>
                            <span className={styles.cartItems}>{products.reduce((sum, product) => sum + product.cartQuantity, 0)}</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
        <main className={styles.main}>
            <Outlet context={{products, error, isLoading, showCart, handleAddToCart, handleRemoveFromCart, setShowCart}} />
        </main>
        <footer className={styles.footer}>
            <a className={styles.anchor} href="https://github.com/jcidp" target="_blank" rel="noreferrer">Built by jcidp
            <div className={styles.underline}></div>
            <svg className={styles.icon} viewBox="0 0 128 128">
                <path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
            </svg>
            </a>  
        </footer>
    </>);
}

export default AppLayout;