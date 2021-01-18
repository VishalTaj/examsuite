import { Navbar } from 'react-bootstrap';
import logo from '../../logo.svg';

export default function EsHeader() {
  return (
    <>
      <Navbar bg="light">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        <Navbar.Brand href="/">Exam Suite</Navbar.Brand>
      </Navbar>
    </>
  );
}