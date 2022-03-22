import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Registration from './components/Registration'
import Container from 'react-bootstrap/Container'
import LoginUser from './components/LoginUser';
function App() {
  return (
    <Container>
      <br/>
      <br/>
      <LoginUser/>
      <br/>
      <hr/>
      <br/>
      <Registration/>
    </Container>
  );
}

export default App;
