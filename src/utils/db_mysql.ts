import { createConnection } from 'mysql2';
import { promisify } from 'util';

export const connection = createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'M4dem@de',
  database: 'flash_coffe',
});

connection.query = promisify(connection.query).bind(connection);

connection.connect(function (err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as... ' + connection.threadId);
});
