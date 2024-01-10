import {useEffect, useState} from "react";
import Book from "./Book";
import '../css&&scss/MyBorrows.scss'
import axios from "axios";

const MyBorrows = () => {
    const [myBorrows, setMyBorrows] = useState([])

    const getMyBorrows = () => {
        axios.get('/api/borrows')
            .then(response=>{
                setMyBorrows(response.data)
            }).catch(err => {
            console.error('failed to retrieve books')
        })
    }

    // 这里的代码在组件挂载时执行一次 comme componentDidMount()
    useEffect(() => {

        getMyBorrows()

        // axios.get('/api/borrows')
        //     .then(response=>{
        //         setMyBorrows(response.data)
        //     }).catch(err => {
        //         console.log('failed to retrieve books')
        // })

        // setMyBorrows(
        //     [
        //         {
        //             lender: "toto",
        //             borrower: "tata",
        //             book: {
        //                 name: "tintin",
        //                 category: {
        //                     label: "BD"
        //                 }
        //             }
        //         }
        //     ]
        // )
    }, [])  // [] une seule fois au demarrage de l'application
    const closeBorrow = (borrowId) => {
        axios.delete(`/api/borrow/${borrowId}`)
            .then(response => {
                getMyBorrows()
            })
    }

    return (
        <div className="container">
            <h1>Mes emprunts</h1>
            <div className="list-container">
                {myBorrows.map((borrow, key) =>
                    (
                        <div key={key} className="borrow-container" >
                            <Book
                                title={borrow.book.title}
                                category={borrow.book.category.label}
                                lender={borrow.lender.firstName + " " + borrow.lender.lastName}
                                askDate={borrow.askDate}
                                closeDate={borrow.closeDate}>
                            </Book>
                            <div className="text-center">
                                {borrow.closeDate ? "" : <button className="btn btn-primary btn-sm"
                                                                 onClick={() => closeBorrow(borrow.id)}>Clore</button>}
                            </div>
                        </div>

                    )
                )}
            </div>
            {myBorrows.length === 0 ? <div>Vous n'avez pas d'emprunt</div> : null}

        </div>

    )
}

export default MyBorrows;