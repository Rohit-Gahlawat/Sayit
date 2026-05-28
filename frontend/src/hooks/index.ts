import { useEffect, useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config";

type Blog = {
    id: string
    title: string
    content: string
    author: {
        name: string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {

        axios.get(`${BACKEND_URL}blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setBlogs(res.data.blogs)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, []);
    return { loading, blogs }
}