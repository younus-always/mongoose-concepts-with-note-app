require('dotenv').config()
import mongoose from "mongoose";
import { Server } from 'http';
import app from "./main";

let server: Server;
const port = process.env.PORT

async function main() {
      try {
            // connect mongoose using mongodb
            await mongoose.connect(`${process.env.MONGO_URI}`)
            // server running
            server = app.listen(port, () => {
                  console.log(`App listening on port ${port}`)
            })
      } catch (error) {
            console.log(error)
      }
}
main()