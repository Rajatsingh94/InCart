"use strict"
//add to cart
export function addToCart(book)
{
    return{
      type: "ADD_TO_CART",
      payload: book
    }
}

//delete from cart
export function deleteCartItem(book)
{
    return{
      type: "DELETE_CART_ITEM",
      payload: book
    }
}

//update cart
export function updateCartItem(_id,unit)
{
    return{
      type: "UPDATE_CART_ITEM",
      _id:_id,
      unit: unit
    }
}
