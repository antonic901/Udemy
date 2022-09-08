import { rm } from "fs";
import { join } from "path";
import { promisify } from "util";
import { getConnection } from 'typeorm'

// This runs before any test is execuded
global.beforeEach(async () => {
    const deleteFile = promisify(rm);
    try {
        await deleteFile(join(__dirname, '..', 'test.sqlite'));
    } catch (err) { }
});

// global.afterEach(async () => {
//     const conn = getConnection();
//     await conn.close(); 
// });