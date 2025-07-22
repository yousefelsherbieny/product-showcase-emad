"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";
import ProductDetailViewer from "@/components/product-detail-viewer";
import ColorPicker from "@/components/color-picker";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useCart } from "@/lib/CartContext";
import toast from "react-hot-toast";

const productsData = [
  {
    id: "7",
    name: "Premium Smartwatch",
    price: "$199.99",
    description:
      "Track your fitness, receive notifications, and stay connected with our premium smartwatch. Features include heart rate monitoring, sleep tracking, and water resistance.",
    modelUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartwatch%28glb%29-xlWo8178XSp1RMszLSzazCmmQNpkym.glb",
    modelType: "smartwatch",
    colors: [
      { id: "black", name: "Black", hex: "#222222" },
      { id: "silver", name: "Silver", hex: "#C0C0C0" },
      { id: "gold", name: "Gold", hex: "#FFD700" },
      { id: "blue", name: "Blue", hex: "#3b82f6" },
    ],
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "Water resistant",
      "Notification alerts",
      "7-day battery life",
    ],
    images: [
      "/images/product-blue.jpeg",
      "/images/product-pink.jpeg",
      "/images/product-purple.jpeg",
    ],
  },
  {
    id: "8",
    name: "JBL Wireless Speaker",
    price: "$149.99",
    description:
      "Immersive sound quality with deep bass and crystal clear highs. Portable design with long battery life. Perfect for parties, outdoor activities, or just enjoying music at home.",
    modelUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jbl%20speaker%28glb%291-gTNzgjjsH94jqjegL1FNvvBjjCBoti.glb",
    modelType: "speaker",
    colors: [
      { id: "black", name: "Black", hex: "#222222" },
      { id: "red", name: "Red", hex: "#e11d48" },
      { id: "blue", name: "Blue", hex: "#3b82f6" },
      { id: "green", name: "Green", hex: "#10b981" },
    ],
    features: [
      "Bluetooth 5.0 connectivity",
      "20-hour battery life",
      "Waterproof design",
      "Built-in microphone",
      "Multi-speaker pairing",
    ],
    images: [
      "/images/product-blue.jpeg",
      "/images/product-pink.jpeg",
      "/images/product-purple.jpeg",
    ],
  },
  {
    id: "9",
    name: "Urban Jacket",
    price: "$249.99",
    description:
      "Stay stylish and comfortable with our premium urban jacket, perfect for any weather condition. Features water-resistant material, adjustable hood, and multiple pockets.",
    modelUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jacket-5ubbNEPTyi791kYKsxyo33s45TR5Ti.glb",
    modelType: "jacket",
    colors: [
      { id: "blue", name: "Blue", hex: "#3b82f6" },
      { id: "black", name: "Black", hex: "#222222" },
      { id: "green", name: "Green", hex: "#10b981" },
      { id: "burgundy", name: "Burgundy", hex: "#9f1239" },
    ],
    features: [
      "Water-resistant material",
      "Adjustable hood",
      "Multiple pockets",
      "Breathable fabric",
      "Machine washable",
    ],
    images: [
      "/images/product-blue.jpeg",
      "/images/product-pink.jpeg",
      "/images/product-purple.jpeg",
    ],
  },
  {
    id: "10",
    name: "Ceramic Mug",
    price: "$24.99",
    description:
      "Premium ceramic mug with elegant design, perfect for your morning coffee or tea. Microwave and dishwasher safe with a comfortable handle and non-slip base.",
    modelUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mug-BivPFFfCD2ohHqrX8QLYUs7IfC9NJr.glb",
    modelType: "mug",
    colors: [
      { id: "white", name: "White", hex: "#ffffff" },
      { id: "black", name: "Black", hex: "#222222" },
      { id: "purple", name: "Purple", hex: "#8b5cf6" },
      { id: "pink", name: "Pink", hex: "#ec4899" },
    ],
    features: [
      "Microwave safe",
      "Dishwasher safe",
      "12oz capacity",
      "Ergonomic handle",
      "Non-slip base",
    ],
    images: [
      "/images/product-blue.jpeg",
      "/images/product-pink.jpeg",
      "/images/product-purple.jpeg",
    ],
  },

  {
    id: "11",
    name: "Water Bottle",
    price: "$29.99",
    description:
      "Eco-friendly water bottle that keeps your drinks cold for hours. Perfect for gym or outdoor activities. Features leak-proof design and easy-carry handle.",
    modelUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plastic%20water%20bottle%20-Uoj1aA8VEzLSwKeeruBEzNE2Aabm2H.glb",
    modelType: "bottle",
    colors: [
      { id: "blue", name: "Blue", hex: "#3b82f6" },
      { id: "green", name: "Green", hex: "#10b981" },
      { id: "pink", name: "Pink", hex: "#ec4899" },
      { id: "orange", name: "Orange", hex: "#f97316" },
    ],
    features: [
      "24-hour cold retention",
      "Leak-proof design",
      "BPA-free material",
      "750ml capacity",
      "Easy-carry handle",
    ],
    images: [
      "/images/product-blue.jpeg",
      "/images/product-pink.jpeg",
      "/images/product-purple.jpeg",
    ],
  },
  {
    id: "12",
    name: "Notebook",
    price: "$19.99",
    description:
      "Premium quality notebook with smooth paper, perfect for sketching, journaling, or taking notes. Features durable binding and acid-free paper.",
    modelUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notebook-Hl6smPi3eG0MqLOgVzbp3bOnAnGLq6.glb",
    modelType: "notebook",
    colors: [
      { id: "black", name: "Black", hex: "#222222" },
      { id: "blue", name: "Blue", hex: "#3b82f6" },
      { id: "pink", name: "Pink", hex: "#ec4899" },
      { id: "brown", name: "Brown", hex: "#92400e" },
    ],
    features: [
      "200 acid-free pages",
      "Durable binding",
      "Elastic closure",
      "Inner pocket",
      "Bookmark ribbon",
    ],
    images: [
      "/images/product-blue.jpeg",
      "/images/product-pink.jpeg",
      "/images/product-purple.jpeg",
    ],
  },
];

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveColor(foundProduct.colors[0].id);
    } else {
      router.push("/products");
    }
    setIsLoading(false);
  }, [id, router]);

  const handleColorChange = (colorId) => setActiveColor(colorId);
  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-primary border-b-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentColor = product.colors.find((c) => c.id === activeColor);

  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={20} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/70 pointer-events-none"></div>
      </div>

      <Navbar />

      <div className="container mx-auto px-6 py-12 relative z-10 pt-24">
        <div className="flex items-center mb-8">
          <Link
            href="/products"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 shadow-lg"
          >
            <ImageGallery
              items={product.images.map((img) => ({
                original: img,
                thumbnail: img,
              }))}
              showPlayButton={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl h-[500px]"
          >
            <ProductDetailViewer
              modelUrl={product.modelUrl}
              modelType={product.modelType}
              colorHex={currentColor.hex}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mb-4">
              {product.price}
            </p>
            <p className="text-gray-300 mb-6">{product.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Color:</h3>
            <ColorPicker
              colors={product.colors}
              activeColor={activeColor}
              onChange={handleColorChange}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Features:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary mr-3"></span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                const numericPrice = parseFloat(product.price.replace("$", "")); // نحول السعر من نص لرقم

                // أضف المنتج للسلة
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: numericPrice,
                  image: product.images[0],
                  quantity: 1,
                  modelUrl: product.modelUrl, // ✅ أضف دي هنا
                });
              }}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex-1 bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
            >
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
