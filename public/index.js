const initialUsers = [
  {name:'gushiwen',email:'gushiwen@mit.edu',password:'12345678',balance:100},
  {name:'abel',email:'abel@mit.edu',password:'12345678',balance:100},
  {name:'peter',email:'peter@mit.edu',password:'12345678',balance:100},
  {name:'william',email:'william@mit.edu',password:'12345678',balance:100},
];

function Spa() {
  //{loginid:'', users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}
  return (
    <HashRouter>
      <NavBar/>
      <UserContext.Provider value={{loginaccount:null, users:initialUsers}}>
        <div className="container" style={{padding: "20px"}}>
          <Route path="/" exact component={Home} />
          <Route path="/createaccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>      
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Spa />);

$(function () {
  $('[data-bs-toggle="tooltip"]').tooltip()
})