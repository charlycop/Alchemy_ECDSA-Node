import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [donorBalance, setDonorBalance] = useState(0);
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [donorPublicKey, setDonorPublicKey] = useState("");

  return (
    <div className="app">
      <Wallet
        donorBalance={donorBalance}
        donorPublicKey={donorPublicKey}
        setDonorPublicKey={setDonorPublicKey}
        setDonorBalance={setDonorBalance}
        recipientPublicKey={recipientPublicKey}
        setRecipientPublicKey={setRecipientPublicKey}
      />
      <Transfer setDonorBalance={setDonorBalance} donorPublicKey={donorPublicKey} />
    </div>
  );
}

export default App;
