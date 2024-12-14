import { Schema, model } from "mongoose";

interface UrlS {
  og_url: string;
  shorted_url: string;
  hits: number;
  hit_ip: string[];
}

const urlSchema = new Schema<UrlS>(
  {
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
  },
  {
    timestamps: true,
  }
);
export const Url = model("Url", urlSchema);
