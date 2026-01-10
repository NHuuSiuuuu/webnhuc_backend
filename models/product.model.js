const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater"); // Tự tạo slug từ title
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: String,
  //   category_id: {
  //     type: String,
  //     default: "",
  //   },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  featured: String,
  position: Number,
  slug: {
    type: String,
    slug: "title", // san-pham-1
    unique: true, // chỉ tạo slug duy nhất
  },

  //  ai tạo - ngày tạo
  //   createBy: {
  //     account_id: String,
  //     // Thời gian tạo
  //     createdAt: {
  //       type: Date,
  //       default: Date.now(),
  //     },
  //   },

  //  ai xóa - ngày xóa
  //   deletedBy: {
  //     account_id: String,
  //     deletedAt: Date,
  //   },
  //   updatedBy: [
  //     {
  //       account_id: String,
  //       updatedAt: Date,
  //     },
  //   ],

  deleted: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema, "Product");

module.exports = Product;
