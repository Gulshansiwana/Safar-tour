const mail = require("../../config/nodemailer/nodemailer");


const _updatePassword = async (req, res, model) => {
    try {
        const { id } = req.params;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const response = await model.update(req.body, {
            where: {
                id: id,
            }
        });
        if (response[0] === 0) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json({ message: "Update successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const saveOTP = async (req, resp, model) => {
    try {
        console.log(req.body);
        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);
        const sendMail = await mail.sendEmail(req.body.email, " YOUR REGISTRATION OTP IS :", `Your OTP is: ${otp}`);
        if (sendMail) {
            const save = await model.create({ email: req.body.email, otp: otp });
            if (save) {
                return resp.status(200).json({ message: "Otp sended", data: sendMail });
            } else {
                return resp.status(500).json({ error: "Internal server error" });
            }
        }else{
            resp.status(500).json("internal server error mail not send ")
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json(error);
    }
}

const OTPVERIFYMEMBER = async (req, resp, model) => {
    console.log(req.body);
    let otp=req.body.otp;
    try {
        const response = await model.findOne({
            where: {
                email: req.body.email,
                otp: otp
            }
        });
        if (!response) {
            return resp.status(404).json({ error: "OTP not found" });
        }
        if (response) {
            model.destroy({
                where: {
                    email: req.body.email,
                    otp: otp
                }
            }
            )
            resp.status(200).json({ message: "verified" });
        }

    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: "Internal server error" });
    }
};



module.exports = {
    saveOTP,
    OTPVERIFYMEMBER,
    _updatePassword
}