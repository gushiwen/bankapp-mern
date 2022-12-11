function Home(){
  React.useEffect(() => {
    highlightNavLink("nav-home"); // to highlight nav link
  });

  return (
    <Card
      outstyle="info"
      header="American Bank"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
