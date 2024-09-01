import { Knex } from 'knex';

export class Member {

    register(db: Knex, data: any) {
        return db('member').insert(data);
    }

    checkDupicateUsername(db: Knex, textVal: string) {
        return db('member').where('username', textVal);
    }

    checkDupicateIDCard(db: Knex, textVal: string) {
        return db('member').where('cid', textVal);
    }

    login(db: Knex, username: string, password: string) {
        return db('member').where('username', username).andWhere('password', password)
            .select('username', 'pname', 'fname', 'lname')
            .select(db.raw('MD5(cid) as cidEnc'));
    }

}