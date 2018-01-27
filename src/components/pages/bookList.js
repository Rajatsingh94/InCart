"use strict"
import {connect} from 'react-redux';
import React from 'react';
import {Grid,Row, Col, Button} from 'react-bootstrap';
import BookItem from '../pages/bookitem';
import BookForm from '../pages/bookForms';
import Cart from '../pages/cart';

class BookList extends React.Component{
  render(){
   console.log('book',this.props.books);
   console.log('cart',this.props.cart);
    const bookList = this.props.books.map(function(bookarr){
      return(
        <Col xs={12} sm={6} md={4} key={bookarr.id}>
          <BookItem
            id={bookarr.id}
            title={bookarr.title}
            description={bookarr.description}
            price={bookarr.price}
          />
        </Col>
      )
    })

    return(
      <Grid>
        <Row>
          <Cart />
        </Row>
        <Col xs={12} sm={6} md={4} >
          <BookForm />
        </Col>
        <Row style={{marginTop:'15px'}}>
          {bookList}
        </Row>
    </Grid>
    )
  }
}

function mapStateToProps(state)
{
  return{books: state.books.books,
          cart: state.cart.cart
        }


}


export default connect(mapStateToProps)(BookList);
