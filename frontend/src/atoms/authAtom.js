import { atom } from "recoil";

const authScreen=atom({
    key:"authScreen",
    default:'login'
})

export default authScreen