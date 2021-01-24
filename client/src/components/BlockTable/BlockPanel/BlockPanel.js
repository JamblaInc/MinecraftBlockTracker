import React from "react";
import Button from "react-bootstrap/Button";
import classes from "./BlockPanel.module.css";

const BlockPanel = (props) => {
  return (
    <>
      {props.show ? (
        <tr className={props.is_collected ? classes.Collected : ""}>
          <td
            onClick={() => props.set_collected(props.id, !props.is_collected)}
          >
            <img src={props.imgSrc} alt={props.block_name} />
          </td>
          <td
            onClick={() => props.set_collected(props.id, !props.is_collected)}
          >
            {props.block_name}
          </td>

          <td>
            <Button
              onClick={() => props.set_used(props.id, !props.is_used)}
              variant="secondary"
              className={classes.Front}
            >
              {props.is_used ? "-" : "+"}
            </Button>
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default BlockPanel;
