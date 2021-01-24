import React, { useState, useEffect, useCallback } from "react";
import BlockPanel from "./BlockPanel/BlockPanel";
import classes from "./BlockTable.module.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import images from "../../assets/images/index";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

const BlockTable = (props) => {
  const { setLoading } = { ...props };

  const [blocks, setBlocks] = useState([]);

  const [percentage, setPercentage] = useState(0);

  const [showCompleted, setShowCompleted] = useState(true);

  const [showHidden, setShowHidden] = useState(false);

  const getBlocks = useCallback(async () => {
    try {
      const response = await fetch("/blocks/list", {
        method: "GET",
      });

      const parseRes = await response.json();

      setBlocks(parseRes);
      setLoading(false);
    } catch (error) {
      console.log(`Error message: ${error.message}`);
    }
  }, [setLoading]);

  useEffect(() => {
    setLoading(true);
    getBlocks();
  }, [getBlocks, setLoading]);

  useEffect(() => {
    let count = 0;
    let totalCount = 0;

    blocks.forEach((block) => {
      if (block.is_collected === true && block.is_used === true) {
        count++;
      }

      if (block.is_used === true) {
        totalCount++;
      }
    });

    setPercentage(((count / totalCount) * 100).toFixed(2));
  }, [blocks]);

  async function setCollected(id, is_collected) {
    try {
      const body = { block_id: id, is_collected: is_collected };

      const response = await fetch("/blocks/collected", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.set_collected) {
        setLoading(true);
        getBlocks();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function setUsed(id, is_used) {
    try {
      const body = { block_id: id, is_used: is_used };

      const response = await fetch("/blocks/used", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.set_used) {
        setLoading(true);
        getBlocks();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleHiddenButtonClick() {
    setShowHidden(!showHidden);
  }

  function handleCompletedButtonClick() {
    setShowCompleted(!showCompleted);
  }

  return (
    <Container fluid="sm" className={classes.BlockTable}>
      <h1 className={classes.Title}>Block Hunt Progress Tracker</h1>
      <ProgressBar className="m-3" now={percentage} label={`${percentage}%`} />
      <Row>
        <Table size="sm" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Image</th>
              <th>
                Block
                <Button
                  variant="secondary"
                  className="mt-1 btn-block"
                  size="sm"
                  onClick={() => handleCompletedButtonClick()}
                >
                  {showCompleted ? "Hide Collected" : "Show All"}
                </Button>
              </th>
              <th>
                Remove
                <Button
                  variant="secondary"
                  className="mt-1 btn-block"
                  size="sm"
                  onClick={() => handleHiddenButtonClick()}
                >
                  {showHidden ? "Hide Unused" : "Show All"}
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block, index) => (
              <BlockPanel
                key={block.block_uuid}
                id={block.block_uuid}
                block_name={block.block_name}
                is_collected={block.is_collected}
                is_used={block.is_used}
                set_collected={setCollected}
                set_used={setUsed}
                imgSrc={images[block.block_name + ".png"].default}
                show={
                  (!block.is_collected && block.is_used) ||
                  (block.is_collected && showCompleted && block.is_used) ||
                  (!block.is_used && showHidden && !block.is_collected) ||
                  (!block.is_used &&
                    showHidden &&
                    block.is_collected &&
                    showCompleted)
                }
              />
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default BlockTable;
