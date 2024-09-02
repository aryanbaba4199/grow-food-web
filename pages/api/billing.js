// pages/api/generate-bill.js
import easyinvoice from "easyinvoice";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const client = req.body;
        const products = client.products.map((product) => ({
            quantity: product.qty,
            name: product.name,
            description: product.description,
            taxRate: product.taxRate,
            price: product.price,
        }));

        const data = {
            apiKey: "free",
            mode: "development",
            images: {
                logo: "https://i.pinimg.com/736x/5d/90/4b/5d904b9f3b2f1a21c7ef3d19729598a3.jpg",
                background: "https://public.budgetinvoice.com/img/watermark-draft.jpg"
            },
            sender: {
                company: "Grow Food",
                address: "Surat, Gujarat",
                visit: "growfoodweb.vercel.app",
                email: "warriorsgrowfood@gmail.com"
            },
            client: {
                company: client.shopName,
                address: client.address,
                Mobile: client.mobile
            },
            information: {
                number: "2021.0001",
                date: "31-11-2021",
                dueDate: "31-12-2021"
            },
            products: products,
            bottomNotice: "Kindly pay your invoice within 15 days.",
            settings: {
                currency: "INR"
            }
        };

        try {
            // Create the invoice
            const result = await easyinvoice.createInvoice(data);

            // Send the PDF file to the client as a base64 encoded string
            res.status(200).json({ pdf: result.pdf });
        } catch (error) {
            console.error("Error generating invoice:", error);
            res.status(500).json({ error: "Failed to generate the invoice." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
