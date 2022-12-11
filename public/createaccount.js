function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("customer");
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    highlightNavLink("nav-createaccount"); // to highlight nav link

    //validate button
    if (show) {
      if (role === "admin") {
        document.getElementById('role_admin').checked = true;
      }
      else if (role === "customer") {
        document.getElementById('role_customer').checked = true;
      }
      if(name && email && password) {
        document.getElementById('btn-updatedata').disabled = false;
      } else {
        document.getElementById('btn-updatedata').disabled = true;
      }
    }
  });

  function validateEmpty(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function validateLength(field, length, label) {
    if (field.length < length) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    console.log(name, email, password, role);
    if (!validateEmpty(name, "Name is empty!")) return;
    if (!validateEmpty(email, "Email address is empty!")) return;
    if (!validateEmpty(password, "Password is empty!")) return;
    if (!validateLength(name, 2, "Name is less than 2 characters!")) return;
    if (!validateLength(email, 6, "Email address is less than 6 characters!")) return;
    if (!validateLength(password, 8, "Password is less than 8 characters!")) return;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        const user = userCredential.user;
        console.log('Firebase Signup successful!');
    })
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
    
    firebase.auth().currentUser.getIdToken()
    .then(async (idToken) => {
        console.log('idToken:', idToken);
        let response = await fetch(`/account/create/${name}/${email}/${password}/${role}`, {
            method: 'GET',
            headers: {
                'Authorization': idToken
            }
        });
        let result = await response.json();
        console.log(result);
        
    })
    .catch((error) => {
        console.log('error:', error);
    });

    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setRole("customer");
    setShow(true);
  }

  return (
    <Card
      outstyle="light"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            Role
            <br />
            Admin <input
              type="radio"
              name="role"
              id="role_admin"
              value="admin"
              onChange={(e) => setRole(e.currentTarget.value)}
            /> &nbsp;
            Customer <input
            type="radio"
            name="role"
            id="role_customer"
            value="customer"
            onChange={(e) => setRole(e.currentTarget.value)}
            />
            <br />
            <br />
            <button
              id="btn-updatedata"
              type="submit"
              className="btn btn-dark"
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Congratulations!</h5>
            <p>You've successfully added account for {name}.</p>
            <button id="btn-clearform" type="submit" className="btn btn-dark" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
