import {createConnection} from 'typeorm';



export const connection = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "salazar",
    password: "1234",
    database: "pixlog",
    entities: ["src/**/entity/*{.ts,.js}"],
    synchronize: true,
})

export const getConnection = () => connection