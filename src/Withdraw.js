import React from "react";
import Card from "./Card";

function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <WithdrawMsg setShow={setShow} />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  async function handle() {
    console.log(email, amount);
    const userUpdateUrl = `https://sarobabikianfullstackbankapp-860cc1a70bb6.herokuapp.com/account/update/${email}/-${amount}`;
    try {
      const res = await fetch(userUpdateUrl);
      const data = await res.json();
      const updatedUserBalance = data.balance - Number(amount);
      data.balance = updatedUserBalance;
      console.log(data);
      if (!data) {
        console.error("User data not received from the server.");
        props.setStatus("Failed to update user balance.");
        return;
      }
      console.log(updatedUserBalance);
      props.setStatus("");
      props.setShow(false);
      return;
    } catch (error) {
      console.error("Error during fetch:", error);
      props.setStatus("User not found");
    }
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
        min="0"
      />
      {amount < 0 && (
        <div style={{ color: "black" }}>
          You cannot withdraw a negative amount!
        </div>
      )}
      <br />
      <button
        type="submit"
        disabled={!amount || amount == 0 || amount < 0}
        className="btn btn-light"
        onClick={handle}
      >
        Withdraw
      </button>
    </>
  );
}

export default Withdraw;