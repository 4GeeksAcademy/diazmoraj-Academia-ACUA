import toast from "react-hot-toast"

const options = {
    position: "top-right"
}

export const showNotification = (msg, type = "success") => {
    switch (type) {
        case "success":
            toast.success(msg, options)
            break
        case "error":
            toast.error(msg, options)
            break
        default:
            toast(msg)
            break
    }
}