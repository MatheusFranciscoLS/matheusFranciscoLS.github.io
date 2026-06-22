import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container footer-inner">
        <p>© {currentYear} Matheus Francisco.</p>
        <div className="socials">
          <a href="https://linkedin.com/in/matheusfranciscols" target="_blank" rel="noreferrer">
            <i className="devicon-linkedin-plain"></i>
          </a>
          <a href="https://github.com/MatheusFranciscoLS" target="_blank" rel="noreferrer">
            <i className="devicon-github-original"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;