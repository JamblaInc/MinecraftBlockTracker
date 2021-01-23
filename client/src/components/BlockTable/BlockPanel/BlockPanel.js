import React from "react";
import Button from "react-bootstrap/Button";
import classes from "./BlockPanel.module.css";
import InputGroup from "react-bootstrap/InputGroup";

const BlockPanel = (props) => {
  return (
    <>
      <tr
        className={props.is_collected ? classes.Collected : ""}
        onClick={() => props.set_collected(props.id, !props.is_collected)}
      >
        <td>
          <img
            src={require(`../../../assets/images/${props.block_name}.png`)}
            alt={props.block_name}
          />
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
