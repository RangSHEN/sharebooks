import {useNavigate, useParams} from "react-router-dom";
import '../css&&scss/AddBook.scss'
import {useEffect, useState} from "react";
import axios from "axios";

const AddBook = () => {
    let {bookId} = useParams(); //useParams: get parameter from url /:bookId déstructurer directment
    //name et categoryId par default  setBookData = setState(in ListBooks)  useState follow by Bookdata
    const [bookData, setBookData] = useState({})
    const [categoriesData, setCategoriesData] = useState([]) //[] par default

    const history = useNavigate(); // =<Link to=''></Link>

    useEffect(()=>{
        axios.get('/api/categories').then(response=>{
            setCategoriesData(response.data)
            //修改之后 防止数据回显重置表格
            setBookData({
                title: '',
                categoryId: response.data[0].id
            })

        }).then(()=>{
            if (bookId) {
                axios.get(`/api/books/${bookId}`).then(response => {

                    //回显
                    setBookData({
                        title: response.data.title,
                        categoryId: response.data.category.id
                    })
                })
            }

        })
    },[bookId]) //[bookId] pour ne plus effet que si elle change

    // const categories = [
    //     {
    //         id: 1,
    //         label: 'BD'
    //     },
    //     {
    //         id: 2,
    //         label: 'Roman'
    //     },
    //     {
    //         id: 3,
    //         label: 'Informatique'
    //     }
    // ]
    // in javascript bookId transfer automatically into type boolean
    // if (bookId) {
    //     return "update book"
    // }



    const handleChange = (event) => {
        // chaque foi qu'on change une valeur sur input il faut mettre a jour le state
        // ne pas modifier le state directment
        let currentStateData = {...bookData};
        //target.id = target.name
        currentStateData[event.target.name] = event.target.value;
        //setBookData is updateStateFunction
        setBookData(currentStateData);
    }



    const onSubmit = (event) => {
        event.preventDefault(); //Blocking default form submission behavior
                                //JavaScript initiates asynchronous requests without page refreshes
        if (bookId) {
            axios.put(`/api/books/${bookId}`,{...bookData})
                .then(()=>{
                    history("/myBooks")
                })
        } else {
            //creation
            axios.post('/api/books',{...bookData})
                .then(()=>{
                    //rediriger vers myBooks
                    history("/myBooks")
                })
        }
    }

    //var nameValue = document.getElementById('name').value; currentState[event.target.name] = event.target.value
    //no bookId
    return (
        <div className="container-add-book">
            <h1>Ajouter un livre</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nom du livre</label>
                    {/*onChange={handleChange}*/}
                    {/*click sur valider voit les valeur que j'ai saisie pour transmission au back*/}
                    <input name="title" value={bookData.title} type="text" onChange={handleChange} className="form-control"></input>
                </div>
                <div>
                    <label>Catégorie du livre</label>
                    {/*    une select box avec drop down list*/}
                    <select name="categoryId" value={bookData.categoryId} onChange={handleChange} className="form-select">
                        {/*<option value='1'>BD</option>*/}
                        {/*<option value='2'>Roman</option>*/}
                        {/*chaque élément d'une liste en jsx doit avoir une key*/}
                        {categoriesData.map(category => (
                            <option value={category.id} key={category.id}>{category.label}</option>
                        ))}
                    </select>
                </div>
                <div className="container-submit">
                    <input type="submit" value="Valider" className="btn btn-primary"/>

                </div>
            </form>
        </div>
    )
}

export default AddBook;