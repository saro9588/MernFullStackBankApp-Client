import Card from "./Card";

function Home(){
    return (
      <Card
        txtcolor="black"
        header="MIT Bank Landing Module"
        title="Welcome to the Bank App"
        text="You can create an account then deposit/withdraw money!"
        body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
      />
    );  
  }

  export default Home;
