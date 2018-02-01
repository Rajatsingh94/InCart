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
import {Switch} from 'react-router';
import {BrowserRouter,Route} from 'react-router-dom';
import Cart from './components/pages/cart';
import BookForm from './components/pages/bookForms';
import Main from './main';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


const middleware = applyMiddleware(thunk);
const store = createStore(reducers,middleware);

const Routes = (
  <Provider store={store}>
    <Main>
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={BookList} />
      <Route path="/admin" component={BookForm} />
      <Route path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
    </Main>
  </Provider>
)

render(
  Routes
  ,document.getElementById('app')
);


// create a store



// store.subscribe(function(){
//
// })


// book dispatches
store.dispatch(postBooks([]))



//cart dispatches
