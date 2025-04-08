import sql from 'mssql';

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME,
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export async function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();

        params.forEach((param, index) => {
            request.input(`param${index}`, param);
        });

        const response = await request.query<T>(query);
        await pool.close();
        return response.recordset as T[];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}
