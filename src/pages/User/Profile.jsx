import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    password: '',
    verifyPassword: '', // Add verifyPassword field
    image: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/userProfile', {
          headers: { Authorization: token },
        });
        setUser(response.data.data);
        setFormData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      console.log('User is not logged in');
    } else {
      getUserProfile();
    }
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const { password, verifyPassword, ...updatedFormData } = formData; // Remove password and verifyPassword from formData
      if (password !== verifyPassword) {
        // Password and verification password don't match
        console.log("Password and verification password do not match");
        return;
      }
  
      const response = await axios.put(
        'http://localhost:5000/userProfile',
        updatedFormData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUser(response.data.data);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/userlogin');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <Container>
      <h1 className="text-center mt-4 mb-4">User Profile</h1>
      {user ? (
        <Card className="p-3 mb-3">
          {editMode ? (
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
  <Form.Label>New Password</Form.Label>
  <Form.Control
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
  />
</Form.Group>
<Form.Group controlId="verifyPassword">
  <Form.Label>Verify Password</Form.Label>
  <Form.Control
    type="password"
    name="verifyPassword"
    value={formData.verifyPassword}
    onChange={handleChange}
  />
</Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSave} className="mr-2">
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Form>
          ) : (
            <>
              <Card.Title className="mb-3">{user.name}</Card.Title>
              <Card.Text className="mb-2">{user.email}</Card.Text>
              <Card.Text>{user.gender}</Card.Text>
              {user.dateOfBirth && <Card.Text>{user.dateOfBirth}</Card.Text>}
              {user.phone && <Card.Text>{user.phone}</Card.Text>}
              {user.image && (
                <Card.Img
                  src={`http://localhost:5000/${user.image}`}
                  alt="User Image"
                  className="mt-3"
                  style={{ maxWidth: '200px' }}
                />
              )}
              <Button variant="primary" onClick={handleEdit} className="mt-3">
                Edit Details
              </Button>
              <Button variant="danger" onClick={handleLogout} className="ml-2">
                Logout
              </Button>
            </>
          )}
        </Card>
      ) : (
        <Card className="p-3 mb-3">
          <Card.Body>
            <Card.Text>Please log in to view your profile.</Card.Text>
            <Button variant="primary" onClick={() => navigate('/userlogin')}>
              Login
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Profile;