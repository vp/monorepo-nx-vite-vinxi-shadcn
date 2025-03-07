import { ProductsTable } from "./products-table"


// Load from database.
const products = [
  {
    id: "1",
    name: "BJÖRKSNÄS Dining Table",
    price: 599.99,
    stock: 12,
    dateAdded: "2023-06-15",
    status: "In Stock",
  },
  {
    id: "2",
    name: "POÄNG Armchair",
    price: 249.99,
    stock: 28,
    dateAdded: "2023-07-22",
    status: "In Stock",
  },
  {
    id: "3",
    name: "MALM Bed Frame",
    price: 399.99,
    stock: 15,
    dateAdded: "2023-08-05",
    status: "In Stock",
  },
  {
    id: "4",
    name: "KALLAX Shelf Unit",
    price: 179.99,
    stock: 32,
    dateAdded: "2023-09-12",
    status: "In Stock",
  },
  {
    id: "5",
    name: "STOCKHOLM Rug",
    price: 299.99,
    stock: 8,
    dateAdded: "2023-10-18",
    status: "Low Stock",
  },
  {
    id: "6",
    name: "KIVIK Sofa",
    price: 899.99,
    stock: 6,
    dateAdded: "2023-11-02",
    status: "Low Stock",
  },
  {
    id: "7",
    name: "LISABO Coffee Table",
    price: 149.99,
    stock: 22,
    dateAdded: "2023-11-29",
    status: "In Stock",
  },
  {
    id: "8",
    name: "HEMNES Bookcase",
    price: 249.99,
    stock: 17,
    dateAdded: "2023-12-10",
    status: "In Stock",
  },
  {
    id: "9",
    name: "EKEDALEN Dining Chairs (Set of 2)",
    price: 199.99,
    stock: 14,
    dateAdded: "2024-01-05",
    status: "In Stock",
  },
  {
    id: "10",
    name: "FRIHETEN Sleeper Sofa",
    price: 799.99,
    stock: 9,
    dateAdded: "2024-01-18",
    status: "Low Stock",
  },
  {
    id: "11",
    name: "NORDEN Extendable Table",
    price: 499.99,
    stock: 11,
    dateAdded: "2024-01-25",
    status: "In Stock",
  },
  {
    id: "12",
    name: "BILLY Bookcase",
    price: 129.99,
    stock: 42,
    dateAdded: "2024-02-03",
    status: "In Stock",
  },
  {
    id: "13",
    name: "STRANDMON Wing Chair",
    price: 349.99,
    stock: 16,
    dateAdded: "2024-02-12",
    status: "In Stock",
  },
  {
    id: "14",
    name: "MALM Dresser",
    price: 279.99,
    stock: 19,
    dateAdded: "2024-02-27",
    status: "In Stock",
  },
  {
    id: "15",
    name: "BRIMNES TV Unit",
    price: 149.99,
    stock: 23,
    dateAdded: "2024-03-08",
    status: "In Stock",
  },
  {
    id: "16",
    name: "SÖDERHAMN Sectional Sofa",
    price: 1299.99,
    stock: 5,
    dateAdded: "2024-03-15",
    status: "Low Stock",
  },
  {
    id: "17",
    name: "BEKANT Desk",
    price: 249.99,
    stock: 18,
    dateAdded: "2024-03-22",
    status: "In Stock",
  },
  {
    id: "18",
    name: "IVAR Storage System",
    price: 199.99,
    stock: 14,
    dateAdded: "2024-04-01",
    status: "In Stock",
  },
  {
    id: "19",
    name: "RIBBA Picture Frame Set",
    price: 49.99,
    stock: 36,
    dateAdded: "2024-04-09",
    status: "In Stock",
  },
  {
    id: "20",
    name: "EKTORP Loveseat",
    price: 499.99,
    stock: 12,
    dateAdded: "2024-04-15",
    status: "In Stock",
  },
]

export default function Products() {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <ProductsTable products={products} />
    </div>
  )
}