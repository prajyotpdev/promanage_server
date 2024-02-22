const express = require("express");
const router = express.Router();
const jwtVerify = require("../middleware/authMiddleware");
const task = require("../models/task");

router.post("/create", jwtVerify, async (req, res) => {
    try {
        const { taskTitle,taskCheckList, taskPriority, taskStatus, taskValidity } = req.body;
console.log(taskTitle+taskCheckList + taskPriority + taskStatus + taskValidity +req.body.userId);
        if (!taskCheckList || !taskPriority || !taskStatus || !taskTitle || !taskValidity) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        taskDetails = new task({  
          taskCheckList,
          taskPriority,
          taskStatus,
          taskTitle,
          taskValidity,
          refUserId: req.body.userId,
        });

        await taskDetails.save();

        res.json({ message: "New Task created successfully" });
    } catch (error) {
        console.log(error);
    }
});

router.post("/edit/:taskId", jwtVerify, async (req, res) => {
    try {
        const { taskTitle, taskCheckList, taskPriority, taskStatus, taskValidity } = req.body;
        const taskId = req.params.taskId;

        if (!taskCheckList || !taskPriority || !taskStatus || !taskTitle || !taskId|| !taskValidity) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        await task.updateOne(
            { _id: taskId },
            {
                $set: {
                    taskCheckList,
                    taskPriority,
                    taskStatus,
                    taskTitle,
                    taskValidity,
                },
            }
        );

        res.json({ message: "Task details updated successfully" });
    } catch (error) {
        console.log(error);
    }
});

router.post("/edit/:taskId/", jwtVerify, async (req, res) => {
    try {
        const {  taskCheckList } = req.body;
        const taskId = req.params.taskId;

        if (!taskCheckList ) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        await task.updateOne(
            { _id: taskId },
            {
                $set: {
                    taskCheckList,
                },
            }
        );

        res.json({ message: "Task details updated successfully" });
    } catch (error) {
        console.log(error);
    }
});

router.get("/edit/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;

        if (!taskId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const taskDetails = await task.findById(taskId);

        res.json({ data: taskDetails });
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

        const taskList = await task.find(
            {
                title: { $regex: title, $options: "i" },
                ...filter,
            }
            // { companyName: 1 }
        );

        res.json({ data: taskList });
    } catch (error) {
        console.log(error);
    }
});

router.delete("/task/:taskId", async (req, res) => {
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