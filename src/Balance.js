import React from 'react';
import Card from './Card';

function Balance(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');  
  
    return (
      <Card
        bgcolor="info"
        header="Balance"
        status={status}
        body={show ?
          <BalanceForm setShow={setShow} setStatus={setStatus}/> :
          <BalanceMsg setShow={setShow}/>}
      />
    )
  
  }
  
  function BalanceMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Check balance again
      </button>
    </>);
  }
  
  function BalanceForm(props){
    const [email, setEmail]   = React.useState('');
    const [balance, setBalance] = React.useState('');   
  
    async function handle(){
      const userBalanceUrl = `/account/findOne/${email}`;
      try {
        const res = await fetch(userBalanceUrl);
        const data = await res.text();
        if (!data) {
          props.setStatus('fail!')      
          return data.balance;      
        }
        console.log(data);
        props.setStatus(data); 
        props.setShow(false);
        return;
      } catch (error) {
        console.error('Error during fetch:', error);
        props.setStatus('User not found');
       }
    }
  
    return (<>
  
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Check Balance
      </button>
  
    </>);
  }

  export default Balance;