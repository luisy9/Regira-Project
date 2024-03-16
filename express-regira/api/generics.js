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
    const campos = enums['tipo'];

    const isEnum = campos.type.slice(0, 4);

    if (!campos || isEnum !== 'ENUM') {
      return res
        .status(404)
        .json({ error: 'El campo especificado no es ENUM o no existe' });
    }

    const newEnums = campos.type.slice(5, -1).split(',');
    const arrayNewEnums = newEnums.map((e) => {
      return e.slice(1, -1);
    });

    res.status(200).json({ enum: arrayNewEnums });
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
