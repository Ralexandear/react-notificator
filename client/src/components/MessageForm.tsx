import React, { useRef, useEffect, useState } from 'react';
import { Container, FloatingLabel, Form, Button } from 'react-bootstrap';

const MessageForm = () => {
  const buttonRef = useRef(null);
  const [totalHeight, setTotalHeight] = useState('100%');

  useEffect(() => {
    if (buttonRef.current) {
      //@ts-expect-error
      const buttonHeight = buttonRef.current.getBoundingClientRect().height;
      const mb3Height = 16; // Пример высоты mb-3 (можете подставить свое значение)

      const calculatedHeight = `calc(100% - ${buttonHeight + mb3Height}px)`;
      setTotalHeight(calculatedHeight);
    }
  }, []);

  return (
    <Container>
      <FloatingLabel
        className='h-100'
        controlId="floatingTextarea2"
        label="Текст сообщения"
      >
        <Form.Control
          className='mb-3'
          as="textarea"
          placeholder="Текст сообщения"
          style={{ resize: 'none', height: totalHeight, minWidth: '250px'}}
        />
        <Button
          ref={buttonRef}
          className='btn btn-green'
          style={{ width: '100%' }}
          type="submit"
        >
          Отправить
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
          </svg>
        </Button>
      </FloatingLabel>
    </Container>
  );
};

export default MessageForm;
