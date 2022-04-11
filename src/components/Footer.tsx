import logo from "@assets/images/logo.png";
import footerImage from "@assets/images/maluma_baixo_desktop.png";
import { useTypedSelector } from "@hooks/useTypeSelector";
import { useCallback } from "react";

function Footer() {
  const scrollTop = useCallback(() => {
    document.body.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  const { isPageProduct } = useTypedSelector((state) => state.zeStates);

  return (
    <footer className="footer">
      {!isPageProduct && (
        <>
          <h2 className="text-center title text-primary">Zé Delivery</h2>
          <figure>
            <img src={footerImage} alt="Maluma" />
          </figure>
        </>
      )}
      <div className="middle-footer text-center bg-light-secondary">
        <button type="button" className="btn text-white" onClick={scrollTop}>
          Voltar ao topo
        </button>
      </div>
      <div className="end-footer bg-secondary">
        <img src={logo} alt="Zé Delivery" className="img-fluid" />
        <p className="text-white">Desenvolvido por: Uisma Lopes</p>
      </div>
    </footer>
  );
}

export default Footer;
