import React from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../images/logo.png"
import "../css&&scss/Login.scss"
import axios from "axios";
import {AUTH_TOKEN_KEY} from "../App";
// import Modal from 'react-bootstrap/Modal'
// import {Button} from "react-bootstrap";
import SimpleModal from "./SimpleModal";
class Login extends React.Component {
    constructor() {
        super();
        this.state = {userData: {email:'',password:''}, showModal:false}
        //state not defined


    }

    //normalement sans type de retour sauf render() retrun
    handleChange=(event)=> {
        let currentStateData = {...this.state.userData};
        // [ ] Utiliser la valeur d'une variable comme nom d'une propriété
        currentStateData[event.target.name] = event.target.value;
        this.setState({userData: currentStateData});
    }

    onSubmit=(event)=> {
        event.preventDefault();
        axios.post('/authenticate',{...this.state.userData})
            .then(response=> {
                const bearerToken = response?.headers?.authorization;
                if (bearerToken && bearerToken.slice(0,7) === 'Bearer '){
                    const jwt = bearerToken.slice(7, bearerToken.length);
                    sessionStorage.setItem(AUTH_TOKEN_KEY,jwt)
                }
                this.props.setUserInfo(response.data.userName)
                this.props.history("/myBooks")
            })
            .catch(()=>{
                this.setState({showModal : true})
            })
    }

    handleCloseModal= ()=>{
        this.setState({showModal : false})
    }


    render() {

        const title = "Login incorrect"
        const bodyTxt = "Votre Login ou mot de passe est incorrect"

        return (
            // <> </> permet d'avoir deux partents dans le retourne
            <>
            <div className="login-container">
                <div>
                    <div>
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="title">
                        Bienvenue sur Sharebook!
                    </div>
                    <div className="form-container">
                        {/*on a base des composants il faut faire this*/}
                        <form onSubmit={this.onSubmit}>
                            <span>Email:</span>
                            <input type="text" className="form-control" name="email" value={this.state.userData.email} onChange={this.handleChange}/>
                            <span>Password:</span>
                            <input type="password" className="form-control" name="password" value={this.state.userData.password}
                                   onChange={this.handleChange}/>
                            <div>
                                <input type="submit" className="btn btn-primary" value="OK"/>
                            </div>
                        </form>
                    </div>

                    <div>
                        <Link to="/addUser">M'inscrire</Link>
                    </div>
                </div>
            </div>
            <SimpleModal title={title} bodyTxt={bodyTxt} handleCloseModal={this.handleCloseModal} showModal={this.state.showModal}/>

            {/*<Modal show={this.state.showModal} onHide={this.handleCloseModal}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>{title}</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>{bodyTxt}</Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" onClick={this.handleCloseModal}>*/}
            {/*            OK*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </>
        )

    }

}
export default function (props) {
    const history = useNavigate();
    return <Login {...props} history={history} />;
}

//export default Login;