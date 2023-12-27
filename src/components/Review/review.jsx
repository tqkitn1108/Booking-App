// App.jsx

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Form, Button } from 'react-bootstrap'; // Import các thành phần Bootstrap


const Review = () => {
    const [inputText, setInputText] = useState('');
  
    const handleSubmit = () => {
      console.log('Đoạn text đã nhập:', inputText);
    };
  
    return (
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <div className="w-50 position-relative"> {/* Thêm class position-relative */}
          <Form>
            <Form.Group controlId="formBasicText" className='mb-5'>
              <Form.Label>Nhập đoạn text:</Form.Label>
              <Form.Control
                as="textarea"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-100"
                style={{ height: '120px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-center position-absolute bottom-0 start-50 translate-middle-x"> {/* Thêm class position-absolute và điều chỉnh vị trí bottom-0 start-50 translate-middle-x */}
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    );
  };
  
  export default Review;