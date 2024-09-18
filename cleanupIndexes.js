const { Sequelize } = require('sequelize');

const sequelize = require('./config/db');

const dropAllTables = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Get all table names
    const tables = await sequelize.query('SHOW TABLES', { type: Sequelize.QueryTypes.SELECT });
    const tableNames = tables.map(table => Object.values(table)[0]);

    // Drop all tables
    for (const tableName of tableNames) {
      console.log(`Dropping table: ${tableName}`);
      try {
        await sequelize.query(`DROP TABLE ${tableName}`);
        console.log(`Table ${tableName} dropped successfully.`);
      } catch (error) {
        console.error(`Error dropping table ${tableName}:`, error);
      }
    }

    console.log('All tables dropped.');
  } catch (error) {
    console.error('Error during dropping tables:', error);
  }
};

const removeDuplicateIndexes = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Get all table names again after tables are dropped
    const tables = await sequelize.query('SHOW TABLES', { type: Sequelize.QueryTypes.SELECT });
    const tableNames = tables.map(table => Object.values(table)[0]);

    // Function to remove duplicate indexes
    const removeDuplicates = async (tableName) => {
      const indexes = await sequelize.query(`SHOW INDEX FROM ${tableName}`, { type: Sequelize.QueryTypes.SELECT });

      const indexMap = {};
      const duplicateIndexes = [];

      indexes.forEach(index => {
        const key = index.Column_name; // Unique key based on columns
        const name = index.Key_name;

        if (indexMap[key] && indexMap[key] !== name) {
          duplicateIndexes.push(name);
        } else {
          indexMap[key] = name;
        }
      });

      // Remove duplicate indexes
      for (const indexName of duplicateIndexes) {
        console.log(`Dropping duplicate index: ${indexName} from table: ${tableName}`);
        try {
          await sequelize.query(`ALTER TABLE ${tableName} DROP INDEX ${indexName}`);
        } catch (error) {
          console.error(`Error removing index ${indexName}:`, error);
        }
      }
    };

    // Remove duplicate indexes from all tables
    for (const tableName of tableNames) {
      await removeDuplicates(tableName);
    }

    console.log('Duplicate indexes removed from all tables.');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await sequelize.close();
  }
};

// Execute table deletion first and then index removal
(async () => {
  await removeDuplicateIndexes();
  // await dropAllTables();
})();
