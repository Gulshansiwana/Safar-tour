const REST_API = require("../../utils/crudHelper");
const service = require("../../services/verificationOtp/service");
const OTPModel=require("./otp-model");


exports.post = async (req, resp) => {
    try {
        await service.saveOTP(req, resp, OTPModel)
    }
    catch (error) {
        console.error(error)
        resp.status(500).json({ error: error.message })
    }
}

exports.verifyOtp = async (req, resp) => {
    try {
        await service.OTPVERIFYMEMBER(req, resp, OTPModel)
    }
    catch (error) {
        console.error(error)
        resp.status(500).json({ error: error.message })
    }
}