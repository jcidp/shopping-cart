import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
    return (
        <section className={styles.heroSection}>
            <div className="hero-text">
                <h2>Hero Text</h2>
                <p>Some more text</p>
                <Link to="/shop">
                    <button className="cta">CTA</button>
                </Link>
            </div>
            <div className="img-container">
                <img src="https://via.placeholder.com/300/771796" alt="placeholder" />
            </div>
        </section>
    );
};

export default Home;