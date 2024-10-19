import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddVendor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    address: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateForm = () => {
      let isValid = true;
      let errors = {};

      // Name validation
      if (!formData.name.trim()) {
        errors.name = 'Name is required';
        isValid = false;
      }

      // Phone validation (numeric and required)
      if (!formData.phone || isNaN(formData.phone)) {
        errors.phone = 'Phone Number is required and must be numeric';
        isValid = false;
      }

      // Email validation (simple regex for basic email format)
      const emailRegex = /\S+@\S+\.\S+/;
      if (!formData.email.trim() || !emailRegex.test(formData.email)) {
        errors.email = 'Valid email is required';
        isValid = false;
      }

      // Category validation
      if (!formData.category.trim()) {
        errors.category = 'Category is required';
        isValid = false;
      }

      // Address validation
      if (!formData.address.trim()) {
        errors.address = 'Address is required';
        isValid = false;
      }

      setError(errors);
      return isValid;
    };

    if (validateForm()) {
      try {
        const response = await fetch(`http://localhost:9999/vendor/onboard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        toast.success('Vendor added successfully!');
        navigate("/vendor-list");
        console.log('Response:', result);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to add vendor. Please try again.');
      }

      console.log(formData);
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <>
      <h1 className="text-center mt-4">Add Vendor</h1>

      <Container className="mt-4">
        <div className="border rounded shadow-sm bg-light p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Col sm="12">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  isInvalid={!!error.name}
                />
                <Form.Control.Feedback type="invalid">
                  {error.name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm="12">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  isInvalid={!!error.email}
                />
                <Form.Control.Feedback type="invalid">
                  {error.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm="12">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  isInvalid={!!error.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {error.phone}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm="12">
                <Form.Control
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  onChange={handleChange}
                  isInvalid={!!error.category}
                />
                <Form.Control.Feedback type="invalid">
                  {error.category}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
              <Col sm="12">
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  onChange={handleChange}
                  isInvalid={!!error.address}
                />
                <Form.Control.Feedback type="invalid">
                  {error.address}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default AddVendor;
