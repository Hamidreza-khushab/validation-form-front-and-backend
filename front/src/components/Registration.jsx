import Form from 'react-bootstrap/Form'
import  Button  from 'react-bootstrap/Button'
import axios from 'axios'
import {useState , useEffect} from 'react'
function Registration() {
    const [user , setUser] = useState({})
    const [firstName , setFirstName] = useState();
    const [lastName , setLastName] = useState();
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const [error  ,setError] = useState([]);
useEffect(() => {
        const axiosPost = async () =>
    {
            try
                   {
                const res = await axios.post('http://localhost:3001/users/registration', user);
                if(res.status === 200)
                    {
                        console.log("user", res.user);
                    }
            }
        catch (err)
        {
            console.log('after res err',err.response.data.errors);
            setError(err.response.data.errors);
             console.log('befor useState',error)
        } 
    }
 axiosPost()
}, [user]);

  const handelSaveUser = () =>
  {
     setUser({firstName: firstName ,lastName : lastName , email: email, password: password }); 
  }
  
   console.log('error length',error.length);
  return (
    <>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicfirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
            type="text"
            onChange={(e)=>setFirstName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasiclastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
            type="text"
            onChange={(e)=>setLastName(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
              />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
        </Form.Group>
  <Button 
  variant="primary"
  onClick={()=>handelSaveUser()}
   >
    save
  </Button>
  {/* {
      (error.length>0)
      ?
      error.map(e => <p>{e.msg}</p>)
      :
        alert('ok')
  } */}
</Form>
    </>
  )
}

export default Registration