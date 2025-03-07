import express from 'express';
import { createRating, fetchRatingsByUser, fetchRatingById, updateRating, deleteRating } from '../models/ratings_model.js';

export const ratingsController = express.Router();


// Route for at hente ratings for en bruger
ratingsController.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const ratings = await fetchRatingsByUser(user_id);
        res.status(200).json({
            message: 'Ratings hentet succesfuldt',
            ratings: ratings
        });
    } catch (error) {
        res.status(500).json({ message: 'Fejl ved hentning af ratings', error: error.message });
    }
});

// Route for at hente en rating baseret på ID
ratingsController.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rating = await fetchRatingById(id);
        if (rating) {
            res.status(200).json({
                message: 'Rating hentet succesfuldt',
                rating: rating
            });
        } else {
            res.status(404).json({ message: 'Rating ikke fundet' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Fejl ved hentning af rating', error: error.message });
    }
});

// Route for at oprette en rating
ratingsController.post('/', async (req, res) => {
    const { num_stars, poster_id, user_id } = req.body;
    try {
        const newRating = await createRating({ num_stars, poster_id, user_id });
        res.status(201).json({
            message: 'Rating oprettet succesfuldt',
            rating: newRating
        });
    } catch (error) {
        res.status(500).json({ message: 'Fejl ved oprettelse af rating', error: error.message });
    }
});

// Route for at opdatere en rating
ratingsController.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { num_stars } = req.body;
    try {
        const updatedRating = await updateRating(id, { num_stars });
        if (updatedRating) {
            res.status(200).json({
                message: 'Rating opdateret succesfuldt',
                rating: updatedRating
            });
        } else {
            res.status(404).json({ message: 'Rating ikke fundet' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Fejl ved opdatering af rating', error: error.message });
    }
});

// Route for at slette en rating
ratingsController.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRating = await deleteRating(id);
        if (deletedRating) {
            res.status(200).json({
                message: 'Rating slettet succesfuldt'
            });
        } else {
            res.status(404).json({ message: 'Rating ikke fundet' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Fejl ved sletning af rating', error: error.message });
    }
});

