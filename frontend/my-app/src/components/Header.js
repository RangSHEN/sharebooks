//import {Link} from "react-router-dom";
import "../css&&scss/Header.scss"
import {Link, useNavigate} from "react-router-dom";
import {AUTH_TOKEN_KEY} from "../App";

//permet le component afficher ou masquer le menu
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const Header = ({userInfo, setUserInfo}) => {


    // return <div>
    //     <Link to="listBooks">Livres disponibles</Link>
    //     <Link to="myBooks">Mes livres</Link>
    //     <Link to="myBorrows">Mes emprunts</Link>
    // </div>
    const history = useNavigate()
    const signout =()=> {
        setUserInfo(null)
        sessionStorage.removeItem(AUTH_TOKEN_KEY)
        history('/login')
    }
    // const signout = () => {
    //   axios.post('/logout').then(response=> {
    //       setUserInfo(null)
    //       history('/login')
    //   })
    // }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mr-auto me-auto">
                        <Link className="nav-link" to="/myBooks">Mes livres</Link>
                        <Link className="nav-link" to="/myBorrows">Mes emprunts</Link>
                        <Link className="nav-link" to="/listBooks">Livres disponibles</Link>
                    </div>
                    <div className="navbar-nav d-flex align-items-center">
                        <div className="me-2">Bienvenue, {userInfo}</div>
                        <button type="button" variant="secondary" className="btn btn-secondary" onClick={signout}>Se
                            déconnecter
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;