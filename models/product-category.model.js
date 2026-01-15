const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
      default: "",
    },
    thumbnail: [String],
    status: String,
    position: Number,
    slug: {
      type: String,
      slug: "title",
      unique: true, // chỉ tạo slug duy nhất
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema,
  "products-category"
); // Đối số thứ 3 là bảng colection

module.exports = ProductCategory;
