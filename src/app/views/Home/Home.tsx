import { Footer } from "../../components/Footer";
import "./style.css";

const Home = () => {
  return (
    <>
      <section className="homesecs">
        <div className="content">
          <h2>Hello world, we are...</h2>
          <h1>Bandiit.dev</h1>
          <div className="textcontent">
            <span></span>
            <p>
              Hello, we’re <strong>Bandiit.dev</strong> — a 3-year-old product
              and engineering studio specializing in modern front-end
              development with JavaScript, React, and TypeScript. We help
              technology and marketing teams ship fast, scalable,
              high-performing web experiences that convert.
            </p>
            <p>
              We’re known for clear communication, strong ownership, and
              reliable delivery. From planning to release, we focus on building
              polished interfaces, maintaining clean codebases, and continuously
              improving performance and UX so your project moves forward with
              confidence.
            </p>
          </div>
        </div>
      </section>
      <div className="tk-blob">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 747.2 726.7">
          <path d="M539.8 137.6c98.3 69 183.5 124 203 198.4 19.3 74.4-27.1 168.2-93.8 245-66.8 76.8-153.8 136.6-254.2 144.9-100.6 8.2-214.7-35.1-292.7-122.5S-18.1 384.1 7.4 259.8C33 135.6 126.3 19 228.5 2.2c102.1-16.8 213.2 66.3 311.3 135.4z"></path>
        </svg>
      </div>
      <Footer />
    </>
  );
};

export default Home;
