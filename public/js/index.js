

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} route={routes} />
  </Provider>
  , document.querySelector('.container'));



  
// var socket = io();
// socket.on('connect', function () {
//     console.log('connected to server');
//     socket.emit('join', params, function (err) {
//         if(err){

//         } else {

//         }
//     });
// });

// socket.on('disconnect', function () {
//     console.log('disconnect from server');
// });

// socket.on('newMessage', function (message) {
//     var formattedTime = moment(message.createdAt).format('h:mm A')
//     var template = jQuery('#message-template').html();
//     var html = Mustache.render(template, {
//         text: message.text,
//         from: message.from,
//         createdAt: formattedTime
//     });

//     jQuery('#messages').append(html)
//     // console.log('newMessage', message)
//     // var li = jQuery('<li></li>');
//     // li.text(`${message.from} ${formattedTime}: ${message.text}`)

//     // jQuery('#messages').append(li);
// });


// jQuery('#message-form').on('submit', function (e) {
//     e.preventDefault();

//     var messageTextbox = jQuery('[name=message]');

//     socket.emit('createMessage', {
//         from: 'User',
//         text: jQuery('[name=message]').val()
//     }, function () {
//         messageTextbox.val('');
//     });
// });