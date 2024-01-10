import React from 'react';
import bookImg from '../images/book.png'
export default class Book extends React.Component {


    // displaydate = (dateStr) => {
    //     const newDate = new Date(dateStr)
    //     return newDate.toLocaleDateString("fr-FR")
    // }
    render() {
        return (
            <div className="book">
                <div className="book-image">
                    {/*alt when page cant load image, it can show word*/}
                    <img src={bookImg} alt="Book"/>
                </div>
                <div>Titre : {this.props.title}</div>
                <div>Catégorie: {this.props.category}</div>
                {/*on va ne l'afficher que si il est fourni*/}
                {this.props.lender && <div>Prêteur: {this.props.lender}</div>}
                {this.props.askDate && <div>Date demande: {this.props.askDate}</div>}
                {this.props.closeDate && <div>Date cloture: {this.props.closeDate}</div>}

            {/* props are passed in based on the ListBooks(book)  */}
            </div>
        )
    }
}