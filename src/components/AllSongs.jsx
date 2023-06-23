import { useEffect, useState } from "react";
import { useContext } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import { Container, Row, Col } from "react-bootstrap";
import Song from "./Song";

const AllSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const [songs, setSongs] = useState([]);
    //console.log(favorites);

    const totalSongs = songs.reduce((accum, currentValue) => {
        accum += 1;
        return accum;
    }, 0);

    const totalGenres = songs.reduce((accum, currentObject) => {
        if (!accum.includes(currentObject.genre)) {
            accum.push(currentObject.genre);
        }

        return accum;
    }, []);

    const totalSeconds = songs.reduce((accum, currentObject) => {
        let split = currentObject.length.split(":");
        accum += parseInt(split[0] * 60) + parseInt(split[1]);

        return accum;
    }, 0);

    useEffect(() => {
        AddAllSongs();
    }, []);

    function AddAllSongs() {
        fetch('https://cs571.org/s23/hw5/api/songs', {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_1c5bcd34828a97342b93"
            }
        })
        .then(res => res.json())
        .then(data => {
            setSongs(data);
            //setFavorites(data);
            //console.log(data);
        })
        .catch(error => console.error(error))
    }

    return <div>
        <h1>Songs</h1>
        <p>We have {totalSongs} songs in {totalGenres.length} genres for a total of {totalSeconds} seconds of music!</p>
        <Container fluid>
            <Row>
                {
                    songs.map(song => {
                        return <Col className="my-xl-2 my-lg-2 my-md-2 my-sm-2 my-xs-2" key={song.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Song
                            id = {song.id}
                            title = {song.title}  
                            artist = {song.artist}
                            genre = {song.genre}
                            image = {song.img}
                            length = {song.length}
                            year = {song.year}             
                        /> 
                        </Col> }
                    )
                }
            </Row>
        </Container>
    </div>
}

export default AllSongs;