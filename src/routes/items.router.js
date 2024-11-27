import { Router } from "express"
import { getAllItems, getOneItem } from "../controllers/items.controller.js"

const itemsRouter = Router()

itemsRouter
    .get("/items", getAllItems)
    .get("/items/:id", getOneItem)

export default itemsRouter