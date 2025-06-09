import { toast } from "react-toastify";
const handleSucess = (msg) => {
    toast.success(msg, {
        position: "top-right",
    })
}

const handleError = (msg) => {
    toast.error(msg, {
        position: "top-right",
    })
}

export { handleSucess, handleError };