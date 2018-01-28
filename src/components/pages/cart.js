"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Panel,Col,Row,Well,Button,ButtonGroup,Label} from 'react-bootstrap';
import { deleteCartItem, updateCartItem} from '../../actions/cartActions';
import {bindActionCreators} from 'redux';

class Cart extends React.Component{

  onDelete(_id)
  {
    const currentBookToDelete = this.props.cart;

    const indexToDelete = currentBookToDelete.findIndex(
      function(cart){
        return cart._id === _id;
      }
    )
    let cartAfterDelete= [...currentBookToDelete.slice(0,indexToDelete),
    ...currentBookToDelete.slice(indexToDelete+1)]


    this.props.deleteCartItem(cartAfterDelete);
  }

  onIncrement(_id){
    this.props.updateCartItem(_id,1);
  }

  onDecrement(_id,quantity){
    if(quantity>1)
    {
        this.props.updateCartItem(_id,-1);
    }

  }

  render(){
    if(this.props.cart[0])
    {
      return this.renderCart();
    }else {

        return this.renderEmpty();

    }
  }


renderEmpty(){
  return (<div></div>)
}

renderCart(){
  const cartItemList = this.props.cart.map(function(cartArr){
      return(
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12}  sm={4}>
                <h6>{cartArr.title}</h6><span>    </span>
            </Col>
            <Col xs={12}  sm={2}>
                <h6>${cartArr.price}</h6>
            </Col>
            <Col xs={12}  sm={2}>
                <h6> qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
            </Col>
            <Col xs={6}  sm={4}>
                <ButtonGroup style={{minWidth:'300px'}}>
                  <Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this,cartArr._id,cartArr.quantity)}>-</Button>
                  <Button bsStyle="default" bsSize="small" onClick={this.onIncrement.bind(this,cartArr._id)}>+</Button>
                  <span>     </span>
                  <Button bsStyle="danger" bsSize="small" onClick={this.onDelete.bind(this,cartArr._id)}>Delete</Button>
                </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
  },this)

  return (
    <Panel header="Cart" bsStyle="primary">
      {cartItemList}
    </Panel>
  )
}
}
function mapStateToProps(state){
  return {cart: state.cart.cart}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({deleteCartItem,updateCartItem},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
