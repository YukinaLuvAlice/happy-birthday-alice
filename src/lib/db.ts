import sql from 'mssql';

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME,
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

export async function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
    try {
        console.log('Database config:', {
            server: config.server,
            database: config.database,
            user: config.user,
            port: config.port
        }); // Log thông tin kết nối (không log password)

        const pool = await sql.connect(config);
        console.log('Database connected successfully');

        const request = pool.request();

        params.forEach((param, index) => {
            request.input(`param${index}`, param);
        });

        console.log('Executing query:', query); // Log query
        const response = await request.query<T>(query);
        console.log('Query executed successfully');

        await pool.close();
        return response.recordset as T[];
    } catch (error) {
        console.error('Database error details:', {
            message: error.message,
            code: error.code,
            state: error.state,
            class: error.class,
            lineNumber: error.lineNumber,
            serverName: error.serverName
        });
        throw error;
    }
}
