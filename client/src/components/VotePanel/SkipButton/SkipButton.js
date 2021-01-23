import React from "react";
import Button from "react-bootstrap/Button";
import classes from "./SkipButton.module.css";

const SkipButton = (props) => {
  return (
    <>
      <Button
        className={classes.Button}
        onClick={() => props.newFilms()}
        variant="danger"
        size="lg"
        block
      >
        Skip
      </Button>
    </>
  );
};

export default SkipButton;
