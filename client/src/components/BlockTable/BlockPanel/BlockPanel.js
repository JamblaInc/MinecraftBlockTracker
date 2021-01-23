import React from "react";
import Button from "react-bootstrap/Button";
import classes from "./BlockPanel.module.css";

const BlockPanel = (props) => {
  return (
    <>
      <tr
        className={props.is_collected ? classes.Collected : ""}
        onClick={() => props.set_collected(props.id, !props.is_collected)}
      >
        <td>
          <img src={props.imgSrc} />
        </td>
        <td>{props.block_name}</td>

        <td>
          <Button>{props.is_used ? "Remove" : "Add"}</Button>
        </td>
      </tr>
    </>
  );
};

export default BlockPanel;
