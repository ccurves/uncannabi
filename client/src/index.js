import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.REACT_APP_STRIPE_CLIENT_ID,
          components: "buttons",
          currency: "USD",
        }}
      >
        <App />
      </PayPalScriptProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
