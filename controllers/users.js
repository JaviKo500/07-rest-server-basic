const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
    const {q, name = 'no name'} = req.query;
    res.json({
        msg: ' api controller get',
        q,name
    })
}
const usersPost = (req, res = response) => {
    const {name, age} = req.body;
     console.log(req.body);
    res.json({
        msg: ' api controller post',
        name, age
    })
}

const usersPut = (req = request, res = response) => {
    const {id} = req.params;
    res.json({
        msg: ' api controller put',
        id
    })
}
const usersDelete = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: ' api controller delete',
        id
    })
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: ' api controller'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
};