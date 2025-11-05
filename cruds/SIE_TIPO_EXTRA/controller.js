import * as tipoExtraService from './service.js';

export const getAllTiposExtra = async (req, res) => {
  try {
    const tipos = await tipoExtraService.getAllTiposExtra();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTipoExtraById = async (req, res) => {
  try {
    const tipo = await tipoExtraService.getTipoExtraById(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'No encontrado' });
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
