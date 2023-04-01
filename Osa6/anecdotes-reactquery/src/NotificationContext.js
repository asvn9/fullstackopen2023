import { createContext} from "react";

const NotificationContext = createContext({
    message: '',
    timeout: 5
})

export default NotificationContext