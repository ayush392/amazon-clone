const Product = require('./models/productSchema');
const productsdata = require('./constant/productsdata');

const Defaultdata = async() =>{
    try {
        await Product.deleteMany({});

        const storeData = await Product.insertMany(productsdata);
        console.log(storeData);
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = Defaultdata;