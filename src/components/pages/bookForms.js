"use strict"

import React from 'react';
import {FormControl, Well, Panel, FormGroup, ControlLabel, Button } from 'react-bootstrap';


class BookForm extends React.Component{
  render(){

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
            <Button bsStyle="primary">Save</Button>
        </Panel>
      </Well>
    )
  }
}

export default BookForm;
