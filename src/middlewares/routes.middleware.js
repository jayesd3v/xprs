import { Router } from 'express';
import { exampleController } from '@/controllers';

// router.use(exampleController);

/***
 * use router.use(exampleController) for mapping a controller
 * the path mapping is done through the controller itself by specify the { basePath: '/example' } in the controller constructor
 */

const router = Router();
router.use(exampleController);

export default router;
