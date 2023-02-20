import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("0123456789abcdefghijklmnoprstuvyzABCDEFGHIJKLMNOPRSTUVYZ", 20);

export default nanoid;