const path = require('path');
const { v4: uuidv4 } =  require('uuid');

const { request, response } = require("express");

const loadFile = async (req= request, res =response) => {
    try {
        if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
            return res.status(400).json({
              msg: 'No files were uploaded.',
            });
        }

        const { file } = req.files;
        const cutName = file.name.split('.');
        const typeFile = cutName[cutName.length - 1];
        const fileTypes = [ 'jpg', 'jpeg', 'png' ];
        if ( !fileTypes.includes( typeFile )) return res.status(400).json({
            msg: `Type file invalid: ${ fileTypes }`,
        });
        const tempNameFile = `${uuidv4()}.${typeFile}`;
        const uploadPath = path.join(  __dirname, '../uploads/', tempNameFile );
        console.log(uploadPath);
        file.mv(uploadPath, function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ err });
            }
            res.status(200).json({
              msg: 'File uploaded to ' + uploadPath,
            });
        });
    } catch (error) {
        res.status(500).json({
          error,
        });
    }
}

module.exports = {
    loadFile
}