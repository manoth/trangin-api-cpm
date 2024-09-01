'use strict';

import * as express from 'express';
const router = express.Router();
import { Inventory } from '../models/inventory';
const inventory = new Inventory();

router.post('/', async (req, res, next) => {
    try {
        const db = req.conn.mysql();
        const data = req.body;
        const rs = await inventory.add(db, data).then();
        res.json({ ok: true, message: 'บันทึกข้อมูลสำเร็จ!' });
    } catch (err) {
        res.json({ ok: false, message: err.message });
    }
});

router.put('/id/:id', async (req, res, next) => {
    try {
        const db = req.conn.mysql();
        const data = req.body;
        const id = req.params.id;
        const rs = await inventory.edit(db, data, id).then();
        res.json({ ok: true, message: 'แก้ไขข้อมูลสำเร็จ!' });
    } catch (err) {
        res.json({ ok: false, message: err.message });
    }
});

router.delete('/id/:id', async (req, res, next) => {
    try {
        const db = req.conn.mysql();
        const id = req.params.id;
        const rs = await inventory.del(db, id).then();
        res.json({ ok: true, message: 'ลบข้อมูลสำเร็จ!' });
    } catch (err) {
        res.json({ ok: false, message: err.message });
    }
});

router.get('/lists', async (req, res, next) => {
    try {
        const db = req.conn.mysql();
        const rs = await inventory.list(db).then();
        res.json({ ok: true, data: rs });
    } catch (err) {
        res.json({ ok: false, message: err.message });
    }
});

router.get('/list/id/:id', async (req, res, next) => {
    try {
        const db = req.conn.mysql();
        const id = req.params.id;
        const rs = await inventory.list(db, { id }).then();
        res.json({ ok: true, data: rs });
    } catch (err) {
        res.json({ ok: false, message: err.message });
    }
});

export default router;