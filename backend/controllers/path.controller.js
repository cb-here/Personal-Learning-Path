import Path from "../models/path.model.js";

export const getPath = async (req, res) => {
    const { id } = req.params

    try {
        const path = await Path.findById(id)
        if (!path) {
            return res.status(404).json({ message: 'Path not found' })
        }
        res.status(200).json(path)
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const getPaths = async (req, res) => {
    try {
        const paths = await Path.find()
        res.status(200).json(paths)
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const savePath = async (req, res) => {
    const { title, nodes, edges } = req.body
    const userId = req.user.id
    try {
        const newPath = new Path({
            title,
            userId,
            nodes,
            edges
        })
        await newPath.save();

        res.status(201).json(newPath);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' })
    }
}