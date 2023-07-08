import axios from 'axios';

import { Accordion, Badge, Button, Stack } from 'react-bootstrap';

import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import UpdateTask from './UpdateTask';
import { AuthContext } from '../../context/auth-context';
import AuthContextType from '../../models/authContext';

interface TaskItemProps {
  id: string;
  title: string;
  status: string;
  timeSpent: string;
  onDelete: (taskId: string) => void;
}

const TaskItem = (props: TaskItemProps): JSX.Element => {
  const { id, title, status, timeSpent } = props;
  const exploreLink = `/tasks/${id}`;

  const statusBg = status === 'Completed' ? 'success' : 'danger';

  const router = useRouter();

  const { token } = useContext(AuthContext) as AuthContextType;

  const navigateToTask = () => {
    router.push(exploreLink);
  };

  const deleteTaskHandler = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        props.onDelete(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [show, setShow] = useState<boolean>(false);

  const showModal = () => {
    setShow(true);
  };

  return (
    <>
      <Accordion.Item eventKey={title}>
        <Accordion.Header>
          <div>{title}</div>
          <h3 style={{ marginLeft: '6rem' }}>
            <Badge pill bg={statusBg}>
              {status}
            </Badge>
          </h3>
        </Accordion.Header>

        <Accordion.Body>
          {/* <div className="mb-3">Time Spent: {timeSpent}</div> */}
          <Stack direction="horizontal">
            <Button variant="primary" onClick={navigateToTask}>
              Start task
            </Button>

            <div className="ms-auto">
              <Button onClick={showModal} variant="secondary">
                Edit
              </Button>
              <Button onClick={deleteTaskHandler} variant="danger">
                Delete
              </Button>
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>

      <UpdateTask
        show={show}
        setShow={setShow}
        taskId={id}
        task={{ title, timeSpent, id, status }}
      />
    </>
  );
};

export default TaskItem;
