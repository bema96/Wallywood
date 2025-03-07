// controllers/genresController.js
import express from 'express';
import { fetchAllGenres, createGenre, updateGenre, deleteGenre, fetchGenreById } from '../models/genres_model.js';

export const genresController = express.Router();

// Route to get all genres
genresController.get('/', async (req, res) => {
    try {
        const genres = await fetchAllGenres();
        res.status(200).json({
            message: 'Genres fetched successfully',
            genres
        });
    } catch (error) {
        res.status(500).json({ message: `Error fetching genres: ${error.message}` });
    }
});

// Route to get a genre by ID
genresController.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await fetchGenreById(id);
        if (genre) {
            res.status(200).json({
                message: 'Genre fetched successfully',
                genre
            });
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error fetching genre: ${error.message}` });
    }
});

// Route to create a new genre
genresController.post('/', async (req, res) => {
    const { title, slug } = req.body;
    try {
        const newGenre = await createGenre({ title, slug });
        res.status(201).json({
            message: 'Genre created successfully',
            newGenre
        });
    } catch (error) {
        res.status(500).json({ message: `Error creating genre: ${error.message}` });
    }
});

// Route to update a genre
genresController.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, slug } = req.body;
    try {
        const updatedGenre = await updateGenre(id, { title, slug });
        if (updatedGenre) {
            res.status(200).json({
                message: 'Genre updated successfully',
                updatedGenre
            });
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error updating genre: ${error.message}` });
    }
});

// Route to delete a genre
genresController.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGenre = await deleteGenre(id);
        if (deletedGenre) {
            res.status(200).json({
                message: 'Genre deleted successfully',
                deletedGenre
            });
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error deleting genre: ${error.message}` });
    }
});
