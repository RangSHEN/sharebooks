import React, {useEffect, useState} from 'react';
import MyBooks from "./components/MyBooks";
import {Route, Routes} from "react-router-dom";
import ListBooks from "./components/ListBooks";
import AddBook from "./components/AddBook";
import MyBorrows from "./components/MyBorrows";
import Login from "./components/Login";
import AddUser from "./components/AddUser";
import Header from "./components/Header"; //{Book} default
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css'


export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

//f5 disconnected
// const UserConnected = ({setUserInfo, userInfo}) => {
//   const history = useNavigate(); //chaque fois que history change(f5), on passe dans le new effect
//   useEffect(()=>{
//       setUserInfo(null)
//       axios.get('/isConnected')
//           .then(response=>{
//               setUserInfo(response.data)
//           }).catch(err => {
//               console.error('failed to get user')
//       })
//   }, [history, setUserInfo])
//
//     return (<>
//         {userInfo && <Header userInfo={userInfo} setUserInfo={setUserInfo} />}
//     </>)
// }
function App() {
    // un intercepteur pour automatiquement ajouter le token jwt s'il est present dans le cache stroage
    //dans le cas img_3.png api'classiques' mybooks addbook

    useEffect ( () => {
        axios.interceptors.request.use(function (request) {
            const token = sessionStorage.getItem(AUTH_TOKEN_KEY) //AUTH_TOKEN_KEY le nom de la cle dans laquelle on va stocker notre token dans le local storage
            if  (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        }, (error) => {
            return Promise.reject(error);
        });
    })

    const [userInfo, setUserInfo] = useState('');

    return (
        <div>
            {/*masquer le header quand je me deconnecte*/}
            {/*problem: F5 userInfo devient null, on affiche plus le header
              resolution : ajouter un call http*/}
            {userInfo && <Header userInfo={userInfo} setUserInfo={setUserInfo}/>}
            {/*<UserConnected userInfo={userInfo} setUserInfo={setUserInfo} />*/}
            <div className="App">
                <Routes>
                    <Route path="listBooks" element={<ListBooks/>} />
                    <Route path="myBooks" element={<MyBooks/>} />
                    <Route path="addBook" element={<AddBook/>} />
                    {/*modification d'un livre*/}
                    <Route path="addBook/:bookId" element={<AddBook/>} />
                    <Route path="myBorrows" element={<MyBorrows />} />
                    {/*<Route path="login" element={<Login setUserInfo={setUserInfo}/>} />*/}
                    <Route path="addUser" element={<AddUser setUserInfo={setUserInfo}/>} />
                    <Route path="*" element={<Login setUserInfo={setUserInfo}/>} />
                </Routes>
            </div>

        </div>
    );
}
export default App;
