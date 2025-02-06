import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    marca: { type: String, required: true, trim: true },
    modelo: { type: String, required: true, trim: true },
    version: { type: String, trim: true },
    anio: { type: Number, required: true },
    km: { type: Number, required: true },
    motor: {type: String, required: true},
    transmision: {type: String, required: true},
    rendimiento: {type:String, required:true},
    caracteristicas: {type:String, required: true},
    estado: { type: String, enum: ['usado', 'nuevo'], default: 'usado' },
    color: { type: String, required: true, trim: true },
    combustible: { type: String, enum: ['nafta', 'diesel'], required: true },
    precio: { type: Number, required: true, min: 0 },
    comentario: { type: String, required: true },
    imagen: {
      type: String, // Ruta relativa para la imagen
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
