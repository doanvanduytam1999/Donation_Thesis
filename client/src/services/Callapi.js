
import axios from 'axios'
const url = 'http://localhost:4000/'

const donateEvensts =async () => {
    return await axios.get(url+"donateEvensts")
}



export default  {donateEvensts}
