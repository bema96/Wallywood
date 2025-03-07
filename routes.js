// routes.js

import express from 'express';

// Importer controllerne
import { genresController   } from './Controllers/genres_control.js';
import { cartlineController } from './Controllers/cartline_control.js';
import { ratingsController  } from './Controllers/ratings_control.js';
import { postersController  } from './Controllers/posters_control.js';
import { usersController    } from './Controllers/users_control.js';
import { userProfilesController   } from './Controllers/userProfiles_control.js';
import { posterGenreRelController } from './controllers/posterGenRel_control.js';

// Opret routeren
const router = express.Router();

// Definer ruterne og bind controllerne
router.use('/genres', genresController);           // Rute for genres
router.use('/cartlines', cartlineController);      // Rute for cartlines
router.use('/ratings', ratingsController);         // Rute for ratings
router.use('/posters', postersController);         // Rute for posters
router.use('/users', usersController);             // Rute for users
router.use('/userProfiles', userProfilesController); // Rute for userProfiles
router.use('/posterGenRel', posterGenreRelController); // Rute for poster-genre-rel

// Eksporter routeren
export default router;
