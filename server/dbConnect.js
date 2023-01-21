import mssql from "mssql/msnodesqlv8.js"
import dotenv from "dotenv";
dotenv.config();

const config = {
    database: process.env.DATABASE,
    server: process.env.DB_SERVER,
    options: {
        trustedConnection: true
    }
}

// mssql.connect(config, async (err)=>{
//     if(err)console.log(err);

//     const request = new mssql.Request();
//     const output = await request.query("SELECT * from todoItem");

//     console.log(output);
// })

const connection = mssql.connect(config)
    .then(()=>{
        console.log("DB connected");
        return new mssql.Request();
    })
    .catch((err) => console.log(err));

export default connection