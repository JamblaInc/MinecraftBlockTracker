import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import classes from "./BlockPanel.module.css";
import InputGroup from "react-bootstrap/InputGroup";

import myimg from "../../../assets/images/Yellow Dye.png";

const BlockPanel = (props) => {
  return (
    <>
      <tr>
        <td>
          <img src={myimg} />
        </td>
        <td>{props.block_name}</td>
        <td>
          <InputGroup.Checkbox />
        </td>
        <td>
          <Button>{props.is_used ? "Remove" : "Add"}</Button>
        </td>
      </tr>
    </>
  );
};

export default BlockPanel;
