const dbsql = require('../utils/dbsql')


const users = {
    // Insert user on DDBB SQL
    insertUser: async (name, email, hashedPassword) => {
        console.log('DATA EN USERS');
        let client, result;
        //const { name, email, hashedPassword } = data;
        try {
            client = await dbsql.connect(); // Espera a abrir conexion
            const sql_query = `INSERT INTO users(name,email,password) VALUES ($1,$2,$3);`
            result = await client.query(sql_query, [name, email, hashedPassword])
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        finally {
            client.release();
        }

        //return result
    },
    //Login user mediante email
    getUser: async (email) => {
        let client, result;
        try {
            client = await dbsql.connect();
            result = await dbsql.query('SELECT * FROM users WHERE email=$1', [email])
            //console.log(result.rows);
            return result.rows
        } catch (e) {
            console.log(e);
            throw e;
        }
        finally {
            client.release();
        }
    },
    //Obtener todos los user (ADMIN)
    getAllUser: async (email) => {
        let client, result;
        try {
            client = await dbsql.connect();
            result = await dbsql.query('SELECT * FROM users')
            //console.log(result.rows);
            return result.rows
        } catch (e) {
            console.log(e);
            throw e;
        }
        finally {
            client.release();
        }
    },
    //Modificar los datos de un usuario (ADMIN & User)
    modifyUser: async (name, newEmail, email) => {
        let client, result;
        try {
            client = await dbsql.connect();
            result = await dbsql.query('UPDATE users SET name=$1, email=$2 WHERE email=$3', [name, newEmail, email])
            //console.log(result.rows);
            return result.rows
        } catch (e) {
            console.log(e);
            throw e;
        }
        finally {
            client.release();
        }
    },
    //Delete user (ADMIN)
    deleteUser: async (email) => {
        let client, result;
        try {
            client = await dbsql.connect();
            result = await dbsql.query('DELETE FROM users WHERE email=$1', [email])
            //console.log(result.rows);
            return result.rows
        } catch (e) {
            console.log(e);
            throw e;
        }
        finally {
            client.release();
        }
    },
    //Seleccionar Curso como Favorito de un usuario
    selectLikeFav: async (email) => {
        let client, result;
        try {
            client = await dbsql.connect();
            const sql_query = 'SELECT * FROM favorites'
            result = await dbsql.query(sql_query, [email])
            //console.log(result.rows);
            return result.rows
        } catch (e) {
            console.log(e);
            throw e;
        }
        finally {
            client.release();
        }
    },
    //Mostrar Cursos favoritos de un usuario
    getFavCourses: async (email) => {
        let client, result;
        try {
            client = await dbsql.connect();
            const sql_query = `SELECT * FROM favorites WHERE id_user=(SELECT id_user FROM users WHERE email=$1)`
            result = await dbsql.query(sql_query, [email])
            //console.log(result.rows);
            return result.rows
        } catch (e) {
            console.log(e);
            throw e;
        }
        finally {
            client.release();
        }
    },
    //Delete One fav
    deleteFav: async (id) => {
        let client, result;
        try {
            client = await dbsql.connect();
            const sql_query = ''
            result = await dbsql.query(sql_query, [id])
            //console.log(result.rows);
            return result.rows
        } catch (e) {
            console.log(e);
            throw e;
        }
        finally {
            client.release();
        }
    }

}
module.exports = users