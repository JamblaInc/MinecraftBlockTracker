CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SCHEMA system;


DROP 
  TABLE IF EXISTS system.blocks;

CREATE TABLE system.blocks (
  block_uuid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  block_name VARCHAR(255),
  img_url TEXT,
  is_used BOOLEAN DEFAULT TRUE,
  is_collected BOOLEAN DEFAULT FALSE
);

-- Load the data
\COPY system.blocks(block_name, img_url) FROM 'C:\Users\Jake\Desktop\MC Block Tracker\database\db_scripts\blocks.csv' with (format csv);

-- Function to disable an item
CREATE 
OR REPLACE FUNCTION system.set_used(id uuid, used BOOLEAN) RETURNS INT AS $$ 
BEGIN
   UPDATE
      system.blocks 
   SET
      is_used = used
   WHERE
      block_uuid = id;
      
  RETURN 200;
END;
$$ LANGUAGE plpgsql;

-- Function to set collected status
CREATE 
OR REPLACE FUNCTION system.set_collected(id uuid, collected BOOLEAN) RETURNS INT AS $$ 
BEGIN
   UPDATE
      system.blocks 
   SET
      is_collected = collected
   WHERE
      block_uuid = id;
      
  RETURN 200;
END;
$$ LANGUAGE plpgsql;