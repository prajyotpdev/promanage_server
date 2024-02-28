const express = require("express");
const router = express.Router();
const jwtVerify = require("../middleware/authMiddleware");
const subTask = require("../models/subtask");
const task = require("../models/task");

router.post("/create", jwtVerify, async (req, res) => {
    try {
        const { subTaskTitle,subTaskStatus } = req.body;        
        const taskId = req.header("taskId");;
        console.log("this is task id  :" + taskId);
        if (!subTaskTitle || !subTaskStatus ) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        subTaskDetails = new subTask({  
          subTaskTitle,
          subTaskStatus,
        });

        addResponse = await subTaskDetails.save();

        await task.findByIdAndUpdate(taskId, {
          $push: { taskCheckList: { [addResponse._id]: "value" } },
        })

        res.json({ message: "New subTask created successfully"  });

    } catch (error) {
        console.log(error);
    }
});

router.post("/edit/:subTaskId", jwtVerify, async (req, res) => {
    try {
        const { subTaskTitle, subTaskCheckList, subTaskPriority, subTaskStatus, subTaskValidity } = req.body;
        const subTaskId = req.params.subTaskId;

        if (!subTaskCheckList || !subTaskPriority || !subTaskStatus || !subTaskTitle || !subTaskId|| !subTaskValidity) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        await subTask.updateOne(
            { _id: subTaskId },
            {
                $set: {
                    subTaskCheckList,
                    subTaskPriority,
                    subTaskStatus,
                    subTaskTitle,
                    subTaskValidity,
                },
            }
        );

        res.json({ message: "subTask details updated successfully" });
    } catch (error) {
        console.log(error);
    }
});

router.post("/edit/:subTaskId/", jwtVerify, async (req, res) => {
    try {
        const {  subTaskCheckList } = req.body;
        const subTaskId = req.params.subTaskId;

        if (!subTaskCheckList ) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        await subTask.updateOne(
            { _id: subTaskId },
            {
                $set: {
                    subTaskCheckList,
                },
            }
        );

        res.json({ message: "subTask details updated successfully" });
    } catch (error) {
        console.log(error);
    }
});

router.get("/edit/:subTaskId", async (req, res) => {
    try {
        const subTaskId = req.params.subTaskId;

        if (!subTaskId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const subTaskDetails = await subTask.findById(subTaskId);

        res.json({ data: subTaskDetails });
    } catch (error) {
        console.log(error);
    }
});

router.get("/all", async (req, res) => {
    try {
        const title = req.query.title || "";
        const skills = req.query.skills;
        let filterSkills = skills?.split(",");

        let filter = {};

        if (filterSkills) {
            filter = { skills: { $in: [...filterSkills] } };
        }

        const subTaskList = await subTask.find(
            {
                title: { $regex: title, $options: "i" },
                ...filter,
            }
            // { companyName: 1 }
        );

        res.json({ data: subTaskList });
    } catch (error) {
        console.log(error);
    }
});


router.delete("/subtask/:subTaskId", async (req, res) => {
     try {
         const taskId = req.params.taskId;
         const title = req.query.title || "";
         const taskList = await task.deleteOne({_id:taskId});
         res.json({ data: taskList });
     } catch (error) {
         console.log(error);
     }
 });
module.exports = router;