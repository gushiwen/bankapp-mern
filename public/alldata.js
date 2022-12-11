function AllData() {
  //const ctx = React.useContext(UserContext);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    highlightNavLink("nav-alldata"); // to highlight nav link

    firebase.auth().currentUser.getIdToken()
    .then(async (idToken) => {
        console.log('idToken:', idToken);
        let response = await fetch('/account/all', {
            method: 'GET',
            headers: {
                'Authorization': idToken
            }
        });
        let result = await response.json();
        setData(result);
        console.log(result);
        
    })
    .catch((error) => {
        console.log('error:', error);
    });
  }, []);

  return (
    <>
      <h5>All Bank Accounts</h5>
      <br />
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-md-3 g-4" id="cardsbox">
          {data.map((user) => (
            <div key={user.name} className="col">
              <Card
                outstyle="warning"
                header={user.name.toUpperCase() + "'s Account"}
                body={
                  <div style={{textAlign:"left"}}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Password: {user.password}</p>
                    <p>Role: {user.role}</p>
                    <p>Balance: {user.balance}</p>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
