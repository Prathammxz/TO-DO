const db = require("../Model/index");
const List = db.list


exports.renderCreateList = async (req, res) => {
    const lists = await List.findAll();
    res.render("list", { lists: lists });
  };

exports.createList = async (req, res) => {
    const { task } = req.body;
  
    const trimmedTask = task.trim(); // Trim the task input
  
    if (trimmedTask !== "") {
      try {
        await db.list.create({
          task: trimmedTask,
        });
        console.log("List Updated Successfully");
      } catch (error) {
        console.error(error);
      }
    }
  
    res.redirect("/list");
};
  
exports.editList = async (req, res) => {
    const lists = await List.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.render("list", { lists });
};

exports.updateList = async (req, res) => {
    let updateData = {
        task: req.body.task,
    };
    const updatedList = await List.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/list");
};




exports.deleteList = async (req, res) => {
    const list = await List.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/list");
  };
