"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGroceryItem = exports.updateGroceryItem = exports.viewGroceryItems = exports.addGroceryItem = void 0;
const dataSource_1 = require("../dataSource");
const GroceryItem_1 = require("../entities/GroceryItem");
const addGroceryItem = async (req, res) => {
    const { name, price, description, inventory } = req.body;
    const groceryRepository = dataSource_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    const newItem = groceryRepository.create({ name, price, description, inventory });
    await groceryRepository.save(newItem);
    res.status(201).json(newItem);
};
exports.addGroceryItem = addGroceryItem;
const viewGroceryItems = async (_, res) => {
    const groceryRepository = dataSource_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    const items = await groceryRepository.find();
    res.status(200).json(items);
};
exports.viewGroceryItems = viewGroceryItems;
const updateGroceryItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, inventory } = req.body;
    const groceryRepository = dataSource_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    const item = await groceryRepository.findOneBy({ id: parseInt(id) });
    if (!item)
        return res.status(404).json({ error: "Item not found" });
    item.name = name;
    item.price = price;
    item.description = description;
    item.inventory = inventory;
    await groceryRepository.save(item);
    res.status(200).json(item);
};
exports.updateGroceryItem = updateGroceryItem;
const removeGroceryItem = async (req, res) => {
    const { id } = req.params;
    const groceryRepository = dataSource_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    const item = await groceryRepository.findOneBy({ id: parseInt(id) });
    if (!item)
        return res.status(404).json({ error: "Item not found" });
    await groceryRepository.remove(item);
    res.status(200).json({ message: "Item removed" });
};
exports.removeGroceryItem = removeGroceryItem;
