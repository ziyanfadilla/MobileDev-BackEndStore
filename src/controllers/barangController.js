const {barang} = require('../models');

module.exports = {
    getAllBarang : (req, res) => {
        barang.findAll() 
        .then((data) => {
            res.status(200).send({
                msg: "get all barang success",
                status: 200,
                data
            })
        }).catch((err) => {
            res.status(500).send({
                msg: "get all data is error",
                status : 500,
                error
            })
            
        });
    },
    createNewBarang : (req, res) => {
        const {body} = req;
        barang.create(body)
        .then((data) => {
            res.status(200).send({
                msg: "create data student is success",
                status: 200,
                data
            })
        })
        .catch((error) => {
            res.status(500).send({
                msg: "get all data is error",
                status : 500,
                error
            })
        })
    },
    getBarangBy : (req,res) => {
        const id = req.params.id;
        barang.findAll({
            where: {
                id
            }
        })
        .then((data) => {
            res.status(200).send({
                msg: "get id data barang is success",
                status: 200,
                data
            })
        })
        .catch((error) => {
            res.status(500).send({
                msg: "get data id is error",
                status: 500,
                error
            })
        })
    },
    updateBarang : async (req,res) => {
        const {id} = req.params;
        const { body } = req

        //menampilkan body
        let findBarang = await barang.findOne({
            where:{
                id
            }
        });
        if (findBarang === null) {
            res.status(404).send({
                msg : "update student is error",
                status : 404,
                error : "data is not found"
            })

        }
        barang.update (body, {
            where: {
                id
            }
        })
        .then((data) => {
            const
             resObject = {...findBarang.dataValues, ...body}

             res.status(200).send({
                msg : "update data students is success",
                status : 200,
                data : resObject
             })
        })
        .catch ((error) => {
            res.status(500).send({
                msg: "update data is error",
                status: 500,
                error
            })
        })
    },
    deleteBarang : async (req,res) => {
        const {id} = req.params;

        let findBarang = await barang.findOne({
            where : {
                id
            }
        });
        
        if(findBarang === null){
            res.status(404).send({
                msg : "update student is error",
                status: 404,
                error : "data is not found"
            });

        }
        barang.destroy({
            where : {
                id
            }
        })
        .then((data) => {
            const resObject = {...findBarang.dataValues}
            res.status(200).send({
                msg: "delete data barang is success",
                status: 200,
                data : resObject
            })
        })
        .catch ((error) => {
            res.status(500).send({
                msg: "delete data is error",
                status: 500,
                error
            })
        })

    }


}
