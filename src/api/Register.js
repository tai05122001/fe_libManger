import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export async function Login(email, password) {
    try {
        const res = await axios.post('http://localhost:8080/api/auth/authenticate', null, {
            params: {
               email, password
           }
        });
        console.log(res);
     }
    catch (err) {
        console.error(err);
     }
}