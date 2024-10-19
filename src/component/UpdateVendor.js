import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateVendor = () => {
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
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const GetVendorById = async () => {
    try {
      const response = await fetch(`http://localhost:9999/vendor/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);
      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async (e) => {
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
        errors.phone = 'Phone Number is required';
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
        const response = await fetch(`http://localhost:9999/vendor/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        toast.success("Vendor updated successfully!");
        navigate("/vendor-list");
        console.log('Response:', result);
      } catch (error) {
        console.log(error);
      }

      console.log(formData);
    } else {
      console.log('Validation failed');
    }
  };

  useEffect(() => {
    GetVendorById();
  }, []);

  return (
    <>
      <h1 className="text-center mt-4">Update Vendor</h1>

      <Container>
        <div className="border rounded shadow-sm bg-light p-4">
          <Form className="m-4" onSubmit={handleUpdateSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Col sm="12">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  isInvalid={!!error.name}
                  value={formData.name}
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
                  value={formData.email}
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
                  value={formData.phone}
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
                  value={formData.category}
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
                  value={formData.address}
                />
                <Form.Control.Feedback type="invalid">
                  {error.address}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default UpdateVendor;
