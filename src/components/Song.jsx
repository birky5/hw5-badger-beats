import { useContext } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import { Card, Button } from "react-bootstrap";

const Song = (props) => {
    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    // function that changes the state (if a favorite or not)
    function changeState() {
        //console.log(check);
        if (favorites.includes(props.id)) {
            setFavorites((oldFavorites) => {
                return oldFavorites.filter(song => song !== props.id)
            })
            // Citation of the StackOverflow that helped me with this
            // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
        } else {
            setFavorites((oldFavorites) => {
                return [...oldFavorites, props.id]
            })
        }
    }

    return <Card className="card h-100">
        <Card.Img src={props.image} alt={props.title}/>
        <Card.Body className="card-body d-flex flex-column">
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle>{props.artist}</Card.Subtitle>
            <Card.Text className="text-left">{props.genre} | {props.year} | {props.length}</Card.Text>
            <Button className="align-self-bottom mt-auto" variant={!favorites.includes(props.id) ? "primary" : "danger"} onClick={changeState}>{!favorites.includes(props.id) ? "Add to Favorites" : "Remove from Favorites"}</Button>
        </Card.Body>
    </Card>
}

    // Citation of the StackOverflow that helped me with the Button className and Card.Body className
    // https://stackoverflow.com/questions/48406628/bootstrap-align-button-to-the-bottom-of-card#:~:text=Just%20add%20the%20align%2Dself,to%20align%20at%20the%20bottom.

export default Song;