#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/6a6b4de5c078479323718f5bd035ffa2ec127ec10a703141324ee01268bc77a8/contract';
import endContract from '../../snapshots/6a6b4de5c078479323718f5bd035ffa2ec127ec10a703141324ee01268bc77a8/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/8f55aac478baa9a1b94847fda338f8c1251b14b22554c039bc377b77c1be6278/contract';
import startContract from '../../snapshots/8f55aac478baa9a1b94847fda338f8c1251b14b22554c039bc377b77c1be6278/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
