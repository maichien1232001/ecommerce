// shippingController.js
const ShippingMethod = require('../models/ShippingMethod');
const { handleError } = require('../utils/errorHandler');

// Thêm phương thức vận chuyển mới
exports.createShippingMethod = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const newShippingMethod = new ShippingMethod({
            name,
            price,
            description,
        });

        await newShippingMethod.save();
        return res.status(201).json({ message: 'Phương thức vận chuyển đã được tạo', newShippingMethod });
    } catch (error) {
        handleError(res, error);
    }
};

// shippingController.js
exports.getShippingMethods = async (req, res) => {
    try {
        const shippingMethods = await ShippingMethod.find();
        return res.status(200).json(shippingMethods);
    } catch (error) {
        handleError(res, error);
    }
};

// shippingController.js
exports.getShippingMethodById = async (req, res) => {
    try {
        const { shippingMethodId } = req.params;
        const shippingMethod = await ShippingMethod.findById(shippingMethodId);

        if (!shippingMethod) {
            return res.status(404).json({ error: 'Phương thức vận chuyển không tồn tại' });
        }

        return res.status(200).json(shippingMethod);
    } catch (error) {
        handleError(res, error);
    }
};

// shippingController.js
exports.updateShippingMethod = async (req, res) => {
    try {
        const { shippingMethodId } = req.params;
        const { name, price, description } = req.body;

        const shippingMethod = await ShippingMethod.findById(shippingMethodId);

        if (!shippingMethod) {
            return res.status(404).json({ error: 'Phương thức vận chuyển không tồn tại' });
        }

        shippingMethod.name = name || shippingMethod.name;
        shippingMethod.price = price || shippingMethod.price;
        shippingMethod.description = description || shippingMethod.description;

        await shippingMethod.save();

        return res.status(200).json({ message: 'Phương thức vận chuyển đã được cập nhật', shippingMethod });
    } catch (error) {
        handleError(res, error);
    }
};

// shippingController.js
exports.deleteShippingMethod = async (req, res) => {
    try {
        const { shippingMethodId } = req.params;
        const shippingMethod = await ShippingMethod.findById(shippingMethodId);

        if (!shippingMethod) {
            return res.status(404).json({ error: 'Phương thức vận chuyển không tồn tại' });
        }

        await shippingMethod.remove();

        return res.status(200).json({ message: 'Phương thức vận chuyển đã được xóa' });
    } catch (error) {
        handleError(res, error);
    }
};


// shippingController.js
exports.calculateShippingCost = async (req, res) => {
    try {
        const { shippingMethodId, weight, distance } = req.body;

        const shippingMethod = await ShippingMethod.findById(shippingMethodId);

        if (!shippingMethod) {
            return res.status(404).json({ error: 'Phương thức vận chuyển không tồn tại' });
        }

        // Giả sử phí vận chuyển tính theo trọng lượng và khoảng cách
        const shippingCost = (weight * 0.1) + (distance * 0.05) + shippingMethod.price;

        return res.status(200).json({ message: 'Tính phí vận chuyển thành công', shippingCost });
    } catch (error) {
        handleError(res, error);
    }
};
