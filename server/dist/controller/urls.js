"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goto_url = exports.getUrl = void 0;
const url_model_1 = require("../model/url.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const baseUrl = process.env.BASE_URL;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, uset } = req.body;
    try {
        const newurl = `${baseUrl}/${uset}`;
        const url_in_db = (yield url_model_1.Url.findOne({ og_url: url })) ||
            (yield url_model_1.Url.findOne({ shorted_url: newurl }));
        if (url_in_db) {
            return res.status(200).json({
                message: "URL already exists",
                shorted_url: url_in_db.shorted_url,
            });
        }
        const newURL = new url_model_1.Url({
            og_url: url,
            shorted_url: newurl,
        });
        yield newURL.save();
        return res.status(200).json({
            message: "URL created",
            shorted_url: newurl,
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error,
        });
    }
});
exports.getUrl = getUrl;
const goto_url = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shorted_url } = req.params;
    const ip = req.ip || "unknown";
    try {
        const url = yield url_model_1.Url.findOne({
            shorted_url: `${baseUrl}/${shorted_url}`,
        });
        console.log(url);
        if (!url) {
            return res.status(404).json({
                message: "URL not found",
            });
        }
        console.log(ip);
        const time = new Date().toISOString();
        url.hits += 1;
        url.hit_ip.push(`${ip} - ${time}`);
        yield url.save();
        res.redirect(url.og_url);
    }
    catch (error) {
        return res.status(401).json({
            message: error,
        });
    }
});
exports.goto_url = goto_url;
