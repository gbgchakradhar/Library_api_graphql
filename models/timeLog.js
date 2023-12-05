import mongoose from "mongoose";

const timeSchema = new mongoose.Schema(
    {
        designation: { type: String, required: true },
        Id: { type: String, required: true },
        branch: { type: String, required: true },
        date: { type: String, required: true },
        in_time: { type: String, default: null },
        out_time: { type: String, default: null }


    }
);

const Time = mongoose.model("Time", timeSchema);
export default Time