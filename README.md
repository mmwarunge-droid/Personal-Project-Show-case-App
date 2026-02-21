# Coffee R Us — Admin Portal (Vite + React)

An administrator portal for a coffee e-commerce site. Admins can view products, search, add new products, and edit product details (name, description, origin, price). The UI is built to match the provided mock-ups and uses a simulated backend via db.json.

# Features

Landing Page: Home page describing the store (“Coffee R Us”).

Product Listing Page (Shop):

Fetches products from a simulated backend (GET).

Displays products in a responsive card grid.

Dynamic search to filter products by coffee name (and/or origin/description if implemented).

Optional location filter section (as per mock-up).

Admin Portal:

Add Product form (POST).

Edit Product values (PATCH): coffee name, description, origin, price.

Form validation and clean UX.

Routing using React Router:

/ → Home

/shop → Product list

/admin → Admin portal

Local state management with useState.

Uses useContext for shared app state (e.g., product list, search state, selected product).

Uses useId for accessible form inputs.

Uses useRef where appropriate (e.g., focusing the search input or form field on load).

Implements at least one custom hook (e.g., useProducts() for fetching + CRUD).

Responsive design aligned to the mock-up layout.

Tests with Jest and React Testing Library.

## Tech Stack

React (Vite)

React Router

json-server (mock backend)

Jest + React Testing Library

## Project Setup

1. Install dependencies
   npm install
2. Start the mock backend (json-server)

This project expects a db.json file at the project root (or in a /server folder—update the command accordingly).

Example command:

npx json-server --watch db.json --port 8001

Your API will run at:

http://localhost:8001/products

3. Start the frontend
   npm run dev

Frontend usually runs at:

http://localhost:5173

### Available Scripts

npm run dev # start Vite dev server
npm run build # production build
npm run preview # preview production build
npm test # run Jest test suite

If your project uses a separate test command, update this section to match package.json.

### API Endpoints

Assuming json-server and resource name products:

GET all products
GET http://localhost:8001/products

POST create new product
POST http://localhost:8001/products

PATCH update product fields
PATCH http://localhost:8001/products/:id

Example PATCH body:

{
"price": 1200,
"origin": "Kenya"
}

#### Data Model (Mock Product Shape)

db.json contains products shaped like:

{
"id": 1,
"name": "Nyeri AA",
"description": "Bright acidity with citrus notes.",
"origin": "Kenya",
"price": 1200,
"location": "Location 1"
}

You can add any additional fields required by your mock-up, such as imageUrl, inStock, etc.

##### Recommended Folder Structure

src/
components/
Navbar.jsx
ProductCard.jsx
ProductGrid.jsx
SearchBar.jsx
LocationFilter.jsx
ProductForm.jsx
pages/
Home.jsx
Shop.jsx
Admin.jsx
context/
ProductsContext.jsx
hooks/
useProducts.js
tests/
\*.test.jsx
App.jsx
main.jsx
db.json

# Notes on Required React Hooks

useState: used for local component state (form fields, UI state).

useContext: used to share product state and actions across routes (Shop/Admin).

useId: used for accessible form inputs (label + input pairing).

useRef: used for:

focusing the Search input on page load, or

focusing the first invalid field in Admin form.

Custom Hook Requirement

A custom hook such as useProducts() typically:

fetches products (GET)

adds products (POST)

edits products (PATCH)

exposes loading, error, products, and CRUD methods

# Testing

This project includes tests using Jest and React Testing Library.

Test coverage typically includes:

Renders products after fetch

Search filters results dynamically

Submitting the Admin form calls POST and updates UI

Editing a product calls PATCH and updates UI

Run tests:

npm test
Responsive Design

The layout is designed to match the provided mock-ups:

Top navigation: Home | Shop | Admin Portal

Shop page: sidebar (search + locations) + product grid

Admin page: centered form panel

Known Limitations

json-server is a mock backend:

No authentication/authorization.

No real database persistence beyond db.json.

PATCH updates depend on json-server behavior (works well for simple field updates).

If images are used, they may be static URLs (not actual uploads).

Future Improvements

Add image upload support (or integrate a real backend)

Add product delete feature

Add pagination and sorting options

Add form schema validation (e.g., Zod)

Add admin authentication
