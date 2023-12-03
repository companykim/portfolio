import React, { useContext } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {Fetch} from 'toolbox/Fetch';
import LoginModal from 'components/LoginModal';
import AppContext from "context/AppContextProvider";

export default function BBSNav() {
  const boardListUri = `http://localhost:8080/bb/anonymous/listAll`;
  const { auth } = useContext(AppContext);
  const isManager = auth?.roles?.includes("manager");

    return (<>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">SafeHaven</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/shelter">대피소 안내</Nav.Link>
              <Nav.Link href="/manual">대피요령</Nav.Link>
              <Nav.Link href="/">
                <Fetch uri={boardListUri} renderSuccess={renderSuccess} />
                  {isManager ? <Link key="dfhdefh" to={`/member-list/0000`}>
                    회원목록
                  </Link>: ""}
              </Nav.Link>
              <LoginModal/>
            </Nav>
          </Container>
        </Navbar>
        </>);

    function renderSuccess(boardList) {
      return <>
        {boardList.map(board => (
          <Link key={board.id} to={`/board`} 
              state={{ boardId : board.id, page: 1}}>
              &nbsp;&nbsp;{board.name}
          </Link>
        ))}
      </>
    }

}