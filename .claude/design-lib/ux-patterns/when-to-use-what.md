# When to Use What?

Guide for choosing the right UI pattern for your needs

## Overview

This guide helps you choose the most appropriate UI pattern for your needs.

Each pattern includes:
- ✅ Best use cases
- ❌ When to avoid
- 🎯 Key features
- 🔄 Related patterns

## Selection Patterns (Less than 5 options)

| Pattern                              | Best For                                | Avoid When                      | Key Features    | Related                                            |
| ------------------------------------ | --------------------------------------- | ------------------------------- | --------------- | -------------------------------------------------- |
| [Radio Button](/patterns/forms/radio) | ✅ Single choice✅ Visible options        | ❌ Many options❌ Multiple needed | ✅ Clear choices | [Dropdown](/patterns/forms/selection-input)        |
| [Checkbox](/patterns/forms/checkbox) | ✅ Multiple choices✅ Independent options | ❌ Single choice❌ Many options   | ✅ Toggle states | [Multi-select](/patterns/forms/multi-select-input) |
| [Toggle](/patterns/forms/toggle)     | ✅ Binary settings✅ Immediate effect     | ❌ Multiple states               | ✅ Quick switch  | [Checkbox](/patterns/forms/checkbox)               |

## Selection Patterns (5 or more options)

| Pattern                                            | Best For                      | Avoid When           | Key Features      | Related                                      |
| -------------------------------------------------- | ----------------------------- | -------------------- | ----------------- | -------------------------------------------- |
| [Dropdown](/patterns/forms/selection-input)        | ✅ Limited space✅ 5-15 options | ❌ Multiple selection | ✅ Compact         | [Radio Button](/patterns/forms/radio)        |
| [Autocomplete](/patterns/forms/autocomplete)       | ✅ Many options✅ Search needed | ❌ Few options        | ✅ Search & filter | [Search Field](/patterns/forms/search-field) |
| [Multi-select](/patterns/forms/multi-select-input) | ✅ Multiple items✅ Tags needed | ❌ Single choice      | ✅ Bulk selection  | [Checkbox](/patterns/forms/checkbox)         |

## Text Input Patterns

| Pattern                                       | Best For                       | Avoid When     | Key Features   | Related                                         |
| --------------------------------------------- | ------------------------------ | -------------- | -------------- | ----------------------------------------------- |
| [Text Field](/patterns/forms/text-field)      | ✅ Short text✅ Single line      | ❌ Long content | ✅ Simple input | [Rich Text Editor](/patterns/forms/rich-text-editor) |
| [Rich Text Editor](/patterns/forms/rich-text-editor) | ✅ Formatted text✅ Long content | ❌ Simple text  | ✅ Formatting   | [Text Field](/patterns/forms/text-field)        |
| [Password](/patterns/forms/password)          | ✅ Secure entry✅ Credentials    | ❌ Public data  | ✅ Masked input | [Code Confirmation](/patterns/forms/code-confirmation) |
| [Search Field](/patterns/forms/search-field)  | ✅ Content search✅ Filtering    | ❌ Exact match  | ✅ Quick search | [Autocomplete](/patterns/forms/autocomplete)    |

## Specialized Input Patterns

| Pattern                                         | Best For                        | Avoid When        | Key Features    | Related                                                     |
| ----------------------------------------------- | ------------------------------- | ----------------- | --------------- | ----------------------------------------------------------- |
| [Currency Input](/patterns/forms/currency-input) | ✅ Money values✅ Formatting      | ❌ Plain numbers   | ✅ Auto-format   | [Text Field](/patterns/forms/text-field)                    |
| [Phone Number](/patterns/forms/phone-number)    | ✅ Phone numbers✅ Formatting     | ❌ Plain text      | ✅ Validation    | [Text Field](/patterns/forms/text-field)                    |
| [Color Picker](/patterns/forms/color-picker)    | ✅ Color selection✅ Visual input | ❌ Text input      | ✅ Visual picker | [Dropdown](/patterns/forms/selection-input)                 |
| [Rating Input](/patterns/forms/rating-input)    | ✅ User ratings✅ Quick input     | ❌ Precise numbers | ✅ Star scale    | [Radio Button](/patterns/forms/radio)                       |
| [Code Confirmation](/patterns/forms/code-confirmation) | ✅ 2FA/OTP✅ Verification         | ❌ Regular input   | ✅ Auto-advance  | [Password](/patterns/forms/password)                        |
| [File Input](/patterns/forms/file-input)        | ✅ File uploads✅ Multiple files  | ❌ Text input      | ✅ File select   | [Drag and Drop](/patterns/content-management/drag-and-drop) |

## Date & Time Patterns

| Pattern                                    | Best For                            | Avoid When      | Key Features   | Related                                    |
| ------------------------------------------ | ----------------------------------- | --------------- | -------------- | ------------------------------------------ |
| [Date Input](/patterns/forms/date-input)   | ✅ Basic date entry✅ Known format    | ❌ Visual needed | ✅ Direct entry | [Date Picker](/patterns/forms/date-picker) |
| [Date Picker](/patterns/forms/date-picker) | ✅ Visual dates✅ Calendar needed     | ❌ Quick entry   | ✅ Calendar UI  | [Date Range](/patterns/forms/date-range)   |
| [Date Range](/patterns/forms/date-range)   | ✅ Period selection✅ Start/end dates | ❌ Single date   | ✅ Range select | [Date Picker](/patterns/forms/date-picker) |

