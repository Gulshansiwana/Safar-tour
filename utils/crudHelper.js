const { Op } = require("sequelize");


const _getAll = async (req, res, model) => {
    try {
      const response = await model.findAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
const _getDataListById = async (req, res, model, fieldName, fieldValue) => {
    try {
      const response = await model.findAll({
        where: { [fieldName]: fieldValue },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const _update = async (req, res, model) => {
    try {
      const { id } = req.params; // Take id from req.params
      console.log(id);
      const response = await model.update(req.body, {
        where: {
          id: id, // Use id from req.params
        }
      });
      if (response[0] === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
      res.status(200).json({ message: "Update successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
const _delete = async (req, res, model) => {
    try {
      const { id } = req.params; // Take id from req.params
      const response = await model.destroy({
        where: {
          id: id, // Use id from req.params
        },
      });
      if (response === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
      res.status(200).json({ message: "Deletion successful" });
    } catch (error) {
      res.status(500).json({ error: error });
  }
};
  
const _add = async (req, res, model) => {
    try {
      const response = await model.create(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error })
    }
};






  //For nominees Fields


const Pagination = async (req, res, model) => {
  try {
    
    const page = parseInt(req.params.page) || 1; 
    const pageSize = parseInt(req.params.pageSize) || 10; 

    const offset = (page - 1) * pageSize;

    const response = await model.findAndCountAll({
      attributes: {
        exclude: ['password']
      },
      limit: pageSize,
      offset: offset
    });


    const { count, rows } = response;
    const totalPages = Math.ceil(count / pageSize);
    const currentPage = page;
    res.json({
      currentPage,
      totalPages,
      totalCount: count,
      data: rows
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






  module.exports = {
    Pagination,
    _getAll,
    _getDataListById,
    _update,
    _delete,
    _add,
  };
  