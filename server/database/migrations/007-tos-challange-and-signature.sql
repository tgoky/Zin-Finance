ALTER TABLE tos_approval
ADD COLUMN signature VARCHAR NOT NULL DEFAULT '0x0',
ADD COLUMN message VARCHAR NOT NULL DEFAULT '0x0',
ADD COLUMN chain_id INTEGER NOT NULL DEFAULT 0;
