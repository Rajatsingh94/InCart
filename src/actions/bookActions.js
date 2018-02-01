"use strict"
import axios from 'axios';

export function getBooks(){
  return function(dispatch){
    axios.get("/api/books").then(function(response){
      dispatch({type:"GET_BOOKS",payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"GET_BOOKS_REJECTED",payload:err})
    })
  }
}


export function postBooks(book){

  return function(dispatch){
    axios.post('/api/books',book).then(function(response){
      dispatch({type:"POST_BOOK",payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"POST_BOOK_REJECT",payload:"there was error during posting"})
    })
  }

    // return {
    //
    //           type:"POST_BOOK",
    //           payload:book
    //
    // }
}

export function deleteBooks(id){

    return function(dispatch){
      axios.delete("/api/books/"+id).then(function(response){
        dispatch({type:"DELETE_BOOK",payload:id})
      })
      .catch(function(err){
        dispatch({typ:"DELETE_BOOK_REJECTED",payload:"there was error during deletion"})
      })
    }

    // return {
    //
    //           type:"DELETE_BOOK",
    //           payload: id
    //
    // }
}

export function updateBooks(book){
    return {

              type:"POST_BOOK",
              payload:book

    }
}
