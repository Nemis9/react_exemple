import './App.css';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormFilter from "./components/FormFilter";
import {nanoid} from "nanoid"
import CardUser from "./components/CardUser";

function App() {

    const[users,setUsers] = useState([]);
    const companies = users.map((user) => {
        return user.company.name;
    })

    useEffect(() => {
        getAllUsers()
    }, []);


    function getAllUsers() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUsers(data))
    }

    function searchUsers({email="",username="", name="", company=""}={}) {
        let _users = users
        if(email !== "")
            _users = _users.filter((user) => user.email === email);
        if(username !== "")
            _users = _users.filter(user => user.username === username);
        if(name !== "")
            _users = _users.filter(user => user.name === name);
        if(company !== "")
            _users = _users.filter(user => user.company.name === company);
        setUsers(_users);
    }

    return (
      <Container>
          <Row>
              <Col>
                  <h2>Ricerca</h2>
                  <FormFilter key={nanoid()} searchUsers={searchUsers} companies={companies}/>
              </Col>

          </Row>
          <br/>
          <Row>
              <Col>
                  <Button variant="primary" type="button" onClick={() => getAllUsers()}>
                      Reset
                  </Button>
              </Col>

          </Row>
          <br/>
          <Row>
              {users.map(user => (
                  <Col key={nanoid()}>
                      <CardUser key={nanoid()} user={user}/>
                  </Col>
              ))
              }
          </Row>

      </Container>
  );
}

export default App;