## Content Management Patterns

| Pattern                                                     | Best For                             | Avoid When          | Key Features             | Related                                                 |
| ----------------------------------------------------------- | ------------------------------------ | ------------------- | ------------------------ | ------------------------------------------------------- |
| [Accordion](/patterns/content-management/accordion)         | ✅ Collapsible sections✅ Space saving | ❌ Always visible    | ✅ Progressive disclosure | [Modal](/patterns/content-management/modal)             |
| [Modal](/patterns/content-management/modal)                 | ✅ Focused tasks✅ Important actions   | ❌ Frequent access   | ✅ Focus trap             | [Tooltip](/patterns/content-management/tooltip)         |
| [Carousel](/patterns/content-management/carousel)           | ✅ Multiple items✅ Limited space      | ❌ Comparison needed | ✅ Progressive reveal     | [Infinite Scroll](/patterns/navigation/infinite-scroll) |
| [Tooltip](/patterns/content-management/tooltip)             | ✅ Extra info✅ Quick help             | ❌ Critical info     | ✅ Context help           | [Modal](/patterns/content-management/modal)             |
| [Drag and Drop](/patterns/content-management/drag-and-drop) | ✅ Reordering✅ Visual sorting         | ❌ Simple selection  | ✅ Direct manipulation    | [Selection Input](/patterns/forms/selection-input)      |

## Navigation Patterns

| Pattern                                                 | Best For                                       | Avoid When                                | Key Features                            | Related                                                                                              |
| ------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Back to Top](/patterns/navigation/back-to-top)         | ✅ Long pages✅ Quick return                     | ❌ Short content❌ Mobile-first designs     | ✅ Quick navigation✅ One-click access    | [Infinite Scroll](/patterns/navigation/infinite-scroll)                                              |
| [Breadcrumb](/patterns/navigation/breadcrumb)           | ✅ Deep hierarchies✅ Complex sites✅ E-commerce  | ❌ Flat structures❌ Single-level sites     | ✅ Location awareness✅ Easy backtracking | [Navigation Menu](/patterns/navigation/navigation-menu)                                              |
| [Infinite Scroll](/patterns/navigation/infinite-scroll) | ✅ Content feeds✅ Continuous flow✅ Social media | ❌ Structured content❌ Goal-oriented tasks | ✅ Auto-loading✅ Seamless browsing       | [Pagination](/patterns/navigation/pagination)[Load More](/patterns/navigation/load-more)             |
| [Load More](/patterns/navigation/load-more)             | ✅ Content exploration✅ User control            | ❌ Large datasets❌ Sequential content      | ✅ Manual loading✅ Performance friendly  | [Infinite Scroll](/patterns/navigation/infinite-scroll)[Pagination](/patterns/navigation/pagination) |
| [Pagination](/patterns/navigation/pagination)           | ✅ Large datasets✅ Structured content           | ❌ Short lists❌ Continuous reading         | ✅ Clear boundaries✅ Better orientation  | [Load More](/patterns/navigation/load-more)[Infinite Scroll](/patterns/navigation/infinite-scroll)   |
| [Hamburger Menu](/patterns/navigation/hamburger-menu)   | ✅ Mobile interfaces✅ Space-saving              | ❌ Desktop-first❌ Critical navigation      | ✅ Compact✅ Expandable                   | [Navigation Menu](/patterns/navigation/navigation-menu)[Sidebar](/patterns/navigation/sidebar)       |
| [Megamenu](/patterns/navigation/megamenu)               | ✅ Large sites✅ Complex hierarchies             | ❌ Simple navigation❌ Mobile interfaces    | ✅ Rich content✅ Category overview       | [Navigation Menu](/patterns/navigation/navigation-menu)                                              |
| [Navigation Menu](/patterns/navigation/navigation-menu) | ✅ Primary navigation✅ Site structure           | ❌ Deep hierarchies❌ Complex categories    | ✅ Clear structure✅ Easy access          | [Megamenu](/patterns/navigation/megamenu)                                                            |
| [Sidebar](/patterns/navigation/sidebar)                 | ✅ Dashboard layouts✅ App interfaces            | ❌ Content-heavy sites❌ Mobile-first       | ✅ Persistent nav✅ Context retention     | [Navigation Menu](/patterns/navigation/navigation-menu)                                              |
| [Tabs](/patterns/navigation/tabs)                       | ✅ Related content✅ Switching views             | ❌ Deep hierarchies❌ Many sections         | ✅ Content grouping✅ Quick switching     | [Navigation Menu](/patterns/navigation/navigation-menu)                                              |

## Additional Pattern Categories

The guide also covers additional pattern categories including:
- Data Display (Calendar View, Card Grid, Charts & Graphs, etc.)
- User Feedback (Cookie Consent, Empty States, Loading Indicator, etc.)
- Authentication (Login Form, Password Reset, Social Login, etc.)
- E-commerce (Checkout Flow, Product Card, Shopping Cart)
- Media (Image Gallery, Image Upload, Video Player)
- Social (Activity Feed, Comment System, Like Button, etc.)
- AI Intelligence (AI Chat Interface, AI Loading States, etc.)
- Advanced (Command Palette, Search Results, Wizard/Stepper)

For implementation details and best practices, refer to the full UX Patterns guide at [uxpatterns.dev](https://uxpatterns.dev/patterns/when-to-use-what).