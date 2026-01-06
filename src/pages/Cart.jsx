import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../redux/cart/cartActions";
import { submitOrder } from "../redux/cart/orderActions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaTrash, FaArrowLeft, FaCartShopping } from "react-icons/fa6";

const Cart = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.users.user);
    const items = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);
    const dispatch = useDispatch();

    const handleCheckout = async () => {
        const orderData = {
            userId: user.id,
            item: items,
            createdAt: new Date(),
        };
        toast.success("Transaction successful! Thank you for your purchase.");
        dispatch(submitOrder(orderData));
        navigate("/client");
    };

    return (
        <div className="h-auto bg-slate-50 py-12 px-4 rounded-2xl">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="flex gap-2 text-3xl font-extrabold text-slate-900">{user.username}'s <FaCartShopping /></h2>
                    <button
                        onClick={() => navigate("/cars")}
                        className="flex items-center gap-2 font-medium text-slate-500 hover:text-sky-600 transition-all cursor-pointer uppercase text-xs"
                    ><FaArrowLeft />back to catalog</button>
                </div>

                {items.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-xs border border-slate-200">
                        <p className="text-slate-500 text-lg">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2 space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-xs border border-slate-100">
                                    <img
                                        src={item.image_url}
                                        className="w-24 h-24 object-contain rounded-xl bg-slate-100"
                                        alt={item.model}
                                    />

                                    <div className="grow">
                                        <h3 className="font-bold text-slate-900 text-lg">{item.brand} {item.model}</h3>
                                        <p className="text-sky-600 font-semibold">€{item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
                                        <button
                                            disabled={item.quantity <= 1}
                                            onClick={() => dispatch(decreaseQuantity(item.id))}
                                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-xs disabled:opacity-30 hover:bg-slate-100 transition-all"
                                        >-</button>
                                        <span className="font-bold text-slate-700 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => dispatch(increaseQuantity(item.id))}
                                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-xs disabled:opacity-30 hover:bg-slate-100 transition-all"
                                        >+</button>
                                    </div>

                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="p-2 text-red-400 hover:text-red-500 transition"
                                    ><FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="col-span-1">
                            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl sticky top-4">
                                <p className="text-xl font-bold mb-6 pb-4">Cart summary</p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-xl font-bold py-4 border-t border-b border-slate-700">
                                        <span>Total</span>
                                        <span className="text-sky-400">€{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-sky-600 hover:bg-sky-500 text-white py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95"
                                >Pay Now</button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;