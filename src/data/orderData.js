export const orders = [
	{
		id: 0,
		order_id: 12345678,
		date: '13/04/19',
		items: [
			{ id: 0, name: 'Coffee Beans from Lampung', price: 5000, quantity: 1, photo: 'https://firebasestorage.googleapis.com/v0/b/coldmoo-f07a2.appspot.com/o/photo1.JPG?alt=media&token=7d9ae1f8-f2b0-4133-b61c-2fd536cdac20' },
			{ id: 1, name: 'Product 2', price: 7000, quantity: 1, photo: 'https://firebasestorage.googleapis.com/v0/b/coldmoo-f07a2.appspot.com/o/photo1.JPG?alt=media&token=7d9ae1f8-f2b0-4133-b61c-2fd536cdac20' },
			{ id: 2, name: 'Product 3', price: 3000, quantity: 1, photo: 'https://firebasestorage.googleapis.com/v0/b/coldmoo-f07a2.appspot.com/o/photo1.JPG?alt=media&token=7d9ae1f8-f2b0-4133-b61c-2fd536cdac20' },
		],
		vendor: 'PT Alam Absolut Boga',
		vendor_logo: 'https://firebasestorage.googleapis.com/v0/b/coldmoo-f07a2.appspot.com/o/photo1.JPG?alt=media&token=7d9ae1f8-f2b0-4133-b61c-2fd536cdac20',
		total_amount: 15000,
		shipping_price: 10000,
		shipping_method: 'Go-Jek Instant',
		delivery_status: 2,
		payment_status: 2
	},
	{
		id: 1,
		order_id: 'TR-AK-1234455',
		date: '15/04/19',
		items: [
			{ id: 0, name: 'Ayam Goreng', price: 5000, quantity: 1, photo: 'https://firebasestorage.googleapis.com/v0/b/coldmoo-f07a2.appspot.com/o/photo1.JPG?alt=media&token=7d9ae1f8-f2b0-4133-b61c-2fd536cdac20' },
			{ id: 1, name: 'Product 2', price: 7000, quantity: 1, photo: 'https://firebasestorage.googleapis.com/v0/b/coldmoo-f07a2.appspot.com/o/photo1.JPG?alt=media&token=7d9ae1f8-f2b0-4133-b61c-2fd536cdac20' },
			{ id: 2, name: 'Product 3', price: 3000, quantity: 1, photo: 'https://firebasestorage.googleapis.com/v0/b/coldmoo-f07a2.appspot.com/o/photo1.JPG?alt=media&token=7d9ae1f8-f2b0-4133-b61c-2fd536cdac20' },
		],
		vendor: 'Ayam Goreng Ny. Suharti',
		vendor_logo: 'https://firebasestorage.googleapis.com/v0/b/coldmoo-f07a2.appspot.com/o/photo1.JPG?alt=media&token=7d9ae1f8-f2b0-4133-b61c-2fd536cdac20',
		total_amount: 15000,
		shipping_price: 10000,
		shipping_method: 'Ninja Van',
		delivery_status: 3,
		payment_status: 1
	},
];
