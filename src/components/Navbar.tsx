import bag from "@assets/images/bag.svg";
import logo from "@assets/images/logo.png";
import smallLogo from "@assets/images/small-logo.png";
import { useTypedSelector } from "@hooks/useTypeSelector";
import { IoIosArrowDown } from "react-icons/io";

function Navbar() {
  const { isPageProduct, address, totalItemInBag } = useTypedSelector(
    (states) => states.zeStates
  );

  return (
    <nav className="navbar">
      <div className="container">
        <div className="main d-flex justify-content-between align-items-center">
          <div
            className={
              isPageProduct ? "small-logo p-2 address-content" : "logo"
            }
          >
            <img
              src={isPageProduct ? smallLogo : logo}
              alt="Zé Delivery"
              className="img-fluid"
            />
            {isPageProduct && (
              <div className="address">
                <p className="text-white">Receber agora em</p>
                <p className="text-primary">{address.place_name}</p>
              </div>
            )}
            {isPageProduct && <IoIosArrowDown size={20} color="#fff" />}
          </div>
          {isPageProduct && (
            <div className="search-product px-2 mr-4">
              <input
                className="form-control"
                placeholder="Pesquisar sua bebida favorita"
              />
            </div>
          )}
          <button type="button">entrar</button>
          {isPageProduct && (
            <div className="ml-1 bag">
              <div className="count text-primary">
                <small>{totalItemInBag}</small>
              </div>
              <img src={bag} alt="Sacola" width={40} className="img-fluid" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
