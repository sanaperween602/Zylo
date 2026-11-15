import dotenv from 'dotenv';
import path from 'node:path';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d';
import contractJson from './contract.json';

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing. Check packages/db/.env');
}

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
    contract,
    url: databaseUrl,
});