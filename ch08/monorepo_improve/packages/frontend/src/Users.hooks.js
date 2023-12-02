import { useState, useEffect } from 'react';

const getUsers = async () => {
  const response = await fetch('/api/users');
  const body = response.json();
  return body;
};

// 사용자 정보 취득과 변경을 담당하는 커스텀 훅
export function useUsers() {
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

  const submit = () => {
    const newUsers = [...users, inputText];
    setUsers(newUsers);
  };

  const addCounter = () => {
    setCounter(counter + 1);
  }

  return {
    users,
    setInputText,
    submit,
    addCounter
  }
}
