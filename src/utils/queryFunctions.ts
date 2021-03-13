import { pool } from '../models/pool';
import { create, destroy, seed } from './utils';

export const executeQueryArray = async (arr: string[]) =>
  new Promise((resolve: any) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) {
        resolve();
      }
    });
  });

export const queryPromise = (query: string, args: any[]) => {
  return new Promise((resolve: any, reject: any) => {
    pool.query(query, args, (err, result) => {
      if (err) {
        console.error('Error', err);
        return reject(err);
      }

      return resolve(result);
    });
  });
};

export const seedTables = () => executeQueryArray([seed]);
export const createTables = () => executeQueryArray([create]);
export const destroyTables = () => executeQueryArray([destroy]);

