import { Router } from 'express';
import { reservationsRouter } from './routesReservations.js';
import { vipMembersRouter } from './routesVipMembers.js';
import { generalRouter } from './routesGeneral.js';

export const router = Router();

// Mount modular sub-routers
router.use(reservationsRouter);
router.use(vipMembersRouter);
router.use(generalRouter);

export default router;
