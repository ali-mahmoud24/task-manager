import { Button, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../../context/auth-context';
import { useContext } from 'react';
import AuthContextType from '../../models/authContext';
import { useRouter } from 'next/router';

function Navigation() {
  const { token, logout } = useContext(AuthContext) as AuthContextType;

  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.replace('/');
  };

  return (
    // <Navbar className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="#home">Task Managment</Navbar.Brand>
    //     <Navbar.Toggle />
    //     <Navbar.Collapse className="justify-content-end">
    //       <Navbar.Text>
    //         Signed in as: <a href="#login">Mark Otto</a>
    //       </Navbar.Text>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    <Navbar bg="info" fixed="top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        {/* <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav> */}

        {token ? (
          <Button onClick={logoutHandler} variant="secondary">
            Logout
          </Button>
        ) : (
          <Button variant="secondary">Login</Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
