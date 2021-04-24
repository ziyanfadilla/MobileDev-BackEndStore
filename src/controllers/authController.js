const {users, Sequelize} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;

module.exports={
    signUp: (req,res) => {
        const {body} = req;
        const saltRounds = 10;

        body.password = bcrypt.hashSync(body.password,saltRounds);

        users.create(body)
        .then((data) => {
            res.status(200).send({
                msg: 'sign up is successfull',
                status: 200,
                data
            })
        })
        .catch ((error) => {
            res.status(500).send ({
                msg : "sign up is error",
                status : 500,
                error
            })
        })

    },
    signIn : async (req,res) => {
        const {body} = req;

        let findUser = await users.findOne({
            where : {
                [Op.or] : [
                    {username : body.username},
                    {email : body.username}
                ],

            },
        });
        if(findUser === null){
            res.status(404).send({
                msg: "sign in is error",
                status: 404,
                error: 'user not found'
            });
            
        }
        const isValidPassword = bcrypt.compareSync(body.password, findUser.dataValues.password);

        if(!isValidPassword){
            res.status(403).send({
                msg: "Sign in is error",
                status: 403,
                error : "password is invalid"
            })
        }
         
        const payload = {
            id : findUser.dataValues.id,
            email : findUser.dataValues.email,
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY,{
            expiresIn : 86400
        })

        delete findUser.dataValues.password

        res.status(200).send({
            msg: "sign in is success",
            status: 200,
            data : {...findUser.dataValues,token}
        })

    


        
    }

}