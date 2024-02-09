import axios from "axios";
import {useConfig} from "@/config/index.js";

const {baseURL} = useConfig()

export const http = axios.create({
    baseURL
})