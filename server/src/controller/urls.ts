import { Request, Response } from "express";
import { Url } from "../model/url.model";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.BASE_URL;

export const getUrl = async (req: Request, res: Response): Promise<any> => {
  const { url, uset } = req.body;
  try {
    const newurl = `${baseUrl}/${uset}`;
    const url_in_db =
      (await Url.findOne({ og_url: url })) ||
      (await Url.findOne({ shorted_url: newurl }));
    if (url_in_db) {
      return res.status(200).json({
        message: "URL already exists",
        shorted_url: url_in_db.shorted_url,
      });
    }
    const newURL = new Url({
      og_url: url,
      shorted_url: newurl,
    });
    await newURL.save();
    return res.status(200).json({
      message: "URL created",
      shorted_url: newurl,
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};

export const goto_url = async (req: Request, res: Response): Promise<any> => {
  const { shorted_url } = req.params;
  const ip = req.ip || "unknown";

  try {
    const url = await Url.findOne({
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
    await url.save();
    res.redirect(url.og_url);
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
