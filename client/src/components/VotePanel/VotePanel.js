import React, { useState, useEffect } from "react";
import OptionButton from "./OptionButton/OptionButton";
import classes from "./VotePanel.module.css";
import SkipButton from "./SkipButton/SkipButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const VotePanel = (props) => {
  const [films, setFilms] = useState([
    {
      movie_id: "2c78346a-4d48-4009-8597-0679b2fc049c",
      title: "The Kid",
      year_released: "1921",
    },
    {
      movie_id: "2c78346a-4d48-4009-8597-0679b2fc049c",
      title: "The Kid",
      year_released: "1921",
    },
  ]);

  async function getFilms() {
    try {
      const response = await fetch("http://localhost:5000/movies/vote", {
        method: "GET",
      });

      const parseRes = await response.json();

      setFilms(parseRes);
    } catch (error) {
      console.log(`Error message: ${error.message}`);
    }
  }

  async function voteMovie(id) {
    try {
      const body = { movie_id: id };

      const response = await fetch("http://localhost:5000/movies/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.increment_vote) {
        getFilms();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    console.log("Use effect called");
    let isSubscribed = true;
    if (isSubscribed) {
      getFilms();
    }
    return () => (isSubscribed = false);
  }, []);

  return (
    <Container className={classes.VotePanel}>
      <Row>
        <OptionButton voteMovie={voteMovie} movie={films[0]} />
      </Row>
      <Row>
        <OptionButton voteMovie={voteMovie} movie={films[1]} />
      </Row>
      <Row>
        <SkipButton newFilms={getFilms} />
      </Row>
    </Container>
  );
};

export default VotePanel;
