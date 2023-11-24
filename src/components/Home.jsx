import styles from "../styles/Home.module.css";

const Home = () => {
    return (
        <main>
            <section className={styles.heroSection}>
                <div className="hero-text">
                    <h2>Hero Text</h2>
                    <p>Some more text</p>
                    <button className="cta">CTA</button>
                </div>
                <div className="img-container">
                    <img src="https://via.placeholder.com/300/771796" alt="placeholder" />
                </div>
            </section>
        </main>
    );
};

export default Home;