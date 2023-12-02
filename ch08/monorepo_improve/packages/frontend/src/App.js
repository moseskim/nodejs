// 라우터 읽기
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './Users';

// `/`일 떄의 표시
function Top() {
  return <div>Top</div>;
}

function App() {
  return (
    <Router>
      {/* 페이지 상단에 내비게이션 링크를 설치 */}
      <nav>
        <ul>
          <li>
            <Link to="/">Top</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        {/* `/users`일 때 표시하는 컴포넌트를 설정 */}
        <Route path="/users" element={<Users />} />
        {/* `/`일 때 표시하는 컴포넌트를 설정 */}
        <Route path="/" element={<Top />} />
      </Routes>
    </Router>
  );
}

export default App;
