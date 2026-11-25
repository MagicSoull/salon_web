import * as migration_20261123_220025_initial from './20261123_220025_initial';
import * as migration_20261123_222733_content_relations from './20261123_222733_content_relations';

export const migrations = [
  {
    up: migration_20261123_220025_initial.up,
    down: migration_20261123_220025_initial.down,
    name: '20261123_220025_initial',
  },
  {
    up: migration_20261123_222733_content_relations.up,
    down: migration_20261123_222733_content_relations.down,
    name: '20261123_222733_content_relations'
  },
];
