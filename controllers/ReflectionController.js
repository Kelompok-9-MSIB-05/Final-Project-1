const db = require("../config/connection");

class ReflectionController {

    static async getAllReflection(req, res) {
        const userId = req.user.id;

        try {
            const userReflections = await db.query('SELECT * FROM "Reflections" WHERE "UserId" = $1', [userId]);

            res.status(200).json(userReflections.rows);
        } catch (error) {
            res.status(401).json({ message: "Unauthorized"})
        }
    }


    static async createReflection(req, res) {
        const userId = req.user.id;
        const { success, low_point, take_away } = req.body;

        try {
            const query = 'INSERT INTO "Reflections" (success, low_point, take_away, "UserId", "createdAt", "updateAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const values = [success, low_point, take_away, userId, new Date(), new Date()];
            const newReflection = await db.query(query, values);

            res.status(201).json(newReflection.rows[0]);
        } catch (error) {
            res.status(401).json({ message: "Unauthorized"})
        }
    }

    static async updateReflectionById(req, res) {
        const userId = req.user.id;
        const { id } = req.params;
        const { success, low_point, take_away } = req.body;

        try {
            const query = 'UPDATE "Reflections" SET success = $1, low_point = $2, take_away = $3, "updateAt" = $4 WHERE id = $5 AND "UserId" = $6 RETURNING *';
            const values = [success, low_point, take_away, new Date(), id, userId];
            const updatedReflection = await db.query(query, values);
        
            if (updatedReflection.rows.length === 0) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        
            res.status(200).json(updatedReflection.rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async deleteReflectionById(req, res) {
        const userId = req.user.id; 
        const { id } = req.params;

        try {
            const query = 'DELETE FROM  "Reflections" WHERE id = $1 AND "UserId" = $2 RETURNING *';
            const values = [id, userId];
            const deletedReflection = await db.query(query, values);

            if (deletedReflection.rows.length === 0) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            res.status(200).json({ message: 'Success delete' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = ReflectionController