"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const urls_1 = require("../controller/urls");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello World");
});
router.post("/get", urls_1.getUrl);
router.get("/:shorted_url", urls_1.goto_url);
exports.default = router;
