import React, { useState, useEffect } from "react";
import BlockPanel from "./BlockPanel/BlockPanel";
import classes from "./BlockTable.module.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";

const VotePanel = (props) => {
  const [blocks, setBlocks] = useState([
    {
      block_name: "Acacia Button",
      img_url:
        "https://www.digminecraft.com/mechanism_recipes/images/acacia_button.png",
      is_used: true,
      is_collected: false,
    },
  ]);

  useEffect(() => {
    console.log("Use effect called");
    getBlocks();
  }, []);

  async function getBlocks() {
    try {
      const response = await fetch("http://localhost:5000/blocks/list", {
        method: "GET",
      });

      const parseRes = await response.json();

      setBlocks(parseRes);
      console.log(parseRes);
    } catch (error) {
      console.log(`Error message: ${error.message}`);
    }
  }

  async function setCollected(id, is_collected) {
    try {
      const body = { block_id: id, is_collected: is_collected };

      const response = await fetch("http://localhost:5000/blocks/collected", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.set_collected) {
        getBlocks();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function setUsed(id, is_used) {
    try {
      const body = { block_id: id, is_used: is_used };

      const response = await fetch("http://localhost:5000/blocks/used", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.set_collected) {
        getBlocks();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Container className={classes.VotePanel}>
      <Row>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Image</th>
              <th>Block</th>
              <th>Collected</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block, index) => (
              <BlockPanel
                key={index}
                block_name={block.block_name}
                is_collected={block.is_collected}
                is_used={block.is_used}
              />
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default VotePanel;
