"use strict"

export function bookReducers(state={books:[]},action)
{
  switch(action.type)
  {
    case "GET_BOOKS":
    return {...state,books:[...action.payload]}
    break;


    case "POST_BOOK":
    return {books:[...state.books,...action.payload],msg:'Saved! CLick to Continue',style:'success'}
    break;

    case "POST_BOOK_REJECT"
    return {...state,msg:'Please try again',style:'danger'}
    break;

    case "RESET_BUTTON"
    return {...state,msg:null,style:'primary'}
    break;

    case "DELETE_BOOK":
    const currentBookToDelete = [...state.books]

    const indexToDelete = currentBookToDelete.findIndex(
      function(book){
        return book._id == action.payload;
      }
    )
    return {books:[...currentBookToDelete.slice(0,indexToDelete),
    ...currentBookToDelete.slice(indexToDelete+1)]}
    break;

    case "UPDATE_BOOK":
    const currentBookToUpdate = [...state.books]
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book){
        return book._id === action.payload._id;
      }
    )
    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title: action.payload.title
    }
    return {books: [...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate+1)]}
    break;

  }

  return state
}
