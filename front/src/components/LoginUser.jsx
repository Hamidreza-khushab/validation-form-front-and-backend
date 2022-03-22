import Form from 'react-bootstrap/Form'
import  Button  from 'react-bootstrap/Button'
// import axios from 'axios'

const LoginUser = () => {
  return (
    <>
    <Form>
    
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            type="email"
            // onChange={(e)=>setEmail(e.target.value)}
              />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password"
            // onChange={(e)=>setPassword(e.target.value)}
            />
        </Form.Group>

  <Button 
  variant="primary"
//   onClick={()=>handelSaveUser()}
   >
    login
  </Button>
</Form>
    </>
  )
}

export default LoginUser