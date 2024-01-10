//import Book from './components/Book'; //{Book} default

// const books = [
//     { id: 3, title: 'Book 1', author: 'Author 1' },
//     { id: 4, title: 'Book 2', author: 'Author 2' },
// ];
// renvoyer du JSX
//la notation fléchée =>

//function MyBooks(){}
import Book from "./Book";
import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import '../css&&scss/MyBooks.scss'
import axios from "axios";
import SimpleModal from "./SimpleModal";

const MyBooks = () => {
// const MyBooks = () => { il n'est plus un function

    const [myBooks, setMyBooks] = useState([])
    const history = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const fetchBooks = () => {
        axios.get('/api/books').then(response=>{
            setMyBooks(response.data)
        })
    }

    useEffect(() => {
        fetchBooks()
    }, []);

    const handleDelete = (bookId) => {
        axios.delete(`/api/books/${bookId}`).then(response=>{
            fetchBooks();
        }).catch(err =>{
            setShowModal(true)
        })
    }

    const handleCloseModal = () => {
      setShowModal(false)
    }

    return (
        // fragment
        <>
        <div className="container">
            <h1>Mes Livres</h1>
            <div className="list-container">
                {myBooks.length === 0 ? "Vous n'avez pas déclaré de livres" : null}
                {myBooks.map((book, key) => (<div key={key} className="mybook-container">
                        <Book title={book.title} category={book.category.label}></Book>
                        {/*<Link to={`/addBook/${book.id}`}>*/}
                            <button className='btn btn-primary btn-sm' onClick={()=>history(`/addBook/${book.id}`)}>Modifier</button>
                        {/*</Link>*/}
                        {/*<button className='btn btn-primary btn-sm' onClick={handleDelete}>Supprimer</button>  ne peut pas passer bookId*/}
                        <button className='btn btn-primary btn-sm' onClick={()=> handleDelete(book.id)}>Supprimer</button>
                    </div>
                ))}
            </div>
            {/*<Link to={"/addBook"}>*/}
            <button className='btn btn-primary btn-sm' onClick={()=>history("/addBook/")}>Nouveau livre</button>
            {/*</Link>*/}
        </div>

        <SimpleModal title={"Supression de livre impossible"} bodyTxt={"Livre en cours d'emprunt"}
                handleCloseModal={handleCloseModal} showModal={showModal}></SimpleModal>
        </>
    )


}

export default MyBooks;


