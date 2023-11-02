const db = require("../config/connection");
const bcryptUtils = require("../utils/bcrytp");
const jwtUtils = require("../utils/jwt")


class UserController{

    static async register(req, res) {

        const {email, password} = req.body;

        const emailExists = await db.query('SELECT * FROM "Users" WHERE email = $1', [email]);

        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email already used!' });
        }
    
        const hashedPassword = bcryptUtils.hashPassword(password)
        try {

            const query = 'INSERT INTO "Users" (email, password) VALUES ($1, $2) RETURNING id, email';
            const hashing = [email, hashedPassword];
            const newUser = await db.query(query,hashing);

            res.status(201).json({
                id: newUser.rows[0].id,
                email: newUser.rows[0].email
            })
        } catch (error) {
            res.status(400).json({
                message: "Registration Failed!"
            })
        }
    }


    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await db.query('SELECT * FROM "Users" WHERE email = $1', [email]);

            if (user.rows.length === 0) {
                return res.status(401).json({ message: 'Email or password invalid!' });
            }

            const isValidPassword = await bcryptUtils.comparePassword(password, user.rows[0].password);

            if (!isValidPassword) {
                return res.status(401).json({ message: 'Email or password invalid!' });
            }

            const token = jwtUtils.generateToken({ id: user.rows[0].id, email: user.rows[0].email });

            res.status(200).json({ access_token: token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = UserController;