import Validate from "../validation/formValidate";
import express from "express";
import fetchForms from "../use-cases/form/fetchForms";
import getForm from "../use-cases/form/getForm";
import saveForm from "../use-cases/form/saveForm";

const router = express.Router();

router.post("/form/save", (req, res) => {
    const body = req.body;

    try {
        const data = Validate.formSchema.parse(body);

        saveForm(data).then((data) => {
            return res.status(200).json({message: "Success", data});
        }).catch((error) => {
            return res.status(400).json({message: "Error", error: error.message});
        });
    } catch (err) {
        return res.status(500).json({message: "Invalid Data", error: err});
    }
})

router.get("/form/fetch", (req, res) => {
    try {
        fetchForms().then((data) => {
            return res.status(200).json({message: "Success", data});
        }).catch((error) => {
            return res.status(400).json({message: "Error", error: error.message});
        });
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
});

router.get("/form/get/:id", (req, res) => {
    try {
        console.log(req.params);
        
        const validData = Validate.getSchema.parse(req.params);

        getForm(validData.id).then((data) => {
            return res.status(200).json({message: "Success", data});
        }).catch((error) => {
            return res.status(400).json({message: "Error", error: error.message});
        });
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error});
    }
});

export default router;