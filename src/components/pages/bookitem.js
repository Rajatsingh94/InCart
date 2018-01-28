import React from 'react';
import {Row,Col,Well,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addToCart,updateCartItem} from '../../actions/cartActions';
import {bindActionCreators} from 'redux';


class BookItem extends React.Component{

  addCart(){
    const book = [...this.props.cart,{
      _id:this.props._id,
      title:this.props.title,
      description:this.props.description,
      price:this.props.price,
      quantity: 1
    }]

    if(this.props.cart.length >0)
    {
      let _id = this.props._id;

      let cartIndex = this.props.cart.findIndex(function(cart){
        return cart._id === _id;

      })

      if(cartIndex === -1)
      {
        this.props.addToCart(book);
      }else {
        this.props.updateCartItem(_id,1)
      }

    }else {
      this.props.addToCart(book);
    }


  }

  render(){
    return(
    <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>{this.props.price}</h6>
            <Button bsStyle="primary"  onClick={this.addCart.bind(this)}>Buy Now</Button>
            </Col>
        </Row>

    </Well>
  );
  }
}

function mapStateToProp(state)
{
    return {cart: state.cart.cart}
}

function mapDispatchToProp(dispatch){
  return bindActionCreators({addToCart,updateCartItem},dispatch)
}

export default connect(mapStateToProp,mapDispatchToProp)(BookItem)
