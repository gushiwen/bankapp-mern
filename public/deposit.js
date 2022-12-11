function Deposit(){
  const [show, setShow] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const ctx = React.useContext(UserContext);
  
  React.useEffect(() => {
    highlightNavLink("nav-deposit"); // to highlight nav link

    if(ctx.loginaccount && ctx.loginaccount.role === "customer") {
      setShow(true);
      setBalance(ctx.loginaccount.balance);
    }

    //validate button
    if (show) {
      if(amount) {
        document.getElementById('btn-deposit').disabled = false;
      } else {
        document.getElementById('btn-deposit').disabled = true;
      }
    }
  });

  function validateEmpty(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => {
        setStatus('');
        setAmount('');
      }, 3000);
      return false;
    }
    return true;
  }

  function validateNumber(field, label) {
    if (!/^\-?[0-9]+$/.test(field)) {
      setStatus("Error: " + label);
      setTimeout(() => {
        setStatus('');
        setAmount('');
      }, 3000);
      return false;
    }
    return true;
  }

  function validateNegative(field, label) {
    if (/^((-[0-9]+)|(0+))$/.test(field)) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    console.log(amount);
    if (!validateEmpty(amount, "Amount is empty!")) return;
    if (!validateNumber(amount, "Amount is not a number!")) return;
    if (!validateNegative(amount, "Amount is negative or zero!")) return;
    //ctx.users.push({ name, email, password, balance: 100 });

    let newBalance = balance + parseInt(amount);

    firebase.auth().currentUser.getIdToken()
    .then(async (idToken) => {
        console.log('idToken:', idToken);
        let response = await fetch(`/account/update/balance/${ctx.loginaccount.email}/${newBalance}`, {
            method: 'GET',
            headers: {
                'Authorization': idToken
            }
        });
        let result = await response.json();
        if (result) {
          console.log('Deposit successfully');
          ctx.loginaccount.balance = newBalance;
          setBalance(newBalance);
          setStatus("You've successfully deposit $" + amount);
          setTimeout(() => setStatus(''), 3000);
          setAmount("");
        } else {
          setStatus("Deposit failed");
          setTimeout(() => setStatus(''), 3000);
        }
    })
    .catch((error) => {
        console.log('error:', error);
    });

    /** 
    fetch(`/account/update/balance/${ctx.loginaccount.email}/${newBalance}`)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        console.log('Update successfully');
        ctx.loginaccount.balance = newBalance;
        setBalance(newBalance);
        setStatus("You've successfully deposit $" + amount);
        setTimeout(() => setStatus(''), 3000);
        setAmount("");
      } else {
        setStatus("deposit failed");
        setTimeout(() => setStatus(''), 3000);
      }
    });
    */
  }

  return (
    <Card
      outstyle="primary"
      header="Deposit"
      status={status}
      body={
        show ? (
          <>
            <h3>Balance: {balance}</h3>
            <br />
            Amount
            <br />
            <input
              type="input"
              className="form-control"
              id="amount"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            <button
              id="btn-deposit"
              type="submit"
              className="btn btn-dark"
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Please login first!</h5>
          </>
        )
      }
    />
  );
}