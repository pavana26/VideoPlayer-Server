const getUsers = "SELECT * FROM users";
const getUserByName = "SELECT * FROM users where username = $1 AND password=$2";
const addUser = "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)";

module.exports = {
    getUsers,
    getUserByName,
    addUser,
}