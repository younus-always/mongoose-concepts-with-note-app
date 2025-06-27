require('dotenv').config()
import mongoose from "mongoose";
import { Server } from 'http';
import app from "./main";

let server: Server;
const PORT = 5000

async function main() {
      try {
            // connect mongoose using mongodb
            await mongoose.connect(`${process.env.MONGO_URI}`)
            // server running
            server = app.listen(PORT, () => {
                  console.log(`App listening on port ${PORT}`)
            })
      } catch (error) {
            console.log(error)
      }
}
main()