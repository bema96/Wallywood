// /controllers/posterGenreRelController.js
import express from 'express';
import { fetchAllPosterGenreRelations, fetchPosterGenreRelationById, createPosterGenreRelation, updatePosterGenreRelation, deletePosterGenreRelation } from '../models/posterGenRel_model.js';

export const posterGenreRelController = express.Router();

// Route for at hente alle poster-genre-relationer
posterGenreRelController.get('/', async (req, res) => {
    try {
        const relations = await fetchAllPosterGenreRelations();
        res.status(200).json({
            message: 'Poster-genre-relationer hentet succesfuldt',
            relations
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for at hente en specifik poster-genre-relation baseret på ID
posterGenreRelController.get('/genre/:genre_id', async (req, res) => {
    const { genre_id } = req.params; // Hent genre_id fra URL
    try {
        const relations = await fetchPosterGenreRelationById(genre_id); // Hent relationer for den specifikke genre_id
        if (relations.length > 0) {
            res.status(200).json({
                message: 'Poster-genre-relationer hentet succesfuldt',
                relations
            });
        } else {
            res.status(404).json({ message: 'Ingen poster-genre-relationer fundet for dette genre_id' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route for at tilføje en relation
posterGenreRelController.post('/', async (req, res) => {
    const { poster_id, genre_id } = req.body;
    try {
        const newRelation = await createPosterGenreRelation({ poster_id, genre_id });
        res.status(201).json({
            message: 'Relation tilføjet succesfuldt',
            newRelation
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for at opdatere en relation
posterGenreRelController.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { poster_id, genre_id } = req.body;
    try {
        const updatedRelation = await updatePosterGenreRelation(id, { poster_id, genre_id });
        res.status(200).json({
            message: 'Relation opdateret succesfuldt',
            updatedRelation
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for at slette en relation
posterGenreRelController.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRelation = await deletePosterGenreRelation(id);
        res.status(200).json({
            message: 'Relation slettet succesfuldt',
            deletedRelation
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
