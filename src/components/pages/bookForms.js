"use strict"

import React from 'react';
import {MenuItem,InputGroup,DropdownButton,Image,Col,Row,FormControl, Well, Panel, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks,deleteBooks,getBooks} from '../../actions/bookActions';
import axios from 'axios';

class BookForm extends React.Component{

  constructor(){
    super();
    this.state = {
      images:[{}],
      img:''
    }
  }

  componentDidMount(){

    this.props.getBooks();

    axios.get('/api/images')
    .then(function(response){
      this.setState({images:response.data})
    }.bind(this))
    .catch(function(err){
      this.setState({images:'error loading the images',img:''})
    }.bind(this))
  }

  handleSubmit(){
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      images: findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value,
    }]
    this.props.postBooks(book);

  }

  handleSelect(img){
    this.setState({
      img:'/images' + img
    })
  }


  onDelete(){
    let bookId = findDOMNode(this.refs.delete).value;

    this.props.deleteBooks(bookId);
  }

  render(){

    const bookList = this.props.books.map(function(bookArr){
      return <option key={bookArr._id}> {bookArr._id} </option>
    })

    const imgList = this.state.images.map(function(imgArr,i){
        return (<MenuItem key={i} onClick={this.handleSelect.bind(this,imgArr.name)} eventKey={imgArr.name}>{imgArr.name}</MenuItem>
        )
    },this)

    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img} />
                 <DropdownButton
                   componentClass={InputGroup.Button}
                   id="input-dropdown-addon"
                   title="Select an image"
                   bsStyle="primary">
                     {imgList}
                   </DropdownButton>
              </InputGroup>
              <Image src={this.state.img}  responsive/>
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
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
          </Col>
        </Row>

      </Well>
    )
  }
}

function mapStateToProps(state){
  return {books:state.books.books}
}

function mapDispatchToProp(dispatch){
  return bindActionCreators({postBooks,deleteBooks,getBooks},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProp)(BookForm);
