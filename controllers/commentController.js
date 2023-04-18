const { Comments,Tasks,User } = require("../models");
const APIFeatures = require("../utils/apiFeatures")
const apiResponse = require("../utils/appError");
const createComment = async (req, res) => {
    try {
        const blog = await Tasks.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No task with this ID', null);
        }
        console.log(Comments)
        console.log(req.params.id)
        console.log(req.body.Comment,'this is the comment')
        const newComment = await Comments.create({
            username: req.body.username,
            comment: req.body.comment,
            userId: req.user.id,
            taskId: req.params.id
        });


        apiResponse(res, 200, true, ' comment created', newComment);
    } catch (err) {
        console.log(err)
    }
};
const get = async (req, res) => {
    try {
        const blog = await Comments.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No comment with this ID', null);
        }

        const blogs = await Comments.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: Tasks,
                    as: 'tasks',
                    attributes: ['id', 'title','status','description']

                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                }
            ]
        })
        //console.log(blogs)
        apiResponse(res, 200, true, 'comment found', blogs);
    } catch (err) {
        console.log(err)
    }
}

const getCommentsOfBlog = async (req, res) => {
    try {
        const blog = await Tasks.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No task with this ID', null);
        }
        const getComments = await Comments.findAll({where:{taskId:req.params.id},
        include: [
            {
                model: Tasks,
                as: 'tasks',
                attributes: ['id', 'title','status','description']
            }
        ]
        });
       
        
        apiResponse(res, 200, true, `comments found`, getComments)
    } catch (err) {
        console.log(err)
    }
};

const updateComment = async (req, res) => {
    try {
        const blog = await Comments.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No comment with this ID', null);
        }
        const permission = await Comments.findOne({ where: { id: req.params.id } },
            { attributes: ['userId'] });

        if (permission.dataValues.userId !== req.user.id) {
            return apiResponse(res, 400, false, 'You can update your comment only', null);
        }
        const updated = await Comments.update({
            username: req.body.username,
            comment: req.body.comment
        },
            { where: { id: req.params.id } }
        )
        apiResponse(res, 200, true, 'comment updated successfully', updated);
    } catch (err) {
        console.log(err)
    }
}
const deleteComment = async (req, res) => {
    try {
        const blog = await Comments.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No comment with this ID to delete', null);
        }
        const permission = await Comments.findOne({ where: { id: req.params.id } },
            { attributes: ['userId'] });

        if (permission.dataValues.userId !== req.user.id) {
            return apiResponse(res, 400, false, 'You can delete your comment only', null);
        }
        const deleted = await Comments.destroy(
            { where: { id: req.params.id } }
        )
        apiResponse(res, 200, true, 'comment deleted successfully', null);
    } catch (err) {
        console.log(err)
    }
}
module.exports = {createComment,get,getCommentsOfBlog, updateComment, deleteComment}