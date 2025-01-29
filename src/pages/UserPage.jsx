import {Col, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import MyCard from "../components/card/MyCard";

export default function UserPage() {

    const {idUser} = useParams()
    const [user,setUser] = useState(null)
    const [albums,setAlbums] = useState([])
    const [comments,setComments] = useState([])
    const [posts,setPosts] = useState([])
    const [todos,setTodos] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${idUser}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
    }, [idUser]);

    useEffect(() => {
        if(user !== null){
            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
                .then(res => res.json())
                .then(data => {
                    setAlbums(data)
                })
            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/comments`)
                .then(res => res.json())
                .then(data => {
                    let size = data.length
                    if(size > 6)
                        size = 6
                    let dataReverse = data.reverse()
                    setComments(dataReverse.slice(0,size))
                })

            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                .then(res => res.json())
                .then(data => {
                    let size = data.length
                    if(size > 5)
                        size = 5
                    let dataReverse = data.reverse()
                    setPosts(dataReverse.slice(0,size))
                })
            fetch("https://jsonplaceholder.typicode.com/todos?userId="+idUser)
                .then(res => res.json())
                .then(data =>
                    setTodos(data)
                )
        }

    },[user])

  function navigateAlbum(idAlbum){
      navigate(`/album/${idAlbum}`);
  }

    return (
        user && (
        <section>
            <Row>
                <Col>

                    <MyCard title={user.name} subtitle={user.username} texts={[user.email, user.phone]} links={[user.website]}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <MyCard title="Address" texts={[user.address.street +" "+ user.address.suite + " " + user.address.city, "Zip Code: " + user.address.zipcode]} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <MyCard title="Azienda" subtitle={user.company.name} texts={[user.company.catchPhrase,user.company.bs]}/>
                </Col>
            </Row>
            <Row>
                <h2>Albums</h2>
                {albums.length > 0 &&
                <Col>
                    {albums.map(album =>
                         (<MyCard key={album.id} title={album.title} navigatePage={() => navigateAlbum(album.id)}/>))
                    }
                </Col>
                }
            </Row>
            <Row>
                <h2>Ultimi Commenti Inviati</h2>
                <Col>
                    {
                        comments.map(comment =>
                            (<MyCard key={comment.postId + "_" +comment.id} title={comment.name	} texts={[comment.body]} />))
                    }
                </Col>
            </Row>
            <Row>
                <h2>Ultimi Post Inviati</h2>
                <Col>
                    {
                        posts.map(post =>
                            (<MyCard key={post.id} title={post.title} texts={[post.body]}/>))
                    }
                </Col>
            </Row>
            <Row>
                <h2>Todos</h2>
                <Col>
                    {
                        todos.map(todo =>
                            (<MyCard key={todo.id} title={todo.title} texts={["Completato: " + (todo.completed ? "Si" : "No")]}/>))
                    }
                </Col>
            </Row>
        </section>)


)
}