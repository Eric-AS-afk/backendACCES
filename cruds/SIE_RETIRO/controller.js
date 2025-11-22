import { getAllRetiros as svcGetAll, getRetiroById as svcGetById, createRetiro as svcCreate, updateRetiro as svcUpdate, deleteRetiro as svcDelete, updateRetiroEvidencia as svcUpdateEvidencia } from './service.js';
import upload from './upload.js';

export const getAllRetiros = async (req, res) => {
  try {
    const usuarioId = req.query.usuarioId || null;
    const retiros = await svcGetAll(usuarioId);
    res.json(retiros);
  } catch (error) {
    console.error('Error al obtener retiros:', error);
    res.status(500).json({ error: 'Error al obtener retiros' });
  }
};

export const getRetiroById = async (req, res) => {
  try {
    const retiro = await svcGetById(req.params.id);
    if (!retiro) {
      return res.status(404).json({ error: 'Retiro no encontrado' });
    }
    res.json(retiro);
  } catch (error) {
    console.error('Error al obtener retiro:', error);
    res.status(500).json({ error: 'Error al obtener retiro' });
  }
};

export const createRetiro = async (req, res) => {
  try {
    const id = await svcCreate(req.body);
    res.status(201).json({ RET_RETIRO: id, message: 'Retiro creado exitosamente' });
  } catch (error) {
    console.error('Error al crear retiro:', error);
    res.status(500).json({ error: 'Error al crear retiro' });
  }
};

export const updateRetiro = async (req, res) => {
  try {
    await svcUpdate(req.params.id, req.body);
    res.json({ message: 'Retiro actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar retiro:', error);
    res.status(500).json({ error: 'Error al actualizar retiro' });
  }
};

export const deleteRetiro = async (req, res) => {
  try {
    await svcDelete(req.params.id);
    res.json({ message: 'Retiro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar retiro:', error);
    res.status(500).json({ error: 'Error al eliminar retiro' });
  }
};

export const uploadEvidenciaRetiro = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const filename = req.file.filename;
    await svcUpdateEvidencia(id, filename);
    res.json({ success: true, filename });
  } catch (err) {
    console.error('Error uploading evidencia for retiro:', err);
    res.status(500).json({ error: 'Error al subir evidencia' });
  }
};
 
