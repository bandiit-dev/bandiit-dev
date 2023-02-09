import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./style.css";

const Footer = () => {
  const linkedinUrl = "https://www.linkedin.com/in/igormiguelbs/";
  const githubUrl = "https://github.com/igormiguelbs";
  return (
    <footer>
      <p>igormiguelbs@gmail.com</p>
      <Link to={githubUrl}>
        <FontAwesomeIcon icon={faGithub} />
      </Link>
      <Link to={linkedinUrl}>
        <FontAwesomeIcon icon={faLinkedin} />
      </Link>
    </footer>
  );
};

export default Footer;
