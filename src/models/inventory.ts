import { Knex } from 'knex';

export class Inventory {

    add(db: Knex, data: any) {
        return db('computer_inventory').insert(data);
    }

    edit(db: Knex, dataUpdate: any, id: string) {
        return db('computer_inventory').update(dataUpdate).where('id', id);
    }

    list(db: Knex, where?: any) {
        return (where) ? db('computer_inventory').where(where) : db('computer_inventory');
    }

    del(db: Knex, id: string) {
        return db('computer_inventory').where('id', id).del();
    }

}