const { Router } = require('express');
const BrainBox = require('../models/brainModel');


const getCards = async (req, res) => {
  try {
    const braincards = await BrainBox.find({ user: req.userId }).sort({ criadoEm: -1 });
    res.status(200).json(braincards);
    console.log(`Cards do usuário ${req.userId} retornados com sucesso`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


const createCard = async (req, res) => {
  try {
    // Adiciona o ID do usuário autenticado ao card
    const novoCard = new BrainBox({
      ...req.body,
      user: req.userId,
    });

    await novoCard.save();
    res.status(201).json(novoCard);
    console.log("Card criado com sucesso");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erro ao criar card' });
  }
};



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
        const braincard = await BrainBox.findById(id);

        if (!braincard) {
            return res.status(404).json({ message: 'Card não encontrado' });
        }

        // Verificar se o usuário autenticado é o dono do card
        if (braincard.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Acesso negado: você não é o dono deste card' });
        }

        await braincard.deleteOne();
        console.log("Sucessfully deleted a card by id");
        res.status(200).json({ message: 'Card deletado com sucesso' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};




const updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const braincard = await BrainBox.findById(id);

        if (!braincard) {
            return res.status(404).json({ message: 'Card não encontrado' });
        }

        // Verificar se o usuário autenticado é o dono do card
        if (braincard.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Acesso negado: você não é o dono deste card' });
        }

        // Atualizar o card
        const updatedBraincard = await BrainBox.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedBraincard);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};



const searchCards = async (req, res) => {
    try {
        const searchTerm = req.query.titulo;

        if (!searchTerm) {
            const allCards = await BrainBox.find().sort({ criadoEm: -1 });
            return res.status(200).json(allCards);
        }

        const searchQuery = {
            titulo: { $regex: searchTerm, $options: 'i' }
        };

        const braincards = await BrainBox.find(searchQuery).sort({ criadoEm: -1 });

        if (braincards.length === 0) {
            console.log(`No cards found matching "${searchTerm}"`);
            return res.status(200).json([]);
        }

        res.status(200).json(braincards);
        console.log(`Successfully fetched cards matching "${searchTerm}"`);

    } catch (err) {
        console.error("Error during search:", err);
        res.status(500).json({ message: "Erro ao buscar os cards: " + err.message });
    }
};





module.exports = {
    getCards,
    createCard,
    getCardById,
    deleteCard,
    updateCard,
    searchCards
}