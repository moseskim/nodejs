import './App.css';
import { useUsers } from './Users.hooks'

function User({ name }) {
  return <li style={{ padding: '10px' }}>{name}</li>;
}

// 사용자 정보 표시를 담당하는 컴포넌트
function Users() {
  const { users, setInputText, submit, addCounter } = useUsers();

  const userList = users.map((user) => {
    return <User key={user} name={user} />;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
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
      <button onClick={() => addCounter()}>업데이트</button>
    </div>
  );
}

export default Users;
