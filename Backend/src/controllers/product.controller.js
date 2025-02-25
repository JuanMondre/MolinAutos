import Product from '../models/product.model.js';

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function createProduct(req, res) {
  try {

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "El cuerpo de la solicitud está vacío" });
    }

    // Convierte valores numéricos
    const anio = Number(req.body.anio) || null;
    const km = Number(req.body.km) || null;
    const precio = Number(req.body.precio) || null;

    if (!req.body.marca || !req.body.modelo || !anio || !km || !precio) {
      return res.status(400).json({ message: "Faltan datos obligatorios en la solicitud" });
    }

    const productData = {
      marca: req.body.marca,
      modelo: req.body.modelo,
      version: req.body.version || '',
      anio,
      km,
      motor: req.body.motor,
      transmision: req.body.transmision,
      rendimiento: req.body.rendimiento,
      caracteristicas: req.body.caracteristicas,
      estado: req.body.estado || 'usado',
      color: req.body.color,
      combustible: req.body.combustible,
      precio,
      comentario: req.body.comentario,
      imagen: req.file ? `img/${req.file.filename}` : null,
    };


    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
    console.log(product);
  } catch (error) {
    console.error("Error al guardar:", error);
    res.status(400).json({ message: error.message });
  }
}


export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { productId } = req.params;
    const productData = req.body;
    if (req.file) {
      productData.imagen = `/img/${req.file.filename}`; // Ruta de la nueva imagen
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Exportar funciones del controlador
export default {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
