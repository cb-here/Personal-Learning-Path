import Discuss from "../models/discuss.model.js";

export const getDiscussions = async (req, res) => {
    try {
        const discussions = await Discuss.find().populate("user", "username")
        return res.status(200).json(discussions)
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const getDiscussionById = async (req, res) => {
    try {
        const discussion = await Discuss.findById(req.params.id).populate("user", "username");
        if (!discussion) return res.status(404).json({ message: "Discussion not found" });
        res.status(200).json(discussion)
    }  catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const createDiscussion = async (req, res) => {
    try {
        const {title, content, tags} = req.body
        const discussion = new Discuss({title, content, tags, user: req.user.id})
        await discussion.save()
        res.status(201).json(discussion);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const addComment = async (req, res) => {
    const {content} = req.body
    const {id} = req.params
    const userId = req.user.id
    try {
        const discussion = await Discuss.findById(id)
        if (!discussion) return res.status(404).json({message: "Discussion not found"})
        discussion.comments.push({user: userId, content})
        await discussion.save()
        res.status(201).json({message: "Comment added successfully"})
    } catch(error) {
        return res.status(500).json({message: "Error adding comment"})
    }
}
