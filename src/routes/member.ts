'use strict';

import * as express from 'express';
const router = express.Router();
import { Member } from '../models/member';
const member = new Member();

router.post('/register', async (req, res, next) => {
    try {
        const cryto = req.cryto;
        const db = req.conn.mysql();
        const data = req.body;
        data.password = cryto.md5(data.password);
        const rs = await member.register(db, data).then();
        res.json({ ok: true, message: 'บันทึกข้อมูลสำเร็จ!' });
    } catch (err) {
        res.json({ ok: false, message: err.message });
    }
});

router.get('/check/username/:username', async (req, res, next) => {
    try {
        const db = req.conn.mysql();
        const username = req.params.username;
        const rs = await member.checkDupicateUsername(db, username).then();
        res.json({ ok: (rs.length > 0) ? false : true, message: (rs.length > 0) ? 'Username นี้เคยใช้ลงทะเบียนแล้ว' : '' });
    } catch (err) {
        res.json({ ok: false, message: err.message });
    }
});

router.get('/check/IDCard/:cid', async (req, res, next) => {
    try {
        const db = req.conn.mysql();
        const cid = req.params.cid;
        const rs = await member.checkDupicateIDCard(db, cid).then();
        res.json({ ok: (rs.length > 0) ? false : true, message: (rs.length > 0) ? 'เลขบัตรประชาชนนี้เคยใช้ลงทะเบียนแล้ว' : '' });
    } catch (err) {
        res.json({ ok: false, message: err.message });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const jwt = req.jwt;
        const cryto = req.cryto;
        const db = req.conn.mysql();
        const username = req.body.username;
        const password = cryto.md5(req.body.password);
        const rs = await member.login(db, username, password).then();
        if (rs.length > 0) {
            const accessToken = jwt.sign(rs[0], '8h');
            res.json({ ok: true, accessToken });
        } else {
            res.json({ ok: false, message: 'Username หรือ Password ไม่ถูกต้อง!' });
        }
    } catch (err) {
        res.json({ ok: false, message: err.message });
    }
});

export default router;