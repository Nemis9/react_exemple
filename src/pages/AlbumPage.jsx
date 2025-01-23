import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import MyCard from "../components/card/MyCard";

export default function AlbumPage(){
    const {idAlbum} = useParams()
    const[album,setAlbum] = useState(null)
    const [photos,setPhotos] = useState([])

    useEffect(() => {
        console.log("")
        fetch("https://jsonplaceholder.typicode.com/albums/"+idAlbum)
            .then(res => res.json())
            .then(data => {
                setAlbum(data)
            })
    }, [idAlbum]);

    useEffect(() => {
        console.log("chiamata")
        if(album !== null){
            fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setPhotos(data)
                })
        }

    }, [album]);
    return (album &&
        <section>
            <Row>
                <h2>{album.title}</h2>
            </Row>
            { photos &&
                <Row>
                    <Col>
                        {photos.map(photo =>(
                                <MyCard key={photo.id} imgUrl={photo.url} title={photo.title}/>
                            ))
                            }
                    </Col>
                </Row>
            }
        </section>)
}