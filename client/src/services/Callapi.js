
import axios from 'axios'
const url = 'http://localhost:4000/'

const donateEvensts =async () => {
    return await axios.get(url+"donateEvensts")
}
const donateDetial =async (id) => {
    return await axios.get(url+"donateEvenst/"+id)
}
const categoryDonateEvent =async (id) => {
    return await axios.get(url+"categoryDonateEvents")
}

export default  {donateEvensts,donateDetial,categoryDonateEvent}
