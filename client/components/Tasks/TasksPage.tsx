import axios from 'axios';
import Task from '../../models/task';

import { useContext, useEffect, useState } from 'react';

import { Container, Row, Button, Col } from 'react-bootstrap';

import NewTask from './NewTask';
import TasksList from './TasksList';

import { AuthContext } from '../../context/auth-context';
import AuthContextType from '../../models/authContext';

const TasksPage = () => {
  const [loadedTasks, setLoadedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setIsLoading(false);
          const loadedTasks = response.data;
          setLoadedTasks(loadedTasks);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchTasks();
  }, [token]);

  const [show, setShow] = useState<boolean>(false);

  const showModal = () => {
    setShow(true);
  };

  return (
    <>
      <NewTask show={show} setShow={setShow} />

      <Container
        style={{
          borderRadius: '20px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
          padding: '1rem 2rem',
        }}
      >
        <Row className="justify-content-md-center align-items-center">
          <h1 className="text-center">My Tasks</h1>
          <Col
            className="mb-2"
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              style={{ width: '80%' }}
              variant="primary"
              onClick={showModal}
            >
              Add Task +
            </Button>
          </Col>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <TasksList tasks={loadedTasks} setTasks={setLoadedTasks} />
          )}
        </Row>
      </Container>
    </>
  );
};

export default TasksPage;
