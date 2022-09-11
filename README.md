  <h1 align="center">.uncanabi</h1>

## Description

An online dispensary and store for users to shop, order and purchase medical marijunna and other CBD prodcuts. Built with MERN stack and features a paypal integration.

The store current functionalities and implementations are:

- Users browse the store products and categories
- Users can see the detailed description of the product
- Users can add the products to cart(Its persisted in localstorage)
- Users can wishlist products
- Users must login/signup to complete checkout
- Users makes payment through paypal payment gateway
- Users can see the status of the ordered products i.e
  "Not processed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
- Users can cancel an order if status is still "Processing"
- Admin can perform CRUD operations on products
- Admin manages the delivery status of orders

### features:

- Node provides the backend environment for this application
- Express middleware is used to handle requests, routes
- Mongoose schemas to model the application data
- JWT to handle authentication
- React for displaying UI components
- Styled-components for styling
- Redux to manage application's state
- ReduxJs/Toolkit to handle asynchronous redux actions
- Paypal to handle payment transcations

## Demo

This application is deployed on Netlify and the backend is hosted on heroku. Check it out :smile: [here](https://uncannabi.netlify.app/).

## Paypal test card and account

Use this account and card to test out the paypal payment gateway </br>
#### Account
- Email: sb-v2ubs20614136@personal.example.com
- Password: uncanabi

#### Credit Card

- Card Type: Visa
- Card Number: 4032039374007484
- Expiration Date: 12/2024
- CVV: 664

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Redux](https://redux.js.org/)

- [Redux Toolkit](https://redux-toolkit.js.org/)

## Start development

```
$ yarn run dev
```

## Simple build for production

```
$ yarn run build
```

## Run build for production

```
$ yarn start
```
