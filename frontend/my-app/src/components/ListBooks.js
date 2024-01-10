import React from "react";
import Book from "./Book";

import '../css&&scss/ListBooks.scss'
import '../css&&scss/MyBooks.scss'
import axios from "axios";
import {useNavigate} from "react-router-dom";

class ListBooks extends React.Component {

    //state解决异步请求问题
    constructor() {
        super();
        this.state = {books: []}
    }

    //books = []
    componentDidMount() {

        axios.get('/api/books?status=FREE')
            .then(response=>{
                this.setState({books: response.data})
            }).catch(err => {
                console.error('failed to retrieve books')
        })

        // // TODO charger les livres disponibles a partir des Api back
        // this.setState({
        //     books: [
        //         {
        //             title: "asterix",
        //             category: "BD",
        //         },
        //         {
        //             title: "tintin",
        //             category: "BD",
        //         }
        //     ]
        // })
        // console.log('livres initilises')
        //anonymous function
        // setTimeout(()=>{
        //     this.books = [
        //         {
        //             title: "asterix",
        //             category: "BD",
        //         },
        //         {
        //             title: "tintin",
        //             category: "BD",
        //         }
        //     ]
        // }, 200)
        // console.log('livres initilises')
    }

    borrowBook(bookId) {
        axios.post(`/api/borrows/${bookId}`,{})
            .then(()=>{
                this.props.history('/myBorrows')
            })

    }

    render() {
        //console.log('render') // render avant livres initilises *le page affiche Pas de livres disponible*

        return (
            <div className="container">
                <div>
                    <h1>Livres disponibles</h1>
                    <div className="list-container">
                        {this.state.books.length === 0 ? "Pas de livres disponible" : null}
                        {this.state.books.map((book, key) => (<div key={key} className="list-book-container">
                                <Book title={book.title} category={book.category.label}  lender={`${book.user.firstName} ${book.user.lastName}`}/>
                                <div className="text-center">
                                    <button className='btn btn-primary btn-sm' onClick={()=> this.borrowBook(book.id)}>Emprunter</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

//export default ListBooks;

export default function (props) {
    const history = useNavigate();
    return <ListBooks {...props} history={history} />;
}