import { firebase } from "firebase/client";
require("firebase/functions");

const Stripe = (props) => {
  const callFirebaseFunction = (event) => {
    const callableReturnMessage = firebase
      .functions()
      .httpsCallable("returnMessage");

    callableReturnMessage()
      .then((result) => {
        console.log(result.data.output);
      })
      .catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
      });
  };
  return (
    <div>
      <button onClick={(event) => callFirebaseFunction()}>
        call function button
      </button>
    </div>
  );
};

export default Stripe;
