import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// refresher on how to connect,
// I use pg-cli for all direct database connections and elephantsql for easy instances setup
// the password goes into your .pgpass file
// the command for launching sql goes in your bash_profile and will look like this
// pgcli -h <dbURL> -U <DBUSER> -d <DBNAME>'
export const pool = new Pool({ connectionString: process.env.PROJ_CONNECTION_STRING });
