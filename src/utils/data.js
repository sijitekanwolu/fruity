import { data } from "autoprefixer";
import axios from "axios"

const getFruit = async () => {

    try {
        // let response = await axios.get(`${import.meta.env.VITE_URL_BASE}/all`)
        let response = await axios.get(`https://www.fruityvice.com/api/fruit/all`)
        return response
    } catch (error) {
        console.log(error);
    }


}

export {
    getFruit
}