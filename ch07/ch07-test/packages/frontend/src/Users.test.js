import { render, screen, fireEvent } from '@testing-library/react';
import Users from './Users';
import { useUsers } from './Users.hooks'
import renderer from 'react-test-renderer';

jest.mock('./Users.hooks', () => {
  return {
    useUsers: jest.fn()
  };
});

test('renders Users', () => {
  useUsers.mockImplementation(() => {
    return {
      users: ['alpha', 'bravo']
    }
  });

  render(<Users />);

  expect(screen.getByText('alpha')).toBeInTheDocument();
  expect(screen.getByText('bravo')).toBeInTheDocument();
});

test('추가 버튼의 submit에서 submit이 호출된다', () => {
  const submitMock = jest.fn()

  useUsers.mockImplementation(() => {
    return {
      users: ['alpha', 'bravo'],
      submit: submitMock
    }
  });

  render(<Users />);

  fireEvent.submit(screen.getByText('추가'));

  expect(submitMock).toHaveBeenCalledTimes(1);
});

test('Users 컴포넌트의 스냅샷 테스트', () => {
  useUsers.mockImplementation(() => {
    return {
      users: ['alpha', 'bravo']
    }
  });

  const component = renderer.create(<Users />);

  const tree = component.toJSON();
  // 스냅샷 파일과 비교
  expect(tree).toMatchSnapshot();
});
