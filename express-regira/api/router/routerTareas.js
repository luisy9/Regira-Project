const express = require("express");
const router = express.Router();

const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "en-pinxo-li-va-dir-a-en-panxo"; // Clau secreta per a la generació de JWT
const { Proyecto, Usuario, Tarea, Tag } = require("../model"); // Importa els models de dades
const {
  readItems,
  readItem,
  getEnum,
  deleteItem,
  updateItem,
  getAllEnums,
} = require("../generics");
const Sequelize = require("sequelize"); // Importa la llibreria Sequelize

const sequelize = new Sequelize("regira", "root", "admin", {
  //host: 'localhost',
  host: "localhost", //IP de la base de dades
  dialect: "mysql", // connectem a mysql
  port: 3306,
});

//AUTHENTICATION
//AUTHENTICATION
//AUTHENTICATION
//AUTHENTICATION

const checkToken = (req, res, next) => {
  const token = req.cookies?.token; // Obté el token des de la cookie de la petició
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" }); // Retorna error 401 si no hi ha cap token
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY); // Verifica el token utilitzant la clau secreta
    req.userId = decodedToken.userId; // Estableix l'ID d'usuari a l'objecte de la petició
    next(); // Passa al següent middleware
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" }); // Retorna error 401 si el token és invàlid
  }
};

//CRUD
//CRUD
//CRUD
//CRUD
//CRUD
//CRUD

router.get(
  "/tarea",
  async (req, res, next) => await readItems(req, res, Tarea)
);

router.get(
  "/tarea/:id",
  async (req, res, next) => await readItem(req, res, Tarea)
);

