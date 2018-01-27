import React from 'react';
import {Row,Col,Well,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {} from ''

class BookItem extends React.Component{
  render(){
    return(
    <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>{this.props.price}</h6>
            <Button bsStyle="primary">Buy Now</Button>
            </Col>
        </Row>

    </Well>
  );
  }
}

function mapStateToProp(state){
  book: state.book.book;
}

export default connect(mapStateToProp)(BookItem)
