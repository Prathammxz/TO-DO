const db = require("../Model/index");
const moment = require('moment');
const List = db.list


exports.renderCreateList = async (req, res) => {
    const lists = await List.findAll();
    res.render("list", { lists: lists, moment: moment });
  };

exports.createList = async (req, res) => {
    const { task, date } = req.body;

        await db.list.create({
          task: task,
          completed: false,
          date: date, 
        });
        console.log("List Updated Successfully");
    
    res.redirect("/list");
  };
  
  
exports.editList = async (req, res) => {
  const lists = await List.findAll({
    where: {
      id: req.params.id,
    },
  });
  res.render("list", { lists: [lists] }); 
};


exports.updateList = async (req, res) => {
  let updateData = {
    task: req.body.task,
    completed: req.body.completed, 
  };

  try {
    const updatedList = await List.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    console.log("List Updated Successfully");
  } catch (error) {
    console.error(error);
  }

  res.redirect("/list");
};


exports.completeList = async (req, res) => {
  const  id  = req.params.id;

    await List.update({ completed: 1 }, {
      where: {
        id: id
      }
    });
    console.log("Task is Completed successfully");

    res.redirect("/list");
 
};


exports.deleteList = async (req, res) => {
  try {
    const list = await List.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log("List Deleted Successfully");
  } catch (error) {
    console.error(error);
  }

  res.redirect("/list");
};
