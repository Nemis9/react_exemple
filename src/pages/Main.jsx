import {Col, Row} from "react-bootstrap";
import FormFilter from "../components/FormFilter";
import {nanoid} from "nanoid";
import {useEffect, useState} from "react";
import MyCard from "../components/card/MyCard";
import {useLocation, useNavigate} from "react-router";

export default function Main(){

    const[users,setUsers] = useState([]);
    const[filteredUsers,setFilteredUsers] = useState([]);
    const[companies,setCompanies] = useState([]);
    const[state, setState] = useState({});

    const location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        getAllUsers()
    }, []);

    useEffect(() => {
        if(location.state !== null)
            searchUsers(location.state);
    },[users])

    async function  getAllUsersFromURL() {
        return fetch("https://jsonplaceholder.typicode.com/users");
    }
    function getAllUsers() {
        if(localStorage.getItem("users") === null){
            getAllUsersFromURL()
                .then(res => res.json())
                .then(data => {
                    setUsers(data)
                    setFilteredUsers(data)
                    setCompanies(data.map((user) => {
                        return user.company.name;
                    }))
                    localStorage.setItem("users", JSON.stringify(data));
                })
        } else{
            let data = JSON.parse(localStorage.getItem("users"))
            setUsers(data);
            setFilteredUsers(data);
            setCompanies(data.map((user) => {
                return user.company.name;
            }))
        }


    }

    function searchUsers({email="",username="", name="", company=""}={}, otherUsers=[]) {
        let _users = otherUsers.length > 0 ? otherUsers : users
        if(email !== "")
            _users = _users.filter((user) => user.email.toLowerCase().includes(email));
        if(username !== "")
            _users = _users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()));
        if(name !== "")
            _users = _users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        if(company !== "")
            _users = _users.filter(user => user.company.name === company);
        return _users
    }

    function searchUsers2({email="",username="", name="", company=""}={}) {
        debugger
        let _users= searchUsers({email:email, username:username, name:name, company:company});
        if(_users.length > 0) {
            setFilteredUsers(_users);
        } else{
            getAllUsersFromURL().then(res => res.json())
                .then(data => {
                    setUsers(data)
                    let _companies = data.map((user) => {
                        return user.company.name;
                    })
                    setCompanies(_companies)
                    localStorage.setItem("users", JSON.stringify(data));
                    _users = searchUsers({email:email, username:username, name:name, company:company}, data);
                    setFilteredUsers(_users);
                })
        }
    }

    function navigatePage(idUser){
        console.log("state = ", state)
        navigate(`/`,{state:state});
        navigate(`/user/${idUser}`);
    }
    let id = nanoid();

    return (
        <>
            <Row>
                <h2>Ricerca</h2>
                <Col>
                    <FormFilter searchUsers={searchUsers2} companies={companies} setState={setState} initialFilter = {location.state !== null ? location.state : null} />
                </Col>

            </Row>
            <Row>
                {

                    filteredUsers.map(user => {
                    return (<Col md="4" key={id+ "_" + user.id} >
                        <MyCard key={user.id} title={"User n° " + user.id} texts={["Name: "+ user.name, "Username: " + user.username, "Email: " + user.email, "Company: " + user.company.name]} navigatePage={() => navigatePage(user.id)}/>
                    </Col>)
                })
                }
            </Row>
        </>

    )
}