router.get("/enum", async (req, res, next) => {
  try {
    const enums = await Tarea.describe();

    const camposTipo = enums["tipo"];
    const camposPrioridad = enums["prioridad"];
    const camposEstado = enums["estado"];

    const isEnumTipo = camposTipo.type.slice(0, 4);
    const isEnumPrioridad = camposPrioridad.type.slice(0, 4);
    const isEnumEstado = camposEstado.type.slice(0, 4);

    if (
      !camposTipo ||
      !camposPrioridad ||
      !camposEstado ||
      isEnumTipo !== "ENUM" ||
      isEnumPrioridad !== "ENUM" ||
      isEnumEstado !== "ENUM"
    ) {
      return res
        .status(404)
        .json({ error: "El campo especificado no es ENUM o no existe" });
    }

    const newEnumsTipo = camposTipo.type.slice(5, -1).split(",");
    const arrayNewEnumsTipo = newEnumsTipo.map((e) => {
      return e.slice(1, -1);
    });

    const newEnumsPrioridad = camposPrioridad.type.slice(5, -1).split(",");
    const arrayNewEnumsPrioridad = newEnumsPrioridad.map((e) => {
      return e.slice(1, -1);
    });

    const newEnumsEstado = camposEstado.type.slice(5, -1).split(",");
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
});

// router.put(
//   "/tarea/:id",
//   async (req, res, next) => await updateItem(req, res, Tarea)
// );

router.delete(
  "/tarea/:id",
  async (req, res, next) => await deleteItem(req, res, Tarea)
);

//Todas las tareas de un usuario especifico
router.get("/tarea/users/:id", async (req, res, next) => {
  const usuarioTareas = await Tarea.findAll({
    where: { usuarios_id: req.params.id },
  });

  if (!usuarioTareas) {
    return res
      .status(404)
      .json({ error: "El usuario no tiene asignadas tareas" });
  }
  res.status(200).json(usuarioTareas);
});

//Todas las tareas de el author en concreto
router.get("/tarea/author/:id", async (req, res, next) => {
  const authorId = await Tarea.findAll({
    where: { author_id: req.params.id },
  });

  if (!authorId) {
    return res.status(404).json({ error: "El author no tiene tareas creadas" });
  }

  res.status(201).json(authorId);
});

//Crear una nueva tarea dentro de el proyecto, en el drag and drope
router.post("/tarea/proyecto/:id", checkToken, async (req, res, next) => {
  try {
    const { id, author_id } = req.body;

    // const tag = await Tag.findOne({ where: {}});
    const userId = await Usuario.findByPk(author_id);
    const proyectoId = await Proyecto.findByPk(req.params.id);

    if (!userId || !proyectoId) {
      return res
        .status(404)
        .json({ message: "No existe el proyecto o el usuario" });
    }

    const tarea = await Tarea.create(req.body);
    // const tarea_tag = { id };
    // const addTarea_Tag = await Tarea.addTag(req.id);
    res.status(201).json(tarea);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//Endpoint para hacer un UPDATE de las tareas dentro de un proyecto, que tenga usuarios asignados y un author
router.put("/tarea", checkToken, async (req, res, next) => {
  try {
    const { body } = req;
    const resultado = await Promise.all(
      body.map(async (credencial) => {
        const {
          id,
          usuarios_id,
          proyectos_id,
          tipo,
          titulo,
          prioridad,
          estado,
          author_id,
          descripcion,
        } = credencial;

        const user = await Usuario.findByPk(usuarios_id); // Cerca l'usuari pel seu ID
        const proyecto = await Proyecto.findByPk(proyectos_id);
        const idTarea = await Tarea.findByPk(id);

        if (!user || !proyecto || !idTarea) {
          return res
            .status(500)
            .json({ error: "El user o el proyecto no existen" }); // Retorna error 500 si no es troba l'usuari
        }

        //Tengo que hacer un update
        const tarea = await idTarea.update({
          tipo: tipo,
          titulo: titulo,
          descripcion: descripcion,
          prioridad: prioridad,
          estado: estado,
          proyectos_id: proyectos_id,
          usuarios_id: usuarios_id,
          author_id: author_id,
        });

        return tarea;
      })
    );

    res.status(201).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put(
  "/tarea/:id/proyecto/:idproyecto",
  checkToken,
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id, idproyecto } = req.params;

      const resultado = await Promise.all(
        body.map(async (credencial) => {
          const {
            usuarios_id,
            proyectos_id,
            tipo,
            titulo,
            prioridad,
            estado,
            author_id,
            descripcion,
          } = credencial;

          const user = await Usuario.findByPk(usuarios_id); // Cerca l'usuari pel seu ID
          const proyecto = await Proyecto.findByPk(proyectos_id);
          const idTarea = await Tarea.findByPk(id);

          if (!user || !proyecto || !idTarea) {
            return res
              .status(500)
              .json({ error: "El user o el proyecto no existen" }); // Retorna error 500 si no es troba l'usuari
          }

          //Tengo que hacer un update
          const tarea = await idTarea.update({
            tipo: tipo,
            titulo: titulo,
            descripcion: descripcion,
            prioridad: prioridad,
            estado: estado,
            proyectos_id: proyectos_id,
            usuarios_id: usuarios_id,
            author_id: author_id,
          });

          return tarea;
        })
      );

      const allTareas = await Tarea.findAll({
        where: { proyectos_id: idproyecto },
      });

      res.status(201).json(allTareas);
    } catch (error) {
      console.log({ error: error.message });
    }
  }
);

const updateTagsTasks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const tareas = await Tarea.findByPk(id);
    const tareaId = tareas.id;

    const allTagsEliminate = await Promise.all(
      body.map(async (tags) => {
        const resulta = await Tag.findAll({
          where: { nombre: tags.tag },
          raw: true,
        });

        return resulta.map((tag) => tag.id);
      })
    );

    const tagsEliminateAll = allTagsEliminate.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );

    await sequelize.query(
      `DELETE FROM tareas_has_tags WHERE tareaId = :tareaId AND tagId IN (:tagsEliminateAll)`,
      {
        replacements: { tareaId, tagsEliminateAll },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    const filterTagsToAdd = body.filter(tag => tag.isChecked == true)
    const tags = await Promise.all(
      filterTagsToAdd.map(async (tag) => {
        const resulta = await Tag.findAll({
          where: { nombre: tag.tag },
          raw: true,
        });
        return resulta.map((tg) => tg.id);
      })
    );

    const tagsEliminate = tags.reduce((acc, curr) => acc.concat(curr), []);
    await Promise.all(
      tagsEliminate.map(async tag => await tareas.addTag(tag))
    )

    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

router.put(
  "/tarea/:id/tags/project/:idProject",
  checkToken,
  updateTagsTasks,
  async (req, res, next) => {
    const TareasProyecto = await Tarea.findAll({
      where: { proyectos_id: req.params.idProject },
    });

    if (!TareasProyecto) {
      return res
        .status(404)
        .json({ error: "El proyecto no tiene ninguna tarea" });
    }

    res.status(201).json(TareasProyecto);
  }
);

//Todas las tareas de un proyecto en especifico
router.get("/tarea/proyecto/:id", async (req, res, next) => {
  const TareasProyecto = await Tarea.findAll({
    where: { proyectos_id: req.params.id },
  });

  if (!TareasProyecto) {
    return res
      .status(404)
      .json({ error: "El proyecto no tiene ninguna tarea" });
  }

  res.status(201).json(TareasProyecto);
});

//Endpoint para coger los tags de una tarea
router.get("/tarea/:id/tags", checkToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(500).json({ error: "El enpoint no ha recibido un id" }); // Retorna error 500 si no ha recibido un id
    }

    const tarea = await Tarea.findByPk(id);

    //Mirar los tags de la tabla intermedia
    const tareaConTags = await Tarea.findByPk(tarea.id, {
      include: Tag,
    });

    //Coger los tags
    const tagsDeTareas = tareaConTags.dataValues.tags;

    //Hacer un filtrado para ver todos los tags de esa tarea
    const allTagsTarea = tagsDeTareas
      .filter((tag) => tag.tareas_has_tags.tareaId !== id)
      .map((t) => {
        return { id: t.tareas_has_tags.tareaId, tag: t.nombre };
      });

    if (!tarea) {
      return res
        .status(500)
        .json({ error: "No se ha encontrado una tarea con ese id" });
    }
    res.status(200).json(allTagsTarea);
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = router;
