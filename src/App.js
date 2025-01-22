import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormFilter from "./components/FormFilter";
import {nanoid} from "nanoid"
import CardUser from "./components/CardUser";

function App() {

    const[users,setUsers] = useState([]);
    const[filteredUsers,setFilteredUsers] = useState([]);
    const[companies,setCompanies] = useState([]);

    useEffect(() => {
        getAllUsers()
    }, []);


    function getAllUsers() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                setFilteredUsers(data)
                setCompanies(data.map((user) => {
                    return user.company.name;
                }))
            })

    }

    function searchUsers({email="",username="", name="", company=""}={}) {
        let _users = users
        if(email !== "")
            _users = _users.filter((user) => user.email === email);
        if(username !== "")
            _users = _users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()));
        if(name !== "")
            _users = _users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        if(company !== "")
            _users = _users.filter(user => user.company.name === company);
        setFilteredUsers(_users);
    }

    return (
      <Container>
          <Row>
              <Col>
                  <h2>Ricerca</h2>
                  <FormFilter searchUsers={searchUsers} companies={companies}/>
              </Col>

          </Row>
          <Row>
              {filteredUsers.map(user => (
                  <Col md="4" key={nanoid()}>
                      <CardUser key={nanoid()} user={user}/>
                  </Col>
              ))
              }
          </Row>

      </Container>
  );
}

export default App;
