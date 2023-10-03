import React, {useState} from 'react';
import Card from './Card';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";


function Login(){
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState('');    
  
    return (
      <Card
        bgcolor="secondary"
        header="Login"
        status={status}
        body={show ? 
          <LoginForm setShow={setShow} setStatus={setStatus}/> :
          <LoginMsg setShow={setShow} setStatus={setStatus}/>}
      />
    ) 
  }
  
  function LoginMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Authenticate again
      </button>
    </>);
  }
  
  function LoginForm(props){
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    function handle(e){
      //firebase
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        console.log(useCredential);
        //mongo
        const url = `/account/login/${email}/${password}`;
        (async () => {
          const res = await fetch(url);
          const user = await res.json();
          console.log(user);
          console.log(email, password);
        })();
        props.setShow(false);
      }).catch((error) => {
        // Handle authentication errors here
        if (error.code === 'auth/invalid-login-credentials') {
          // Incorrect password error
          setErrorMessage('Incorrect credentials. Please try again.');
        } else {
          // Other authentication errors
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
    }
    
  
  
    return (<>
  
      Email<br/>
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
  
      <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
      <div className="error-message">{errorMessage}</div>
      
    </>);
  }

  export default Login;