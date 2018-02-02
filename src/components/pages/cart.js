"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Modal,Panel,Col,Row,Well,Button,ButtonGroup,Label} from 'react-bootstrap';
import { deleteCartItem, updateCartItem,getCart} from '../../actions/cartActions';
import {bindActionCreators} from 'redux';

class Cart extends React.Component{

  ComponentDidMount(){
      this.props.getCart();
  }

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

constructor(){
  super();
  this.state ={
    show:false
  }
}

open(){
  this.setState({show:true})
}

handleClose(){
  this.setState({show:false})
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
      <Row>
        <Col xs={12}>
          <h6>Total Amount: </h6>
          <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
            Proceed To Checkout
          </Button>
        </Col>
      </Row>
      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h6>Your Order has been saved</h6>
              <span>You will recieve a email confirmation soon</span>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>Total $:</h6>
            </Col>
            <Button onClick={this.handleClose.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
    </Panel>
  )
}
}
function mapStateToProps(state){
  return {cart: state.cart.cart}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({deleteCartItem,updateCartItem,getCart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
