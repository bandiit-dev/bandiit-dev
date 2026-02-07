import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import "./style.css";

const Footer = () => {
  const mailUrl = "mialto:igor@bandiit.dev.br";
  const githubUrl = "https://github.com/bandiit-dev";
  return (
    <footer>
      <p>CNPJ: 49.688.273/0001-60</p>
      <Link to={githubUrl}>
        <FontAwesomeIcon icon={faGithub} />
      </Link>
      <Link to={mailUrl}>
        <FontAwesomeIcon icon={faEnvelope} />
      </Link>
    </footer>
  );
};

export default Footer;
