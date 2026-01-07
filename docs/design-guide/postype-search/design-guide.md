# Comprehensive Design Guide

**Source URL:** https://www.postype.com/search?keyword=
**Generated:** Automated comprehensive extraction
**Viewport:** 1600x1200

---

## 📸 Visual Assets

### Screenshots
- **Desktop Viewport:** `viewport_screenshot.png`
- **Full Page:** `fullpage_screenshot.png`
- **Interactive States:** `interactive_hover.png`

### Responsive Screenshots
- **Mobile (375x812):** `responsive_mobile.png`
- **Tablet (768x1024):** `responsive_tablet.png`
- **Desktop (1920x1080):** `responsive_desktop.png`

---

## 🎨 Color System

### Primary Colors

```css
:root {
  /* Text Colors */
  --text-1: rgb(0, 0, 0);
  --text-2: rgb(20, 20, 21);
  --text-3: rgb(44, 44, 47);
  --text-4: rgb(118, 118, 127);
  --text-5: rgb(255, 255, 255);

  /* Background Colors */
  --bg-1: rgb(255, 255, 255);
  --bg-2: rgb(243, 61, 77);
  --bg-3: rgb(44, 44, 47);
  --bg-4: rgba(118, 118, 127, 0.15);
  --bg-5: rgb(242, 242, 243);

  /* Border Colors */
  --border-1: rgb(0, 0, 0);
  --border-2: rgb(20, 20, 21);
  --border-3: rgb(44, 44, 47);
  --border-4: rgb(118, 118, 127);
  --border-5: rgb(255, 255, 255);
}
```

### Shadow Colors

- `rgb(255, 255, 255)`
- `rgb(0, 0, 0)`
- `rgba(21, 21, 21, 0.08)`

---

## 📝 Typography System

### Font Stack

```css
:root {
  --font-1: "Postype Sans-serif KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  --font-2: Arial;
}
```

### Type Scale

```css
:root {
  --text-1: 12px;
  --text-2: 13px;
  --text-3: 13.3333px;
  --text-4: 14px;
  --text-5: 15px;
  --text-6: 16px;
  --text-7: 18px;
  --text-8: 20px;
  --text-9: 32px;
}
```

### Heading Hierarchy

| Element | Font Size | Weight | Line Height | Letter Spacing |
|---------|-----------|--------|-------------|----------------|
| h1 | 32px | 700 | 48px | normal |
| h2 | 18px | 600 | 24.0001px | normal |
| h4 | 20px | 600 | 26.6668px | -0.5px |

### Font Weights

- `400`
- `500`
- `600`
- `700`

---

## 📐 Spacing & Layout

### Spacing Scale

```css
:root {
  /* Margins */
  --margin-1: -16px;
  --margin-2: -12px;
  --margin-3: -8px;
  --margin-4: -3.5px;
  --margin-5: -2px;
  --margin-6: -1px;
  --margin-7: 1px;
  --margin-8: 2px;
  --margin-9: 4px;
  --margin-10: 6px;

  /* Paddings */
  --padding-1: 1.4px;
  --padding-2: 2px;
  --padding-3: 3.5px;
  --padding-4: 4px;
  --padding-5: 6px;
  --padding-6: 8px;
  --padding-7: 11px;
  --padding-8: 12px;
  --padding-9: 14px;
  --padding-10: 16px;

  /* Gaps (Flexbox/Grid) */
  --gap-1: 1px;
  --gap-2: 2px;
  --gap-3: 4px;
  --gap-4: 6px;
  --gap-5: 6.75px;
}
```

### Border Radius

```css
:root {
  --radius-1: 2px;
  --radius-2: 4px;
  --radius-3: 6px;
  --radius-4: 8px;
  --radius-5: 12px;
  --radius-6: 24px;
  --radius-7: 40px;
  --radius-8: 50%;
}
```

---

## 🌟 Visual Effects

### Box Shadows

```css
/* Shadow 1 */
box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px;

/* Shadow 2 */
box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px, rgba(21, 21, 21, 0.08) 0px 2px 8px -2px, rgba(21, 21, 21, 0.08) 0px 6px 12px -2px;

```

### Opacity Values

- `0.3`

---

## ✨ Animations & Transitions

