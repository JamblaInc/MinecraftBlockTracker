import React from "react";
import classes from "./Layout.module.css";

const layout = (props) => (
  <div className={classes.Body}>
    <main className={classes.Content}>{props.children}</main>
  </div>
);

export default layout;
