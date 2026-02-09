# Static QR Menu — Design & Engineering Rationale

This project is a **static, mobile-first QR menu** designed for a real restaurant use case.  
The goal was **not** to showcase complex frontend techniques, but to deliver a **finished, reliable product** with minimal operational and cognitive overhead.

This README focuses on **process and trade-offs**, not implementation details.

---

## Quick Reference

**Updating Menu:** Edit `menu.json` → Commit → Push (live in ~1 minute)  
**Hide item:** Add `"hidden": true`  
**Mark unavailable:** Add `"available": false`  
**Show quantity:** Add `"qtd": 6`

See [Data Schema](#data-schema) below for full details.

---

## Problem Statement

Restaurants need a digital menu that:

- Is fast to access via QR code
- Works reliably on any phone
- Is easy to update under real-world pressure
- Does not require technical maintenance
- Avoids recurring costs and fragile systems

Most existing solutions either:

- rely on heavy CMS platforms,
- introduce unnecessary backend complexity,
- or prioritize visual flair over usability.

---

## Scope Definition

The scope was intentionally constrained to:

- A **single static page**
- **Scroll-based navigation** (no routing)
- **JSON as the single source of truth**
- No backend, no database, no authentication
- No images per item
- No admin interface

This allowed the focus to remain on:

- usability,
- clarity,
- and long-term maintainability.

---

## Key Design Decisions & Trade-offs

### 1. Static Site over Backend

**Decision:**  
Use a fully static site deployed via GitHub Pages.

**Trade-off:**  
No live admin panel or database.

**Rationale:**

- Eliminates hosting, security, and uptime concerns
- Near-zero maintenance
- Changes are simple file edits (menu.json)
- Reliability is higher than small custom backends

For this use case, operational simplicity outweighs dynamic features.

---

### 2. JSON as the Source of Truth

**Decision:**  
All menu data lives in a single JSON file.

**Trade-off:**  
No visual editor.

**Rationale:**

- Predictable structure
- Easy version control
- Low risk of accidental breakage
- Simple enough to be edited by non-developers with guidance

This keeps business data decoupled from presentation logic.

---

### 3. Mobile-First, Text-First UI

**Decision:**  
Design strictly for mobile usage, without images.

**Trade-off:**  
Less visual flair.

**Rationale:**

- QR menus are used standing, under time pressure
- Text loads instantly on slow connections
- Avoids cognitive overload
- Improves scannability and accessibility

The interface prioritizes _reading speed_, not decoration.

---

### 4. Minimal JavaScript (Alpine.js)

**Decision:**  
Use Alpine.js for light interactivity.

**Trade-off:**  
No complex state management or component system.

**Rationale:**

- Keeps mental and technical overhead low
- No build step required
- Declarative behavior close to markup
- Easy to reason about and debug

This matches the simplicity of the problem.

---

### 5. Explicit Availability & Dietary Flags

**Decision:**  
Menu items support optional flags such as:

- `hidden` — hide items completely
- `available` — mark as unavailable
- `qtd` — display unit quantity
- `spicy` — dietary indicator 🌶️
- `vegetarian` — dietary indicator 🥦

**Trade-off:**  
No filtering or advanced logic.

**Rationale:**

- Supports real operational needs (86-ing items, seasonal menus)
- Flags are optional and declarative
- UI reflects state without hiding items (except `hidden`)
- One-line changes in JSON control behavior

This avoids overengineering while supporting real workflows.

---

## Data Schema

Menu items support the following fields:

| Field         | Type    | Required | Description                           | Example                      |
| ------------- | ------- | -------- | ------------------------------------- | ---------------------------- |
| `name`        | string  | ✓        | Item name                             | `"Francesinha"`              |
| `price`       | string  | ✓        | Price with decimals                   | `"12.50"`                    |
| `description` | string  |          | Item description                      | `"Bife de vaca, fiambre..."` |
| `qtd`         | number  |          | Unit quantity (displays "X Unidades") | `6`                          |
| `hidden`      | boolean |          | Hides item from menu                  | `true`                       |
| `available`   | boolean |          | Marks as unavailable (strikethrough)  | `false`                      |
| `spicy`       | boolean |          | Shows 🌶️ icon                         | `true`                       |
| `vegetarian`  | boolean |          | Shows 🥦 icon                         | `true`                       |

### Example Item

```json
{
  "name": "Asinhas de Frango",
  "description": "Chicken wings",
  "price": "4.50",
  "qtd": 6,
  "spicy": true
}
```

### Operational Notes

- **No `hidden` field** = item is visible (default behavior)
- **`hidden: true`** = completely hidden (seasonal items, testing)
- **`available: false`** = visible but marked unavailable (temporary 86)
- **`qtd`** = only use for items sold in countable units

---

### 6. Deliberate Feature Omissions

The following were intentionally **not** implemented:

- Search
- Filtering
- Images per item
- Animations
- Backend CMS
- User accounts
- Analytics

Each omission reduces:

- maintenance burden,
- cognitive load,
- and long-term fragility.

The goal was a **complete solution**, not a maximal one.

---

## Outcome

The result is a menu that:

- Loads instantly
- Works on any modern phone
- Requires no server maintenance
- Is cheap to host
- Is easy to update
- Solves a real business problem

Importantly, it is **finished**.

---

## Final Note

This project is not meant to impress through complexity.  
It is meant to show **judgment**.

---

## Technical Reference

### Stack

- HTML5 + Tailwind CSS (CDN)
- Alpine.js (CDN)
- IntersectionObserver API (scroll tracking)
- GitHub Pages (hosting)

Total JavaScript: ~60 lines  
Build process: None  
Dependencies: 2 CDN scripts  
Cost: €0/month

### File Structure

```
/
├── index.html        # Main page (don't edit)
├── menu.js          # Alpine component (don't edit)
├── menu.json        # Menu data (EDIT THIS)
├── README.md
└── assets/
    └── logo.png     # Restaurant logo
```

### Deployment

Changes pushed to `main` branch go live automatically via GitHub Pages.  
Cache invalidation: ~60 seconds.

### Browser Support

- iOS Safari 12+
- Android Chrome 80+
- All modern desktop browsers

Works offline after first load (cached assets).
