"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
const mongoose_1 = require("mongoose");
const urlSchema = new mongoose_1.Schema({
    og_url: {
        type: String,
        required: true,
        unique: true,
    },
    shorted_url: {
        type: String,
        required: true,
        unique: true,
    },
    hits: {
        type: Number,
        default: 0,
    },
    hit_ip: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
exports.Url = (0, mongoose_1.model)("Url", urlSchema);
