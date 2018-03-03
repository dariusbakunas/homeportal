import { schema } from 'normalizr';

export const domainSchema = new schema.Entity('domains', {}, {
  idAttribute: 'id',
  processStrategy: (entity) => {
    return {
      id: entity.id,
      name: entity.name,
      uuid: entity.uuid,
      isActive: entity.isActive,
    };
  }
});
