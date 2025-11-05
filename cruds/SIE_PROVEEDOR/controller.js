import { getAllProveedores as svcAll, getProveedorById as svcById, createProveedor as svcCreate, updateProveedor as svcUpdate, deleteProveedor as svcDelete } from './service.js';

export const getAllProveedores = async (req, res) => {
  try {
    const proveedores = await svcAll();
    res.json(proveedores);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
};

export const getProveedorById = async (req, res) => {
  try {
    const proveedor = await svcById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(proveedor);
  } catch (error) {
    console.error('Error al obtener proveedor:', error);
    res.status(500).json({ error: 'Error al obtener proveedor' });
  }
};

export const createProveedor = async (req, res) => {
  try {
    const id = await svcCreate(req.body);
    res.status(201).json({ PRO_PROVEEDOR: id, message: 'Proveedor creado exitosamente' });
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ error: 'Error al crear proveedor' });
  }
};

export const updateProveedor = async (req, res) => {
  try {
    await svcUpdate(req.params.id, req.body);
    res.json({ message: 'Proveedor actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ error: 'Error al actualizar proveedor' });
  }
};

export const deleteProveedor = async (req, res) => {
  try {
    await svcDelete(req.params.id);
    res.json({ message: 'Proveedor eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ error: 'Error al eliminar proveedor' });
  }
};
 
