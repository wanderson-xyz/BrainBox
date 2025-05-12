const { Router } = require('express');
const BrainBox = require('../models/brainModel');


const getCards = async (req, res) => {
    try {
        const braincards = await BrainBox.find().sort({ criadoEm: -1 });
        res.status(200).json(braincards);
        console.log("Sucessfully fetched all cards");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}


const createCard = async (req, res) => {
    try {
        const braincard = new BrainBox(req.body);
        await braincard.save();
        res.status(201).json(braincard);
        console.log("Sucessfully created a new card");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}



const getCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const braincard = await BrainBox.findById(id);
        console.log("Sucessfully fetched a card by id");

        if (!braincard) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(braincard);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}


const deleteCard = async (req, res) => {
    try {
        const { id } = req.params;
        const braincard = await BrainBox.findByIdAndDelete(id);
        console.log("Sucessfully deleted a card by id");

        if (!braincard) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(braincard);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}



const updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const braincard = await BrainBox.findByIdAndUpdate(id, req.body, { new: true });
        if (!braincard) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedBraincard = await BrainBox.findById(id);
        res.status(200).json(updatedBraincard);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}




module.exports = {
    getCards,
    createCard,
    getCardById,
    deleteCard,
    updateCard
}