### Transitions

```css
/* Transition 1 */
transition: all;

/* Transition 2 */
transition: transform;

/* Transition 3 */
transition: opacity 0.3s ease-in-out;

/* Transition 4 */
transition: visibility 0s 0.3s;

/* Transition 5 */
transition: transform 0.3s;

```

### Keyframe Animations

#### @keyframes animation-wiooy9

```css
0% { transform: translateX(-100%); }
50% { transform: translateX(100%); }
100% { transform: translateX(100%); }
```

#### @keyframes animation-wiooy9

```css
0% { transform: translateX(-100%); }
50% { transform: translateX(100%); }
100% { transform: translateX(100%); }
```

#### @keyframes animation-os2n7p

```css
0% { opacity: 0; }
100% { opacity: 1; }
```

---

## ⚡ Interactive States

---

## 🧩 Component Patterns

### Buttons

#### Button 1: ""

```css
background-color: rgba(0, 0, 0, 0);
color: rgb(44, 44, 47);
padding: 0px 4px;
border-radius: 8px;
border: 0px none rgb(44, 44, 47);
font-size: 16px;
font-weight: 500;
```

#### Button 2: ""

```css
background-color: rgb(239, 239, 239);
color: rgb(0, 0, 0);
padding: 0px;
border-radius: 0px;
border: 0px none rgb(0, 0, 0);
font-size: 13.3333px;
font-weight: 400;
```

#### Button 3: ""

```css
background-color: rgb(219, 231, 254);
color: rgb(26, 102, 255);
padding: 0px;
border-radius: 24px;
border: 0px none rgb(26, 102, 255);
font-size: 13.3333px;
font-weight: 400;
```

---

## 🎭 UX Patterns

### Interaction Metrics

- **Interactive Elements:** 942
- **Scroll Behavior:** `auto`
- **Cursor Styles Used:** `pointer`, `text`, `default`

### Accessibility Features

- ARIA Labels: 128
- ARIA Descriptions: 1
- Role Attributes: 4
- Image Alt Texts: 118

### Sticky/Fixed Elements

- `header` - Position: `sticky`, Top: `0px`, Z-Index: `500`
- `hr` - Position: `sticky`, Top: `64px`, Z-Index: `499`
- `div` - Position: `fixed`, Top: `0px`, Z-Index: `1300`
- `div` - Position: `fixed`, Top: `0px`, Z-Index: `-1`
- `div` - Position: `fixed`, Top: `1039px`, Z-Index: `auto`

---

## 📱 Responsive Design

### Mobile (375x812)

- Viewport: 375x812
- Scroll Height: 2887px
- Body Width: 375px
- Screenshot: `responsive_mobile.png`

### Tablet (768x1024)

- Viewport: 768x1024
- Scroll Height: 2665px
- Body Width: 768px
- Screenshot: `responsive_tablet.png`

### Desktop (1920x1080)

- Viewport: 1920x1080
- Scroll Height: 3052px
- Body Width: 1920px
- Screenshot: `responsive_desktop.png`

---

## 🚀 Implementation Recommendations


### Step 1: Define Design Tokens

Create a comprehensive token system using CSS custom properties:

```css
:root {
  /* Use the color, typography, and spacing values above */
}
```

### Step 2: Implement Component Patterns

Use the extracted component styles for buttons, cards, forms, etc.

### Step 3: Apply Interactive States

Implement hover, focus, and active states as documented above.

### Step 4: Add Animations

Apply the transitions and keyframe animations for smooth interactions.

### Step 5: Ensure Responsive Behavior

Use the responsive patterns to create mobile-first, adaptive layouts.

### Step 6: Test Accessibility

Follow the accessibility patterns identified in the analysis.

---

## 📚 Files Reference

- `design-guide.md` - This comprehensive guide
- `design_data.json` - Complete raw data
- `extracted.html` - Original HTML
- `extracted.css` - All CSS styles
- `computed_styles.json` - Computed styles for every element
- `interactive_hover.png` - Hover state captures
- `responsive_*.png` - Responsive screenshots

---

**Last Updated:** {click.style('Auto-generated', fg='cyan')}
**Extraction Completeness:** {click.style('Comprehensive', fg='green')}
