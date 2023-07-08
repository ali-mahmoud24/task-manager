import { Button, Card, Container, Stack } from 'react-bootstrap';
import Task from '../../models/task';
import { useContext, useEffect, useState } from 'react';
import AuthContextType from '../../models/authContext';
import { AuthContext } from '../../context/auth-context';

import axios from 'axios';

interface TaskDetailProps {
  taskId: string;
}

const TaskDetail = (props: TaskDetailProps) => {
  const { taskId } = props;

  const [loadedTask, setLoadedTask] = useState<Task>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        console.log(token);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setIsLoading(false);
          const loadedTask = response.data;
          setLoadedTask(loadedTask);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchTask();
  }, [taskId, token]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card>
        <Card.Header as="h1" className="text-center">
          {loadedTask?.title}
        </Card.Header>
        <Card.Body>
          {/* <Card.Title>Special title treatment</Card.Title> */}
          <div>
            <h2 className="text-center">Time Elapsed</h2>
            <h2 className="text-center">00:00:00</h2>
          </div>
          <Stack className="align-items-center">
            <div>
              <Button className="me-1" size="lg" variant="success">
                Clock-in
              </Button>
              <Button className="me-1" size="lg" variant="secondary">
                Pause
              </Button>
              <Button className="me-1" size="lg" variant="danger">
                Clock-out
              </Button>
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskDetail;
