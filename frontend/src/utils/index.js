import Button from "./Button"
import Input from "./Input"
import Dropdown from "./Dropdown"
import Checkbox from "./Checkbox"
import Radio from "./Radio"
import RadioGroup from "./RadioGroup"
import TextArea from "./TextArea"

export const generatePercent = offset => Math.round(Math.random() * (70 - 20) + 10) + offset
export const generateID = length => Date.now().toString().slice(-length)

const months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const shortMonths = [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const getDate = (offset = 0) => {
    const d = new Date()
    d.setDate(d.getDate() + offset)

    return {
        date: d.getDate(),
        month: months[d.getMonth()],
        shortMonth: shortMonths[d.getMonth()],
        year: d.getFullYear()
    }
}

export {
    Button,
    Input,
    Dropdown,
    Checkbox,
    Radio,
    RadioGroup,
    TextArea,
}