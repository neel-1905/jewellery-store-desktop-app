import { generateCustomerCode } from "@/features/customer/lib/customer.util";
import { getDb } from "../database";

const names = [
  "Raj Mehta",
  "Priya Sharma",
  "Amit Patel",
  "Sunita Joshi",
  "Vikram Singh",
  "Anjali Gupta",
  "Rohit Verma",
  "Kavita Desai",
  "Suresh Nair",
  "Pooja Iyer",
  "Deepak Malhotra",
  "Rekha Pillai",
  "Arjun Reddy",
  "Meena Kulkarni",
  "Nikhil Shah",
  "Sonal Trivedi",
  "Manish Yadav",
  "Divya Bose",
  "Rahul Choudhary",
  "Neha Pandey",
  "Sanjay Kapoor",
  "Anita Sinha",
  "Vivek Tiwari",
  "Swati Agarwal",
  "Harish Menon",
  "Ritu Saxena",
  "Gaurav Bhatt",
  "Smita Jain",
  "Kiran Rao",
  "Vinod Naik",
];

const phones = [
  "9876543210",
  "9123456789",
  "9988776655",
  "9871234567",
  "9765432101",
  "9654321098",
  "9543210987",
  "9432109876",
  "9321098765",
  "9210987654",
  "9109876543",
  "9098765432",
  "8987654321",
  "8876543210",
  "8765432109",
  "8654321098",
  "8543210987",
  "8432109876",
  "8321098765",
  "8210987654",
  "8109876543",
  "8098765432",
  "7987654321",
  "7876543210",
  "7765432109",
  "7654321098",
  "7543210987",
  "7432109876",
  "7321098765",
  "7210987654",
];

const addresses = [
  "12 MG Road, Thane",
  "45 Linking Road, Mumbai",
  "7 Shivaji Nagar, Pune",
  "23 Anna Salai, Chennai",
  "89 Connaught Place, Delhi",
  "34 Park Street, Kolkata",
  "56 Brigade Road, Bangalore",
  "11 Banjara Hills, Hyderabad",
  "67 CG Road, Ahmedabad",
  "90 Marine Drive, Mumbai",
  null,
  null,
  null,
  null,
  null,
];

const notes = [
  "Prefers gold jewellery",
  "Regular festival buyer",
  "Referred by Raj Mehta",
  "Interested in diamond sets",
  "Buys on anniversaries",
  "Wholesale buyer",
  null,
  null,
  null,
  null,
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function seedCustomers() {
  const db = await getDb();

  const userId = 1;

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const phone = phones[i];
    const email = `${name.toLowerCase().replace(" ", ".")}@example.com`;
    const address = getRandom(addresses);
    const note = getRandom(notes);

    const result = await db.execute(
      `INSERT INTO customers (name, phone, email, address, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, phone, email, address, note, userId],
    );

    const customerId = result.lastInsertId!;
    const customerCode = generateCustomerCode(customerId);

    await db.execute(`UPDATE customers SET customer_code = ? WHERE id = ?`, [
      customerCode,
      customerId,
    ]);

    console.log(`Seeded: ${name} (${customerCode})`);
  }

  console.log("Seeding complete.");
}
