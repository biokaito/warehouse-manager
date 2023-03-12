const { db } = require('../Firebase');
const { DB_NAME } = require('../Constant')

const getProducts = async (res) => {
    const snapshot = await db.collection(DB_NAME.PRODUCT).get();

    const products = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
    res.status(200).json({ products });
}

const createProduct = async (req, res) => {
    const { name, manufacturingDate, expiredDate, provider, price, stock, status } = req.body;
    const docRef = db.collection(DB_NAME.PRODUCT).doc();
    try {
        await docRef.set({
            name,
            manufacturingDate,
            expiredDate,
            provider,
            price,
            stock,
            status
        });

        return res.status(200).json(docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
        return res.status(400).json(e);
    }

}

const updateProduct = async (req, res) => {
    const { id, name, manufacturingDate, expiredDate, provider, price, stock, status } = req.body;

    const docRef = db.collection(DB_NAME.PRODUCT).doc(id);
    await docRef.set({
        name,
        manufacturingDate,
        expiredDate,
        provider,
        price,
        stock,
        status
    }, { merge: true })

    res.status(200).json("updated");
}

const deleteProduct = async (req, res) => {
    const { id } = req.body;

    try {
        const docRef = db.collection(DB_NAME.PRODUCT).doc(id);
        const res = await docRef.delete();
        res.status(200).json('deleted successfull');
    }
    catch (e) {
        res.status(200).json(e);
    }
}

const exportProduct = async (req, res) => {
    const { id } = req.body;
    const docRef = db.collection(DB_NAME.PRODUCT).doc(id);
    await docRef.set({
        status: "exported"
    }, { merge: true })

    res.status(200).json("exported");
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    exportProduct
}
