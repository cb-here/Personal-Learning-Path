import { exec } from "child_process"
import { writeFile, unlink } from "fs/promises";
import Code from '../models/code.model.js'

export const runCode = async (req, res) => {
    const { language, code } = req.body
    let command, fileName;
    try {
        if (language === 'javascript') {
            fileName = `temp.js`
            command = `node ${fileName}`
        } else if (language === 'python') {
            fileName = `temp.py`
            command = `python ${fileName}`
        } else {
            return res.status(400).json({ message: "Unsupported language" })
        }
        await writeFile(fileName, code)

        exec(command, async (error, stdout, stderr) => {
            await unlink(fileName)
            if (error) {
                return res.json({ message: stderr.trim() || 'Execution error' })
            }
            res.json({ output: stdout.trim() })
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
