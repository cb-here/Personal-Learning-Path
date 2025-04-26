import Link from '../models/link.model.js'


export const addLink = async (req, res) => {
    const {title, url} = req.body
    const id = req.user.id
    try {
        const newLink = new Link({
            title,
            url, 
            userId: id
        })
        await newLink.save()
        res.status(201).json(newLink)
    } catch(error) {
        return res.status(500).json({message: "Server Error"})
    }
}

export const getLinks = async (req, res) => {
    const userId = req.user.id
    try {
        const links = await Link.find({userId})
        res.status(200).json(links)
    } catch(error) {
        return res.status(500).json({message: "Server Error"})
    }
}

export const deleteLink = async (req, res) => {
    const {id} = req.params
    try {
        const isLink = await Link.findByIdAndDelete(id)
        if (!isLink) return res.status(404).json({message: "Link not found"})
        res.status(200).json(isLink)
    } catch(error) {
        return res.status(500).json({message: "Server Error"})
    }
}