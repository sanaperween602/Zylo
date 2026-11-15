import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
// import contractJson from './contract.json' with { type: 'json' };
import contractJson from './contract.json';
export const contract = contractFromJson(contractJson);
export const db = postgres({
    contract,
    url: process.env['DATABASE_URL'],
});
type ClientType = typeof db;
type OrmType = typeof db.orm;
type PublicType = typeof db.orm.public;
type UserType = typeof db.orm.public.User;