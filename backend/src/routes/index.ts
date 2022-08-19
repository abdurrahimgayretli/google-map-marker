import { Router } from 'express';


import marker from './marker';


const router = Router();

router.get('/', (req, res) => {
  res.end('hey');
});

router.use('/marker', marker);

export default router;
