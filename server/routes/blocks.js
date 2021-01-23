const router = require("express").Router();
const pool = require("../utils/database");
const { Pool } = require("pg");

// Change the collected status
router.post("/collected", async (req, res) => {
  try {
    // TODO add NONCE in pgsql func to prevent REPLAY attack
    // Destructure the req.body (id, collected)
    const { block_id, is_collected } = req.body;

    // Set the new collected status
    const response = await pool.query(
      "SELECT * FROM system.set_collected($1, $2)",
      [block_id, is_collected]
    );

    // Return the response
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Change the collected status
router.post("/used", async (req, res) => {
  try {
    // TODO add NONCE in pgsql func to prevent REPLAY attack
    // Destructure the req.body (id, collected)
    const { block_id, is_used } = req.body;

    // Set the new collected status
    const response = await pool.query("SELECT * FROM system.set_used($1, $2)", [
      block_id,
      is_used,
    ]);

    // Return the response
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get all blocks info
router.get("/list", async (req, res) => {
  try {
    const blocks = await pool.query(
      "SELECT block_name, img_url, is_used, is_collected FROM system.blocks ORDER BY block_name ASC"
    );

    res.json(blocks.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
