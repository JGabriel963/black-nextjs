import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';


const sql = neon("postgresql://default:0Nji1vzUcQGh@ep-bold-grass-a4z6lbtd-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require");
export const db = drizzle({ client: sql });