import React from "react";
import classes from "./Backdrop.module.css";
import Spinner from "react-bootstrap/Spinner";

const backdrop = (props) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}>
      <Spinner className={classes.Progress} animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : null;
export default backdrop;
