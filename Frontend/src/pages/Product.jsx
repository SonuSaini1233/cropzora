import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Filter,
  CheckCircle2,
  ShieldAlert,
  Search,
  ShoppingCart,
  ArrowLeft,
  Star,
  Leaf,
  Zap,
  Trash2,
  Plus,
  Minus,
  QrCode,
  CreditCard,
  MapPin,
  Check,
  ChevronRight,
  Sparkles
} from "lucide-react";

// Product Database
const ALL_PRODUCTS = [
  {
    id: "p1",
    name: "Neem Gold Bio-Pesticide (100% Organic)",
    category: "Pesticides",
    cropMatch: ["Tamatar", "Gehun", "Aalu", "Kapas"],
    price: 450,
    originalPrice: 550,
    rating: 4.8,
    reviews: 124,
    organic: true,
    image: "🌿",
    description: "Kide-makode aur Fungi se bachav ke liye sabse behter organic neem ka spray.",
    dose: "5ml per Liter Pani",
  },
  {
    id: "p2",
    name: "NPK 19:19:19 Water Soluble Fertilizer",
    category: "Fertilizers",
    cropMatch: ["Gehun", "Dhan", "Ganna"],
    price: 320,
    originalPrice: 400,
    rating: 4.6,
    reviews: 89,
    organic: false,
    image: "🌱",
    description: "Fasal ki shuruaati growth aur pattiyo ke hara-bhara rakhne ke liye zaruri.",
    dose: "1kg per Acre",
  },
  {
    id: "p3",
    name: "Trichoderma Viride Bio-Fungicide",
    category: "Fungicides",
    cropMatch: ["Tamatar", "Mirch", "Aalu"],
    price: 280,
    originalPrice: 350,
    rating: 4.9,
    reviews: 210,
    organic: true,
    image: "🦠",
    description: "Jadd (root) waali bimariyon aur fungal attacks ka 100% natural ilaaj.",
    dose: "2kg per Acre Soil Application",
  },
  {
    id: "p4",
    name: "Vermicompost Premium Organics (25kg)",
    category: "Organic Soil",
    cropMatch: ["All Crops", "Tamatar", "Gehun"],
    price: 600,
    originalPrice: 750,
    rating: 4.9,
    reviews: 310,
    organic: true,
    image: "🪱",
    description: "Mitti ki urvara shakti badhane ke liye shuddh kanchwa khad.",
    dose: "50kg per Acre",
  },
  {
    id: "p5",
    name: "Organic Micronutrient Booster",
    category: "Promoters",
    cropMatch: ["Mirch", "Tamatar", "Kapas"],
    price: 520,
    originalPrice: 650,
    rating: 4.7,
    reviews: 67,
    organic: true,
    image: "✨",
    description: "Phool aur fal jhadne se rokta hai aur paudhe ko energy deta hai.",
    dose: "2ml per Liter Spray",
  },
];

