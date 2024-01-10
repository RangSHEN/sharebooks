import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "../css&&scss/AddUser.scss";
import axios from "axios";
import {AUTH_TOKEN_KEY} from "../App";
import SimpleModal from "./SimpleModal";
class AddUser extends React.Component {

  constructor() {
    super();
    this.state = {userData: {email: '', lastName: '', firstName: '', password: null}, showModal: false};
    // this.handleChange =  this.handleChange.bind(this)
    // this.onSubmit = this.onSubmit.bind(this)
  }

  handleChange = (event) => {
    let currentStateData = {...this.state.userData}
    currentStateData[event.target.name] = event.target.value
    this.setState({userData : currentStateData})
  }

  handleCloseModal = () =>{
    this.setState({showModal: false})
  }

  onSubmit = (event) => {
    event.preventDefault();

    //app.js
    axios.post('/users', {...this.state.userData})
        .then(response=>{
          //The optional chaining operator (?.) is used here,
          // so even if either response or headers is null or undefined, the code won't throw an error.
          const bearerToken = response?.headers?.authorization;

          if (bearerToken && bearerToken.slice(0,7) ==='Bearer '){
            const jwt = bearerToken.slice(7, bearerToken.length);
            sessionStorage.setItem(AUTH_TOKEN_KEY, jwt)
          }

          //props use parameters passed in from the outside
          this.props.setUserInfo(response.data.firstName + " " + response.data.lastName)

          //redirection ver listBooks
          //const history = useNavigate()
          //history("/listBooks")
          this.props.history("/myBooks")
        })
        .catch(err =>{
          this.setState({showModal: true})
        })

  }


  render() {

    return (
        <>
        <div className="add-user-container">
          <div>
            <h1>M'inscrire</h1>
            <div className="form-container">
              <form onSubmit={this.onSubmit}>
                <div>
                  <label>email</label>
                  <input name="email" type="text" className="form-control" onChange={this.handleChange}/>
                </div>
                <div>
                  <label>nom</label>
                  <input name="lastName" type="text" className="form-control" onChange={this.handleChange}/>
                </div>
                <div>
                  <label>prenom</label>
                  <input name="firstName" type="text" className="form-control" onChange={this.handleChange}/>
                </div>
                <div>
                  <label>password</label>
                  <input name="password" type="text" className="form-control" onChange={this.handleChange}/>
                </div>
                <div className="container-valid text-center">
                  <input type="submit" value="Valider" className="btn btn-primary" onChange={this.handleChange}/>
                </div>
              </form>
            </div>
            <div>
              <Link to="/">Retour à l'accueil</Link>
            </div>
          </div>
        </div>

         <SimpleModal title={"Mail déja utilisé"} bodyTxt={"Cet email est déja utilisé, merci d'en saisir un autre"}
                      handleCloseModal={this.handleCloseModal} showModal={this.state.showModal}></SimpleModal>
        </>
    )
  }
}

export default function (props) {
  const history = useNavigate();
  return <AddUser {...props} history={history} />;
}

//export default AddUser