const db = require("../Model/index");
const List = db.list


exports.renderCreateList = async (req, res) => {
    const lists = await List.findAll();
    res.render("list", { lists: lists });
  };

exports.createList = async (req, res) => {
    const { task, date } = req.body;
  
    const trimmedTask = task.trim(); // Trim the task input
  
    if (trimmedTask !== "") {
      try {
        await db.list.create({
          task: trimmedTask,
          completed: false,
          date: date, // Set the completed status to false
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
  res.render("list", { lists: [lists] }); // Pass lists as an array
};


exports.updateList = async (req, res) => {
  let updateData = {
    task: req.body.task,
    completed: req.body.completed // Include the completed field
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
