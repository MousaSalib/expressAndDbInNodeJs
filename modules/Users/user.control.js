const addUser = (req, res) => {
    res.json({message: "added"})
}
const addAllUser = (reg, res) => {
    res.json({message: "allUserAdded"})
}
const updatedUser = (req, res) => {
    res.json({message: "updatedUser"})
}
const deletedUser = (req, res) => {
    res.json({message: "deletedUser"})
}
export {
    addUser,
    addAllUser,
    updatedUser,
    deletedUser
}