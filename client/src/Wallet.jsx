import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';

function Wallet({ donorBalance, donorPublicKey, setDonorPublicKey, setDonorBalance, recipientPublicKey, setRecipientPublicKey }) {
  async function onChange(evt) {
    const donorPublicKey = evt.target.value;
    setDonorPublicKey(donorPublicKey);
    //const address = toHex(secp.secp256k1.getPublicKey(donorPublicKey));

    if (donorPublicKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${donorPublicKey}`);
      setDonorBalance(balance);
    } else {
      setDonorBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Donor Public Key
        <input placeholder="Type in a public key" value={donorPublicKey} onChange={onChange}></input>
      </label>

      <div>

      </div>
      <div className="balance">Balance: {donorBalance}</div>
    </div>
  );
}

export default Wallet;
