import { getConnection } from '../db'



(async () => {
    await getConnection()
    console.log("conectei no banco")
    import('../app')
})()