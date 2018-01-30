"use strict"

import React from 'react';
import {FormControl, Well, Panel, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks,deleteBooks} from '../../actions/bookActions';

class BookForm extends React.Component{

  handleSubmit(){
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value,
    }]
    this.props.postBooks(book);

  }



  onDelete(){
    let bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBooks(bookId);
  }

  render(){

    const bookList = this.props.books.map(function(bookArr){
      return <option key={bookArr._id}> {bookArr._id} </option>
    })

    return (
      <Well>
        <Panel>
          <FormGroup controlid="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Title"
              ref="title"
            />
          </FormGroup>
          <FormGroup controlid="description">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter Description"
                ref="description"
              />
            </FormGroup>
            <FormGroup controlid="price">
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Price"
                  ref="price"
                />
              </FormGroup>
            <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save</Button>
        </Panel>
        <Panel style={{marginTop:'25px'}}>
          <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select a book id to delete</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                  {bookList}
              </FormControl>
        </FormGroup>
        <Button bsStyle="danger"  onClick={this.onDelete.bind(this)} >Delete Book</Button>
        </Panel>
      </Well>
    )
  }
}

function mapStateToProps(state){
  return {books:state.books.books}
}

function mapDispatchToProp(dispatch){
  return bindActionCreators({postBooks,deleteBooks},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProp)(BookForm);
