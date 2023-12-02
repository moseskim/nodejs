import { useState, useEffect } from 'react';
import './App.css';

function User({ name }) {
  return <li style={{ padding: '8px' }}>{name}</li>;
}

const getUsers = async () => {
  const response = await fetch('/api/users');
  const body = response.json();
  return body;
};

function Users() {
  const [users, setUsers] = useState([]);
  const [inputText, setInputText] = useState('');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getUsers()
      .then((data) => {
        const users = data.users.map((user) => user.name);
        return users;
      })
      .then((users) => setUsers(users))
      .catch((error) => console.error(error));
  }, [counter]);

  const userList = users.map((user) => {
    return <User key={user} name={user} />;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUsers = [...users, inputText];
    setUsers(newUsers);
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="App">
      <ul>{userList}</ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">추가</button>
      </form>
      <button onClick={() => setCounter(counter + 1)}>업데이트</button>
    </div>
  );
}

export default Users;
