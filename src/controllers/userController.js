"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookGroceryItems = exports.viewAvailableGroceryItems = void 0;
const dataSource_1 = require("../dataSource");
const GroceryItem_1 = require("../entities/GroceryItem");
const typeorm_1 = require("typeorm");
const viewAvailableGroceryItems = async (_, res) => {
    const groceryRepository = dataSource_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    const items = await groceryRepository.find({ where: { inventory: (0, typeorm_1.MoreThan)(0) } });
    res.status(200).json(items);
};
exports.viewAvailableGroceryItems = viewAvailableGroceryItems;
const bookGroceryItems = async (req, res) => {
    const { items } = req.body; // Define the structure of items array
    const groceryRepository = dataSource_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    // Explicitly define the type of `booking`
    const booking = [];
    for (const { id, quantity } of items) {
        const item = await groceryRepository.findOneBy({ id });
        if (!item || item.inventory < quantity) {
            return res.status(400).json({ error: `Insufficient inventory for item ID ${id}` });
        }
        item.inventory -= quantity;
        await groceryRepository.save(item);
        booking.push({ item, quantity }); // Now TypeScript understands the type
    }
    res.status(201).json({ message: "Booking successful", booking });
};
exports.bookGroceryItems = bookGroceryItems;
