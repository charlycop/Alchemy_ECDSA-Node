import { useState } from "react";
import server from "./server";

function Transfer({ donorPublicKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [donorTransactionSignature, setDonorTransactionSignature] = useState("");


  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    if (donorTransactionSignature.length !== 128){
      console.log("Signature should be 128 characters.");
      return;
    }
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        donor: donorPublicKey,
        amount: parseInt(sendAmount),
        recipient : recipientPublicKey,
        donorTransactionSignature : donorTransactionSignature,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
          required
        ></input>
      </label>

      <label>
        Recipient Public Key
        <input
          placeholder="Type in a public key"
          value={recipientPublicKey}
          onChange={setValue(setRecipientPublicKey)}
          required
        ></input>
      </label>

      <label>
        Signature
        <input
          placeholder="Type in the transaction signature from the donor private key"
          value={donorTransactionSignature}
          onChange={setValue(setDonorTransactionSignature)}
          required
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