export default function Product({ onBack, detectedCrop = "" }) {
  const [selectedCropFilter, setSelectedCropFilter] = useState(detectedCrop || "All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [organicOnly, setOrganicOnly] = useState(false);
  
  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout Steps State: 'cart' | 'address' | 'payment' | 'success'
  const [checkoutStep, setCheckoutStep] = useState("cart");

  // Address State
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    villageAddress: "",
    city: "",
    state: "Rajasthan",
  });
  const [addressErrors, setAddressErrors] = useState({});

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("upi_qr"); // 'upi_qr' | 'upi_id' | 'cod'
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Auto filter if a crop was detected previously
  useEffect(() => {
    if (detectedCrop) {
      setSelectedCropFilter(detectedCrop);
    }
  }, [detectedCrop]);

  // Cart Operations
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleBuyNowDirect = (product) => {
    setCart([{ ...product, qty: 1 }]);
    setCheckoutStep("address");
    setIsCartOpen(true);
  };

  // Cart Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = subtotal > 500 || cart.length === 0 ? 0 : 50;
  const grandTotal = subtotal + deliveryFee;

  // Validate Address Form
  const validateAddress = () => {
    let errs = {};
    if (!address.fullName.trim()) errs.fullName = "Kripya poora naam likhein";
    if (!address.phone.trim() || address.phone.length < 10)
      errs.phone = "Sahi 10-digit mobile number dalein";
    if (!address.pincode.trim() || address.pincode.length < 6)
      errs.pincode = "6-digit pincode zaroori hai";
    if (!address.villageAddress.trim()) errs.villageAddress = "Khet / Makaan / Gaon pata dalein";
    if (!address.city.trim()) errs.city = "Tehsil / Zila / City likhein";

    setAddressErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const proceedToPayment = () => {
    if (validateAddress()) {
      setCheckoutStep("payment");
    }
  };

  // Process UPI / Order Submission
  const handleFinalPayment = () => {
    if (paymentMethod === "upi_id" && !upiId.includes("@")) {
      alert("Kripya sahi UPI ID dalein (e.g. 9876543210@paytm ya user@ybl)");
      return;
    }

    setIsProcessing(true);

    // Simulate Payment Verification API Call
    setTimeout(() => {
      setIsProcessing(false);
      const orderDetails = {
        orderId: "CZ-" + Math.floor(100000 + Math.random() * 900000),
        items: [...cart],
        address: { ...address },
        paymentMethod:
          paymentMethod === "cod"
            ? "Cash on Delivery"
            : paymentMethod === "upi_qr"
            ? "UPI QR Code (Scan & Pay)"
            : `UPI Direct (${upiId})`,
        amountPaid: grandTotal,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      setCompletedOrder(orderDetails);
      setCart([]);
      setCheckoutStep("success");
    }, 2000);
  };

  // Filtering Products Logic
  const filteredProducts = ALL_PRODUCTS.filter((prod) => {
    const matchesCrop =
      selectedCropFilter === "All" ||
      prod.cropMatch.includes("All Crops") ||
      prod.cropMatch.some((c) => c.toLowerCase().includes(selectedCropFilter.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesOrganic = !organicOnly || prod.organic;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCrop && matchesCategory && matchesOrganic && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-600"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
              <ShoppingBag className="text-emerald-600" /> CropZora Krishi Marketplace
            </h1>
            <p className="text-xs text-gray-500">
              Pramanit Organic Bio-Pesticides, Fertilizers & Agriculture Supplies
            </p>
          </div>
        </div>

        {/* Cart Trigger */}
        <button
          onClick={() => {
            setCheckoutStep("cart");
            setIsCartOpen(true);
          }}
          className="relative flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl border border-emerald-800 transition shadow-sm font-semibold text-xs"
        >
          <ShoppingCart size={18} />
          <span>My Cart</span>
          {cart.length > 0 && (
            <span className="bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full text-[11px] font-extrabold ml-1">
              {cart.reduce((sum, item) => sum + item.qty, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Detected Crop Banner Notification */}
      {selectedCropFilter !== "All" && (
        <div className="bg-emerald-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-300 animate-bounce" size={24} />
            <div>
              <p className="font-bold text-sm">
                Detected Crop: "{selectedCropFilter}"
              </p>
              <p className="text-xs text-emerald-100">
                Aapki fasal ke liye khas recommended organic product filters active hain.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCropFilter("All")}
            className="text-xs font-semibold underline bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-lg transition"
          >
            Show All Products
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Neem Spray, NPK, Vermicompost..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          <button
            onClick={() => setOrganicOnly(!organicOnly)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
              organicOnly
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Leaf size={16} /> 100% Organic Only
          </button>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
            <Filter size={14} /> Filter:
          </span>
          {["All", "Pesticides", "Fertilizers", "Fungicides", "Organic Soil", "Promoters"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? "bg-emerald-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition relative group"
          >
            {product.organic && (
              <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Leaf size={12} /> Organic
              </span>
            )}

            <div>
              <div className="w-full h-32 bg-emerald-50/50 rounded-xl flex items-center justify-center text-5xl mb-3">
                {product.image}
              </div>

              <h3 className="font-bold text-gray-800 text-sm mb-1 leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                {product.description}
              </p>

              <div className="bg-amber-50 border border-amber-200/60 p-2 rounded-lg mb-3 text-[11px] text-amber-900">
                <strong>Dose:</strong> {product.dose}
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-gray-700">{product.rating}</span>
                <span>({product.reviews} reviews)</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-lg font-bold text-emerald-900">
                  ₹{product.price}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-xl transition border border-emerald-200"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNowDirect(product)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition shadow-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white p-8 text-center rounded-2xl border border-gray-200">
          <ShieldAlert className="mx-auto text-amber-500 mb-2" size={32} />
          <h3 className="font-bold text-gray-800 text-sm">Koi Product Nahi Mila</h3>
          <p className="text-xs text-gray-500 mt-1">
            Kripya filter reset karein ya doosra keyword type karein.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHECKOUT & CART MODAL DRAWER */}
      {/* ========================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-emerald-800 text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <h2 className="font-bold text-sm">
                  {checkoutStep === "cart" && "Aapka Cart Summary"}
                  {checkoutStep === "address" && "Kisan Delivery Address"}
                  {checkoutStep === "payment" && "UPI & Payment Gateway"}
                  {checkoutStep === "success" && "Order Confirmation"}
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-300 hover:text-white text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>

            {/* Stepper Indicator */}
            {checkoutStep !== "success" && (
              <div className="flex border-b border-gray-100 bg-emerald-50/50 text-[11px] font-semibold text-gray-500 py-2.5 px-4 justify-between">
                <span className={checkoutStep === "cart" ? "text-emerald-700 font-bold" : ""}>
                  1. Cart ({cart.length})
                </span>
                <ChevronRight size={14} />
                <span className={checkoutStep === "address" ? "text-emerald-700 font-bold" : ""}>
                  2. Delivery Address
                </span>
                <ChevronRight size={14} />
                <span className={checkoutStep === "payment" ? "text-emerald-700 font-bold" : ""}>
                  3. Payment (UPI)
                </span>
              </div>
            )}

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* ------------------------------------------------------------- */}
              {/* STEP 1: CART OVERVIEW */}
              {/* ------------------------------------------------------------- */}
              {checkoutStep === "cart" && (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <ShoppingCart className="mx-auto text-gray-300" size={48} />
                      <p className="text-gray-500 font-medium text-sm">Aapka cart khali hai.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="bg-emerald-600 text-white text-xs px-4 py-2 rounded-xl font-bold"
                      >
                        Products Dekhein
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{item.image}</span>
                            <div>
                              <h4 className="font-bold text-xs text-gray-800 line-clamp-1">
                                {item.name}
                              </h4>
                              <span className="text-emerald-700 font-bold text-xs">
                                ₹{item.price}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                              <button
                                onClick={() => updateQty(item.id, -1)}
                                className="p-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-2.5 text-xs font-bold">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.id, 1)}
                                className="p-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => updateQty(item.id, -item.qty)}
                              className="text-red-500 p-1 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Bill Breakdown */}
                      <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 space-y-2 text-xs">
                        <div className="flex justify-between text-gray-600">
                          <span>Items Total:</span>
                          <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Delivery Charge:</span>
                          <span>
                            {deliveryFee === 0 ? (
                              <strong className="text-emerald-700">FREE</strong>
                            ) : (
                              `₹${deliveryFee}`
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-emerald-200 font-bold text-emerald-950 text-sm">
                          <span>Grand Total:</span>
                          <span>₹{grandTotal}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ------------------------------------------------------------- */}
              {/* STEP 2: ADDRESS FORM */}
              {/* ------------------------------------------------------------- */}
              {checkoutStep === "address" && (
                <div className="space-y-3">
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <MapPin size={16} className="text-amber-700 shrink-0" />
                    <span>Deliveries available across rural districts & villages.</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Kisan ka Poora Naam *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full text-xs p-2.5 border rounded-xl focus:border-emerald-600 focus:outline-none"
                    />
                    {addressErrors.fullName && (
                      <span className="text-[10px] text-red-500">{addressErrors.fullName}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10 digit number"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full text-xs p-2.5 border rounded-xl focus:border-emerald-600 focus:outline-none"
                      />
                      {addressErrors.phone && (
                        <span className="text-[10px] text-red-500">{addressErrors.phone}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Area Pincode *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="e.g. 302001"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full text-xs p-2.5 border rounded-xl focus:border-emerald-600 focus:outline-none"
                      />
                      {addressErrors.pincode && (
                        <span className="text-[10px] text-red-500">{addressErrors.pincode}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Khet / Makaan / Gaon ka Pata *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Gaon ka naam, Near Panchayat, Khet Numbari"
                      value={address.villageAddress}
                      onChange={(e) =>
                        setAddress({ ...address, villageAddress: e.target.value })
                      }
                      className="w-full text-xs p-2.5 border rounded-xl focus:border-emerald-600 focus:outline-none"
                    />
                    {addressErrors.villageAddress && (
                      <span className="text-[10px] text-red-500">
                        {addressErrors.villageAddress}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Tehsil / City *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Chomu / Jaipur"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full text-xs p-2.5 border rounded-xl focus:border-emerald-600 focus:outline-none"
                      />
                      {addressErrors.city && (
                        <span className="text-[10px] text-red-500">{addressErrors.city}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">State</label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full text-xs p-2.5 border rounded-xl bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* STEP 3: UPI & PAYMENT GATEWAY */}
              {/* ------------------------------------------------------------- */}
              {checkoutStep === "payment" && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">Total Payable Amount:</p>
                      <p className="text-lg font-extrabold text-emerald-900">₹{grandTotal}</p>
                    </div>
                    <span className="bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-full font-bold text-[10px]">
                      Instant Discount Applied
                    </span>
                  </div>

                  <p className="text-xs font-bold text-gray-700">Select Payment Method:</p>

                  <div className="space-y-2">
                    {/* Option 1: Instant UPI QR Code */}
                    <label
                      onClick={() => setPaymentMethod("upi_qr")}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === "upi_qr"
                          ? "border-emerald-600 bg-emerald-50/40"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === "upi_qr"}
                        onChange={() => setPaymentMethod("upi_qr")}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-xs text-gray-800 flex items-center gap-1.5">
                          <QrCode size={16} className="text-emerald-700" /> UPI QR Code (GPay /
                          PhonePe / Paytm)
                        </span>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          QR Code scan karke instant bhugtan karein.
                        </p>

                        {paymentMethod === "upi_qr" && (
                          <div className="mt-3 bg-white p-3 rounded-xl border border-gray-200 text-center space-y-2">
                            {/* Dynamic Mock QR Code */}
                            <div className="w-36 h-36 mx-auto bg-gray-900 rounded-lg flex items-center justify-center p-2 text-white relative">
                              <div className="w-full h-full border-2 border-white border-dashed flex flex-col items-center justify-center text-center p-1">
                                <QrCode size={40} className="text-emerald-400 mb-1" />
                                <span className="text-[9px] font-mono">SCAN TO PAY</span>
                                <span className="text-[10px] font-bold text-yellow-300">
                                  ₹{grandTotal}
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] text-gray-500 font-semibold">
                              Accepts: Google Pay, PhonePe, Paytm, BHIM UPI
                            </p>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Option 2: Enter UPI ID */}
                    <label
                      onClick={() => setPaymentMethod("upi_id")}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === "upi_id"
                          ? "border-emerald-600 bg-emerald-50/40"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === "upi_id"}
                        onChange={() => setPaymentMethod("upi_id")}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-xs text-gray-800 flex items-center gap-1.5">
                          <CreditCard size={16} className="text-emerald-700" /> Enter VPA / UPI ID
                        </span>

                        {paymentMethod === "upi_id" && (
                          <div className="mt-2 space-y-1">
                            <input
                              type="text"
                              placeholder="e.g. mobileNumber@upi / username@ybl"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="w-full text-xs p-2.5 border rounded-lg focus:border-emerald-600 focus:outline-none"
                            />
                            <p className="text-[10px] text-gray-400">
                              Aapke UPI App par payment request bhej di jayegi.
                            </p>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Option 3: Cash on Delivery */}
                    <label
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === "cod"
                          ? "border-emerald-600 bg-emerald-50/40"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-1"
                      />
                      <div>
                        <span className="font-bold text-xs text-gray-800">
                          Cash on Delivery (COD)
                        </span>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Khet me samaan milne par cash ya UPI se payment karein.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* STEP 4: ORDER SUCCESS RECEIPT */}
              {/* ------------------------------------------------------------- */}
              {checkoutStep === "success" && completedOrder && (
                <div className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-emerald-950">
                      Order Confirmed Successfully!
                    </h3>
                    <p className="text-xs text-gray-500">
                      Order ID: <strong className="text-gray-800">{completedOrder.orderId}</strong>
                    </p>
                  </div>

                  {/* Invoice Summary Card */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-left space-y-2 text-xs">
                    <div className="flex justify-between pb-2 border-b border-gray-200">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-semibold">{completedOrder.date}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-200">
                      <span className="text-gray-500">Payment Status:</span>
                      <span className="font-bold text-emerald-700">
                        {completedOrder.paymentMethod}
                      </span>
                    </div>
                    <div className="pb-2 border-b border-gray-200">
                      <span className="text-gray-500 block mb-0.5">Delivery Address:</span>
                      <p className="font-semibold text-gray-800">
                        {completedOrder.address.fullName} ({completedOrder.address.phone})
                      </p>
                      <p className="text-gray-600">
                        {completedOrder.address.villageAddress}, {completedOrder.address.city},{" "}
                        {completedOrder.address.pincode}
                      </p>
                    </div>

                    <div className="pt-1">
                      <span className="text-gray-500 block mb-1 font-bold">Ordered Items:</span>
                      {completedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-gray-700 py-0.5">
                          <span>
                            {item.name} (x{item.qty})
                          </span>
                          <span>₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between pt-2 border-t border-gray-300 font-bold text-sm text-emerald-950">
                      <span>Total Paid:</span>
                      <span>₹{completedOrder.amountPaid}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep("cart");
                    }}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions Footer */}
            {checkoutStep !== "success" && cart.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-white space-y-2">
                {checkoutStep === "cart" && (
                  <button
                    onClick={() => setCheckoutStep("address")}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                  >
                    Proceed to Address <ChevronRight size={16} />
                  </button>
                )}

                {checkoutStep === "address" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCheckoutStep("cart")}
                      className="w-1/3 py-3 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      onClick={proceedToPayment}
                      className="w-2/3 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                    >
                      Proceed to UPI Payment <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                {checkoutStep === "payment" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCheckoutStep("address")}
                      className="w-1/3 py-3 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleFinalPayment}
                      disabled={isProcessing}
                      className="w-2/3 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <Sparkles className="animate-spin" size={16} /> Processing UPI...
                        </span>
                      ) : (
                        `Pay ₹${grandTotal} & Place Order`
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}