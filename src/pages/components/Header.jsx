import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import logo from "../../uploads/logo.jpg";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    changeHeader();
  }, []);

  const changeHeader = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return setIsLoggedIn(false); // add check for token existence
      const response = await axios.get('http://localhost:5000/Header', {
        headers: { Authorization: token },
      });
      console.log(response.data);
      setIsLoggedIn(true);
      setUser(response.data.data.name);
      setImage(response.data.data.image);
      // response.data.data contains the user name
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload(true);
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand className="d-flex align-items-center justify-content-center">
            <a href="/" className="d-flex align-items-center" style={{ textDecoration: 'none' }}>
              <img
                src={logo}
                alt="Logo"
                className="mr-2 rounded-circle"
                style={{ width: "45px", marginLeft: "auto", marginRight: "auto" }}
              />
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>דף הבית</span>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="/Posts">כל הפוסטים</Nav.Link>
              <Nav.Link href="/AboutUs">עלינו</Nav.Link>
            </Nav>
            <Nav className="ms-auto mb-2 mb-lg-0">
              {!isLoggedIn ? (
                <>
                  <Nav.Link href="/register">הרשמה</Nav.Link>
                  <Nav.Link href="/UserLogin">התחבר/י</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleLogout}>התנתק/י</Nav.Link>
                  <Nav.Link href="/Profile">הפרופיל שלי</Nav.Link>
                  <Nav.Link href="/AllMessages"> 📩 הודעות</Nav.Link>
                  <Nav.Link disabled>ברוך הבא, {user}</Nav.Link>
                  <img
                    src={`http://localhost:5000/${image}`}
                    alt="Logo"
                    className="mr-2 rounded-circle"
                    style={{ width: "45px", borderStyle: 'double', borderColor: 'white' }}
                  />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
