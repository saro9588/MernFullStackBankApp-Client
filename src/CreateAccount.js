import React, {useState} from 'react';
import Card from './Card';
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccount(){
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState('');
  
    return (
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={show ? 
          <CreateForm setShow={setShow}/> : 
          <CreateMsg setShow={setShow}/>}
      />
    )
  }
  
  function CreateMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>Add another account</button>
    </>);
  }
  
  function CreateForm(props){

    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance]   = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
     
  
    function handle(e){
       //firebase
      e.preventDefault();
      createUserWithEmailAndPassword(auth,email,password)
    .then((useCredential) => { 
      console.log(useCredential);
      //var uid = user.uid; 
      // mongodbS
      const url = `/account/create/${name}/${email}/${password}/${balance}`;
      (async () => {
          const res  = await fetch(url);
          const data = await res.json();    
          console.log(data);        
      })();
      props.setShow(false);
    }).catch((error) => {
      // Handle authentication errors here
      if (error.code === 'auth/weak-password') {
        // Weak password error
        setErrorMessage('Password should be at least 6 characters.');
      } else {
        // Other authentication errors
        setErrorMessage('Must be a valid email address');
      }
    });
  }
  
    return (<>
  
      Name<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter name" 
        value={name} 
        onChange={e => setName(e.currentTarget.value)} /><br/>
  
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Create Account</button>
         <div className="error-message">{errorMessage}</div>
  
    </>);
  }

  export default CreateAccount;
  