 import { config } from 'dotenv';
 import { neon } from '@neondatabase/serverless';
 import { drizzle } from 'drizzle-orm/neon-http';


const sql = neon("postgresql://default:0Nji1vzUcQGh@ep-bold-grass-a4z6lbtd-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require");
export const db = drizzle({ client: sql });

// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'

// const connectionString = "postgresql://postgres.socsnvyjkojqieoyygiu:lrSPqJWt4R0IVBXO@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"

// const client = postgres(connectionString)
// export const db = drizzle(client);