import Task from '../../models/task';

import { useMemo, useState } from 'react';

import TaskSearch from './TaskSearch';
import TaskItem from './TaskItem';
import Accordion from 'react-bootstrap/Accordion';

interface TasksListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<any>>;
}

const TasksList = (props: TasksListProps) => {
  const { tasks } = props;

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  type SearchInputs = {
    title?: string;
    status?: string;
  };

  const findTasksHandler = ({ title, status }: SearchInputs) => {
    if (title !== undefined) {
      setTitle(title);
    }

    if (status !== undefined) {
      setStatus(status);
    }
  };

  const filteredTasks = useMemo(
    () =>
      tasks.filter(
        (task: Task) =>
          task.title.toLowerCase().includes(title.toLowerCase()) &&
          (status ? task.status === status : true)
      ),
    [tasks, title, status]
  );

  const taskDeletedHandler = (deletetaskId: string) => {
    props.setTasks((prevTasks: Task[]) =>
      prevTasks.filter((task: Task) => task.id !== deletetaskId)
    );
  };

  const [show, setShow] = useState<boolean>(false);

  const showModal = () => {
    setShow(true);
  };

  return (
    <>
      <TaskSearch title={title} status={status} onSearch={findTasksHandler} />
      <Accordion
        data-bs-theme="dark"
        defaultActiveKey="0"
        flush
        style={{ width: '80vw' }}
      >
        {filteredTasks.map((task: Task) => (
          <TaskItem
            key={task._id}
            id={task._id}
            title={task.title}
            status={task.status}
            timeSpent={task.timeSpent}
            onDelete={taskDeletedHandler}
          />
        ))}
      </Accordion>
    </>
  );
};

export default TasksList;
