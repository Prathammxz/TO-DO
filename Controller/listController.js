const db = require("../Model/index");
const moment = require('moment');
const List = db.list


exports.renderCreateList = async (req, res) => {
  const lists = await List.findAll();
  const updatedLists = lists.map(updateListStatus);
  res.render("list", {
    lists: updatedLists,
    moment: moment
  });
};


exports.createList = async (req, res) => {
  const {
    task,
    date
  } = req.body;

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
  res.render("list", {
    lists: [lists]
  });
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
  const id = req.params.id;

  await List.update({
    completed: 1
  }, {
    where: {
      id: id
    }
  });
  console.log("Task is Completed successfully");

  res.redirect("/list");

};

function updateListStatus(list) {
  if (list.completed) {
    list.status = 'Completed';
  } else if (moment(list.date).isBefore(moment().startOf('day'))) {
    list.status = 'Missed';
  } else {
    list.status = 'Active';
  }
  return list;
}



exports.renderFilteredTasks = async (req, res) => {
  const { status } = req.params;
  
  let tasks;
  if (status === 'completed') {
    tasks = await db.list.findAll({
      where: {
        completed: true,
      },
    });
  } else if (status === 'active') {
    tasks = await db.list.findAll({
      where: {
        completed: false,
        date: {
          [db.Sequelize.Op.gte]: moment().startOf('day').toDate(),
        },
      },
    });
  } else if (status === 'missed') {
    tasks = await db.list.findAll({
      where: {
        completed: false,
        date: {
          [db.Sequelize.Op.lt]: moment().startOf('day').toDate(),
        },
      },
    });
  } else {
    tasks = await db.list.findAll();
  }

  const updatedTasks = tasks.map(updateListStatus);

  res.render("list", {
    lists: updatedTasks,
    moment: moment,
    selectedFilter: status
  });
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