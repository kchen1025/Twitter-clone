import { destroyTables } from './queryFunctions';

(async () => {
  console.log('destroying tables');
  await destroyTables();
  console.log('done');
})();
