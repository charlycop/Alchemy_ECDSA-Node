const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp      = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils')
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");



app.use(cors());
app.use(express.json());

const balances = {
  "0294f61211e0491bbb3938e26bd795b7a349e50d27bdd14fa635713640f9d42859": 100,
  "02fff69059dbcef9f66ffcb7660c28441d79033915d2d636a5e28e2e54a16ec81b": 50,
  "0314d7b9d2a40830ee154e4db88d6e16b574d2c8c975a93e69c2f5dc2b4f43b26d": 75,
};



//private key: 91b0a49ef3140d586bb63fea134ced446a78c2771f7dd86a14c485884b3840c4
//public key: 0294f61211e0491bbb3938e26bd795b7a349e50d27bdd14fa635713640f9d42859


//private key: e34846bfd8291148f489c3f250955038bc9251b6172967277a903ad74b44ab2d
//public key: 02fff69059dbcef9f66ffcb7660c28441d79033915d2d636a5e28e2e54a16ec81b

//private key: c9edb7fcd536a60a3f85e8059174bb9dc148178dc3f083d937b567217dca261a
//public key: 0314d7b9d2a40830ee154e4db88d6e16b574d2c8c975a93e69c2f5dc2b4f43b26d



app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { donor, recipient, amount, donorTransactionSignature } = req.body;
  // Verifying here the signature by retrieving the public key

  const message = donor;
  const messageHash = keccak256(utf8ToBytes(message));

  // Reconstruct the Signature object from the hex signature
  // Recovery bit is in read only, we have to create a new object to add it.
  const signatureFromCompact = secp.secp256k1.Signature.fromCompact(donorTransactionSignature); 
  const signatureForRecovery = new secp.secp256k1.Signature(signatureFromCompact.r.valueOf(), signatureFromCompact.s.valueOf(), 1);

  //Get the public key
  const donorPublicKeyRecovered = signatureForRecovery.recoverPublicKey(messageHash).toRawBytes();


  if (donor !== toHex(donorPublicKeyRecovered)){
    console.log("The signature is invalid !");
    return;
  }

  setInitialBalance(donor);
  setInitialBalance(recipient);

  if (balances[donor] < amount) {
    console.log("Not enough found in the donor wallet !");
    return;
    
  } else {
    balances[donor] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[donor] });
    console.log("Transaction processed successfully !");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
