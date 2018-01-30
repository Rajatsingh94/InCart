"use strict"

export function cartReducers(state={cart:[]},action){

  switch(action.type)
  {
    case "ADD_TO_CART":
    return {...state,cart:action.payload,totalAmount:totals(action.payload).amount}
    break;


    case "DELETE_CART_ITEM":
    return {...state,cart:action.payload,totalAmount:totals(action.payload).amount}
    break;


  case "UPDATE_CART_ITEM":

  const currentBookToUpdate = [...state.cart]
  const indexToUpdate = currentBookToUpdate.findIndex(
    function(book){
      return book._id === action._id;
    }
  )
  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity+ action.unit
  }
  let cartUpdate = [...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,
  ...currentBookToUpdate.slice(indexToUpdate+1)]

  return {...state,cartUpdate,totalAmount:totals(cartUpdate).amount}
}
  return state
}

export function totals(payloadArr)
{
  const totalAmount = payloadArr.map(function(cartArr){
    return cartArr.price * cartArr.quantity;
  }).reduce(function(a,b){
    return a+b;
  },0);

  return {amount:totalAmount.toFixed(2)}
}
