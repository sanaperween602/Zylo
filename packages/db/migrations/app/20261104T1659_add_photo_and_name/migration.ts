#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3a6c8094036661b4e72f6d0666a8a2ef1957a9a7be610ddae51776198ef86257/contract';
import startContract from '../../snapshots/3a6c8094036661b4e72f6d0666a8a2ef1957a9a7be610ddae51776198ef86257/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/8f55aac478baa9a1b94847fda338f8c1251b14b22554c039bc377b77c1be6278/contract';
import endContract from '../../snapshots/8f55aac478baa9a1b94847fda338f8c1251b14b22554c039bc377b77c1be6278/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropNotNull({ schema: 'public', table: 'User', column: 'name' }),
      this.dropNotNull({ schema: 'public', table: 'User', column: 'photo' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
