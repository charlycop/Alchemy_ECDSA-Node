const secp      = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils')
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");


const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);

// Message to be signed
const message = 'Hello, Ethereum!';
const messageHash = keccak256(utf8ToBytes(message));

// Sign the hash with the private key
const signature = secp.secp256k1.sign(messageHash, privateKey);

// Recover the private key
const publicKeyRecovered = signature.recoverPublicKey(messageHash).toRawBytes();

console.log("")
console.log("-= Generating private and derive the public key from this private key =-")
console.log('private key:', toHex(privateKey));
console.log('public key:', toHex(publicKey));
console.log("")
console.log("-= Display message and create hash from message =-")
console.log('Message:', message);
console.log('Message Hash:', toHex(messageHash));
console.log("")
console.log("-= Signing the message hash with the private key =-")
console.log('Signature:', toHex(signature.toCompactRawBytes()));
console.log("")
console.log("-= Recovering the public key from the signature and the hashed message =-")
console.log('publicKeyRecovered: ', toHex(publicKeyRecovered));
console.log('publicKey === publicKeyRecovered: ', toHex(publicKey) === toHex(publicKeyRecovered))
console.log("")


