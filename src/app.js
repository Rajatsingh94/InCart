"use strict"
import React from 'react';
import { render } from 'react-dom';
import BookList from './components/pages/bookList';
import reducers from './reducers/index';
import {addToCart} from './actions/cartActions';
import {postBooks} from './actions/bookActions';
import {deleteBooks} from './actions/bookActions';
import {updateBooks} from './actions/bookActions';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Menu from './components/menu';
import Footer from './components/footer';

const store = createStore(reducers);

render(
  <Provider store={store}>
  <div>
    <Menu />
    <BookList />
    <Footer />
  </div>

  </Provider>
  ,document.getElementById('app')
);


// create a store



// store.subscribe(function(){
//
// })


// book dispatches
store.dispatch(postBooks(
  [
    {
      id:1,
      title:'This is first book',
      description:'This is first book description',
      price: 150
    },
    {
      id:2,
      title:'This is second book',
      description:'This is second book description',
      price: 250
    },
    {
      id:3,
      title:'This is third book',
      description:'This is second book description',
      price: 450
    }
  ]

))



//cart dispatches
