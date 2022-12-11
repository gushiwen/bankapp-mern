function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("customer");
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    highlightNavLink("nav-login"); // to highlight nav link

    if (ctx.loginaccount) {
      setShow(false);
      return;
    }

    //validate button
    if (show) {
      if (role === "admin") {
        document.getElementById("role_admin").checked = true;
      } else if (role === "customer") {
        document.getElementById("role_customer").checked = true;
      }
      if (email && password) {
        document.getElementById("btn-login").disabled = false;
      } else {
        document.getElementById("btn-login").disabled = true;
      }
    }
  });

  function validateEmpty(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function validateLength(field, length, label) {
    if (field.length < length) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  async function handleLogin() {
    console.log(email, password, role);
    if (!validateEmpty(email, "Email is empty!")) return;
    if (!validateEmpty(password, "Password is empty!")) return;
    if (!validateLength(email, 6, "Email is less than 6 characters!")) return;
    if (!validateLength(password, 8, "Password is less than 8 characters!"))
      return;
    //ctx.users.push({ name, email, password, balance: 100 });
    /** 
    ctx.users.forEach((user) => {
      if (name === user.name && password === user.password) {
        ctx.loginid = name;
        return;
      }
    });
    */
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Firebase Signin successful!");

      let idToken = await firebase.auth().currentUser.getIdToken();
      console.log("idToken:", idToken);

      //fetch(`/role/verify/${email}/${role}`)
      let response = await fetch(`/account/find/${email}`, {
        method: "GET",
        headers: {
          Authorization: idToken,
        },
      });
      let user = await response.json();

      console.log("account find: " + JSON.stringify(user));
      if (user && user.role === role) {
        ctx.loginaccount = { email, role, balance: parseInt(user.balance) };
        if (role === "admin") {
          document.getElementById("li-createaccount").style.display = "block";
          document.getElementById("li-alldata").style.display = "block";
        } else if (role === "customer") {
          document.getElementById("li-deposit").style.display = "block";
          document.getElementById("li-withdraw").style.display = "block";
        }
        setShow(false);
      } else {
        setStatus("Invalid account!");
        setTimeout(() => setStatus(""), 3000);
        setEmail("");
        setPassword("");
        setRole("customer");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Firebase signout");
        if (ctx.loginaccount.role === "admin") {
          document.getElementById("li-createaccount").style.display = "none";
          document.getElementById("li-alldata").style.display = "none";
        } else if (ctx.loginaccount.role === "customer") {
          document.getElementById("li-deposit").style.display = "none";
          document.getElementById("li-withdraw").style.display = "none";
        }
        ctx.loginaccount = null;
        setShow(true);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  return (
    <Card
      outstyle="success"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            Email
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
            Admin{" "}
            <input
              type="radio"
              name="role"
              id="role_admin"
              value="admin"
              onChange={(e) => {
                setRole(e.currentTarget.value);
                setEmail("admin@gmail.com");
                setPassword("secretsecret");
              }}
            />{" "}
            &nbsp; Customer{" "}
            <input
              type="radio"
              name="role"
              id="role_customer"
              value="customer"
              onChange={(e) => {
                setRole(e.currentTarget.value);
                setEmail("");
                setPassword("");
              }}
            />
            <br />
            <br />
            <button
              id="btn-login"
              type="submit"
              className="btn btn-dark"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h5>
              Welcome {ctx.loginaccount.email} ({ctx.loginaccount.role})
            </h5>
            <p>You've successfully logged in.</p>
            <button
              id="btn-logout"
              type="submit"
              className="btn btn-dark"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )
      }
    />
  );
}
