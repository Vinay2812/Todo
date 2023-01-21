import connection from "../dbConnect.js";

export async function register(req, res) {
    const { username, password } = req.body;
    try {
        const request = await connection;
        const usernameExist = await request.query(`SELECT * from todoUser WHERE username = '${username}'`);
        // console.log(usernameExist.recordset.length);
        if (usernameExist.recordset?.length) {
            return res.status(400).json("Username already exist");
        }
        // const genSalt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, genSalt);

        const insertQuery = `INSERT into todoUser (username, password) VALUES ('${username}', '${password}')`;
        await request.query(insertQuery);
        res.status(200).json("Register successful");
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}

export async function login(req, res) {
    const request = await connection;
    // const username = req.body.username;
    // const password = req.body.password;
    const { username, password } = req.body;
    try {
        const usernameExist = await request.query(`SELECT * from todoUser WHERE username = '${username}'`);
        if (!usernameExist) {
            return res.status(400).json("Username doesn't exist");
        }

        const user = await request.query(`SELECT * from todoUser WHERE username = '${username}' and password = '${password}'`);

        if (!user) {
            return res.status(403).json("Username and password doesn't match");
        }

        res.status(200).json(user.recordset[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
