import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Formik } from 'formik';
import * as yup from 'yup';
import { useContext, useState } from 'react';

import axios from 'axios';
import { AuthContext } from '../../context/auth-context';
import AuthContextType from '../../models/authContext';

interface NewTaskProps {
  show: boolean;
  setShow: (val: boolean) => void;
}

const NewTask = (props: NewTaskProps) => {
  const { show, setShow } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token } = useContext(AuthContext) as AuthContextType;

  const handleClose = () => setShow(false);

  const handleFormSubmit = async (values: any) => {
    const taskData = {
      title: values.title,
    };
    try {
      setIsLoading(true);

      const addTaskResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={schema}
        >
          {({
            isValid,
            isSubmitting,
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Add a new Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className="text-center">Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    isValid={touched['title'] && !errors['title']}
                    isInvalid={touched['title'] && errors['title']}
                    feedback={errors['title']}
                  />

                  <Form.Control.Feedback type="invalid">
                    Tile can't be empty.
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  disabled={!isValid || isSubmitting}
                  variant="success"
                  type="submit"
                >
                  Add Task
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default NewTask;

const schema = yup.object({
  title: yup.string().required(),
});

const initialValues = {
  title: '',
};
