// controllers/postersController.js
import express from 'express';
import { fetchAllPosters, createPoster, updatePoster, deletePoster, fetchPosterById } from '../models/posters_model.js';

export const postersController = express.Router();

// Route to get all posters
postersController.get('/', async (req, res) => {
    try {
        const posters = await fetchAllPosters(req.query);
        res.status(200).json({
            message: 'Posters fetched successfully',
            posters
        });
    } catch (error) {
        res.status(500).json({ message: `Error fetching posters: ${error.message}` });
    }
});

// Route to get a poster by ID
postersController.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const poster = await fetchPosterById(id);
        if (poster) {
            res.status(200).json({
                message: 'Poster fetched successfully',
                poster
            });
        } else {
            res.status(404).json({ message: 'Poster not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error fetching poster: ${error.message}` });
    }
});

// Route to create a new poster
postersController.post('/', async (req, res) => {
    const { name, slug, description, image, price, stock, width, height } = req.body;
    
    // Log request body for at se, hvad der bliver sendt
    console.log("Received POST request with data:", req.body);

    try {
        const newPoster = await createPoster({ name, slug, description, image, price, stock, width, height });

        if (!newPoster) {
            return res.status(400).json({ message: 'Poster could not be created' });
        }

        res.status(201).json({
            message: 'Poster created successfully',
            newPoster
        });
    } catch (error) {
        console.error('Error creating poster:', error.message);
        res.status(500).json({ message: `Error creating poster: ${error.message}` });
    }
});



// Route to update a poster
postersController.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, slug, description, image, price, stock } = req.body;
    try {
        const updatedPoster = await updatePoster(id, { name, slug, description, image, price, stock });
        if (updatedPoster) {
            res.status(200).json({
                message: 'Poster updated successfully',
                updatedPoster
            });
        } else {
            res.status(404).json({ message: 'Poster not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error updating poster: ${error.message}` });
    }
});

// Route to delete a poster
postersController.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPoster = await deletePoster(id);
        if (deletedPoster) {
            res.status(200).json({
                message: 'Poster deleted successfully',
                deletedPoster
            });
        } else {
            res.status(404).json({ message: 'Poster not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error deleting poster: ${error.message}` });
    }
});
