import React from 'react';
import {Row,Col,Well,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addToCart} from '../../actions/cartActions';
import {bindActionCreators} from 'redux';

class BookItem extends React.Component{

  addCart(){
    const book = [...this.props.cart,{
      id:this.props.id,
      title:this.props.title,
      description:this.props.description,
      price:this.props.price
    }]
    this.props.addToCart(book);
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
  cart: state.cart.cart
}

function mapDispatchToProp(dispatch){
  return bindActionCreators({addToCart},dispatch)
}

export default connect(mapStateToProp,mapDispatchToProp)(BookItem)
