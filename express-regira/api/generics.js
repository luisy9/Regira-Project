const createItem = async (req, res, Model) => {
  try {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const readItem = async (req, res, Model) => {
  try {
    const item = await Model.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const readItems = async (req, res, Model) => {
  try {
    const items = await Model.findAll();
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEnum = async (req, res, Model) => {
  try {
    const enums = await Model.describe();

    const camposTipo = enums['tipo'];
    const camposPrioridad = enums['prioridad'];
    const camposEstado = enums['estado'];

    const isEnumTipo = camposTipo.type.slice(0, 4);
    const isEnumPrioridad = camposPrioridad.type.slice(0, 4);
    const isEnumEstado = camposEstado.type.slice(0, 4);

    if (
      !camposTipo ||
      !camposPrioridad ||
      !camposEstado ||
      isEnumTipo !== 'ENUM' ||
      isEnumPrioridad !== 'ENUM' ||
      isEnumEstado !== 'ENUM'
    ) {
      return res
        .status(404)
        .json({ error: 'El campo especificado no es ENUM o no existe' });
    }

    const newEnumsTipo = camposTipo.type.slice(5, -1).split(',');
    const arrayNewEnumsTipo = newEnumsTipo.map((e) => {
      return e.slice(1, -1);
    });

    const newEnumsPrioridad = camposPrioridad.type.slice(5, -1).split(',');
    const arrayNewEnumsPrioridad = newEnumsPrioridad.map((e) => {
      return e.slice(1, -1);
    });

    const newEnumsEstado = camposEstado.type.slice(5, -1).split(',');
    const arrayNewEnumsEstado = newEnumsEstado.map((e) => {
      return e.slice(1, -1);
    });

    res.status(200).json({
      enumTipo: arrayNewEnumsTipo,
      enumPrioridad: arrayNewEnumsPrioridad,
      enumEstado: arrayNewEnumsEstado,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateItem = async (req, res, Model) => {
  try {
    const item = await Model.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteItem = async (req, res, Model) => {
  try {
    const item = await Model.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    await item.destroy();
    res.json({ message: 'Tarea deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  readItem,
  readItems,
  createItem,
  getEnum,
  updateItem,
  deleteItem,
};
