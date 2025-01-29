import {Card} from "react-bootstrap";

export default function MyCard({title, subtitle, imgUrl, texts, links, navigatePage}) {

    return (
        <Card onClick={navigatePage !== null ? () => navigatePage() : null}>
            {imgUrl && <Card.Img variant="top" src={imgUrl} alt={title} />}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {subtitle && <Card.Subtitle className="mb-2 text-muted"> {subtitle}</Card.Subtitle>}
                {texts && texts.map(text => (<Card.Text>{text}</Card.Text>))}
                {links && links.map(link => (<Card.Text>Website: <a href={link}>{link}</a></Card.Text>))
                }
            </Card.Body>
        </Card>
    )
}