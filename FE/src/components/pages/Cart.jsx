import { useState, useEffect } from 'react';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CartCard from './CartCard';
import OrderService from '@/services/OrderService';
import Link from 'next/link';

function Cart({ showcart, setshowcart }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setshowcart(false);
    };

    const reloadCart = async () => {
        try {
            setLoading(true); // Set loading state
            const response = await OrderService.getCart();
            setData(response.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
            toast.error("Failed to load cart. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        if (showcart) {
            reloadCart();
        }
    }, [showcart]);

    return (
        <>
            <Dialog
                open={showcart}
                onClose={handleClose}
                scroll="paper"
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle>Your Cart</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText tabIndex={-1}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : !data || !data.orderItems.length ? (
                            <p>You don't have any products in your cart.</p>
                        ) : (
                            data.orderItems.map((item, i) => (
                                <CartCard
                                    key={i}
                                    item={item}
                                    showcart={showcart}
                                    setshowcart={setshowcart}
                                    reloadCart={reloadCart}
                                />
                            ))
                        )}
                        <p className="mr-4 mb-4 w-fit ml-auto">
                            Total: {!data
                                ? 0
                                : data.orderItems.reduce(
                                      (init, item) =>
                                          init + item.product.price * item.quantity,
                                      0
                                  )}
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-danger" onClick={handleClose}>
                        Cancel
                    </button>
                    <Link
                        className="btn btn-primary ml-4"
                        href="/checkout"
                        onClick={handleClose}
                    >
                        Checkout
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Cart;
