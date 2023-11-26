import { Link, useOutletContext } from "react-router-dom";
import styles from "../styles/Home.module.css";
import Cart from "./Cart";

const Home = () => {
    const {showCart} = useOutletContext();

    return (
        <div>
            <section className={styles.heroSection}>
                <div className="hero-text">
                    <h2>Hero Text</h2>
                    <p>Some more text</p>
                    <Link className="btn primary" to="/shop">CTA</Link>
                </div>
                <div className="img-container">
                    <img src="https://via.placeholder.com/300/771796" alt="placeholder" />
                </div>
            </section>
            {showCart && 
            <section className={styles.cart}>
                <Cart />
            </section>
            }
        </div>
        
    );
};

export default Home;