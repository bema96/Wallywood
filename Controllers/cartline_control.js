import express from 'express';
import { fetchCartlinesByUser, createCartline, updateCartline, deleteCartline } from '../models/cartline_model.js';

export const cartlineController = express.Router();

// Route for at hente alle cartlines for en bruger
cartlineController.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cartlines = await fetchCartlinesByUser(userId);

        if (cartlines.length === 0) {
            return res.status(404).json({ error: `Ingen cartlines fundet for bruger med id ${userId}` });
        }

        res.json(cartlines);
    } catch (error) {
        res.status(500).json({ error: `Fejl ved hentning af cartlines: ${error.message}` });
    }
});

// Route for at oprette en ny cartline
cartlineController.post('/', async (req, res) => {
    try {
        const formdata = req.body;  // Opretter en ny cartline med dataen fra request body
        const newCartline = await createCartline(formdata);

        if (!newCartline) {
            return res.status(400).json({ error: 'Fejl ved oprettelse af cartline' });
        }

        res.status(201).json(newCartline);  // Returner den oprettede cartline
    } catch (error) {
        res.status(500).json({ error: `Fejl ved oprettelse af cartline: ${error.message}` });
    }
});

// Route for at opdatere en eksisterende cartline
cartlineController.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const formdata = req.body;  // Det opdaterede data for cartline

        const updatedCartline = await updateCartline(id, formdata);

        if (!updatedCartline) {
            return res.status(404).json({ error: `Cartline med id ${id} blev ikke fundet` });
        }

        res.json(updatedCartline);  // Returner den opdaterede cartline
    } catch (error) {
        res.status(500).json({ error: `Fejl ved opdatering af cartline: ${error.message}` });
    }
});

// Route for at slette en cartline
cartlineController.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Hent ID fra URL-parameteren
        const deletedCartline = await deleteCartline(id);  // Kald model-funktionen for at slette cartline

        if (!deletedCartline) {
            return res.status(404).json({ error: `Cartline med id ${id} blev ikke fundet` });
        }

        res.status(200).json({ message: `Cartline med id ${id} er blevet slettet` });
    } catch (error) {
        res.status(500).json({ error: `Fejl ved sletning af cartline: ${error.message}` });
    }
});
