# Project Documentation Guide

This guide explains all documentation features implemented in the Mini Online Store project.

## 📚 Table of Contents

1. [README](#readme)
2. [License & License Report](#license--license-report)
3. [Cookie Consent (GDPR)](#cookie-consent-gdpr)
4. [Privacy Policy](#privacy-policy)
5. [Swagger API Documentation](#swagger-api-documentation)
6. [Compodoc Code Documentation](#compodoc-code-documentation)
7. [Storybook Component Library](#storybook-component-library)

---

## 1. README

**Location:** `/README.md`

The main README file contains:
- Project overview and description
- Tech stack details
- Installation instructions
- Configuration guide
- Available commands
- Project structure
- License information
- Author information

**Update when:**
- Adding new features
- Changing installation/setup process
- Updating dependencies
- Changing project structure

---

## 2. License & License Report

### License File
**Location:** `/LICENSE`

MIT License - Permissive open-source license allowing:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

### License Report
**Location:** `/LICENSE_REPORT.md` and `/LICENSE_REPORT.txt`

Contains a full audit of all dependencies and their licenses.

**Generate/Update:**
```bash
cd api
npm run license:check      # View summary in terminal
npm run license:report     # Generate Markdown report
```

**When to update:**
- After installing new dependencies
- Before releasing new versions
- During security audits

---

## 3. Cookie Consent (GDPR)

**Location:** `client/src/App.tsx`

Cookie consent popup appears on first visit, compliant with GDPR regulations.

**Features:**
- ✅ Accept/Decline buttons
- ✅ Link to Privacy Policy
- ✅ 365-day cookie expiration
- ✅ Styled with Tailwind CSS
- ✅ Responsive design

**Library:** `react-cookie-consent`

**Customize:**
Edit the `<CookieConsent>` component in `App.tsx`:
```tsx
<CookieConsent
  location="bottom"
  buttonText="Accept All Cookies"
  declineButtonText="Decline"
  enableDeclineButton
  cookieName="miniStoreConsent"
  // ... more options
>
  Your custom message here
</CookieConsent>
```

---

## 4. Privacy Policy

**Location:** `/PRIVACY_POLICY.md`

Comprehensive privacy policy covering:
- Data collection practices
- GDPR compliance
- User rights (access, deletion, portability)
- Cookie usage
- Data retention policies
- Contact information

**Update when:**
- Changing data collection practices
- Adding third-party services
- Changing data retention policies
- Required by legal changes

---

## 5. Swagger API Documentation

**Access:** `http://localhost:3000/api/docs`

Interactive API documentation with:
- All API endpoints
- Request/response schemas
- Authentication (Bearer token)
- Try-it-out functionality

### Documented Endpoints:

#### Authentication (`/api/auth`)
- ✅ `POST /auth/register` - Register new user
- ✅ `POST /auth/login` - Login user

#### Products (`/api/products`)
- ✅ `GET /products` - Get all products
- ✅ `GET /products/:id` - Get product by ID
- ✅ `POST /products` - Create product (Admin)
- ✅ `PUT /products/:id` - Update product (Admin)
- ✅ `DELETE /products/:id` - Delete product (Admin)

### How to Document New Endpoints:

1. Add decorators to controller:
```typescript
@ApiTags('YourModule')
@Controller('your-route')
export class YourController {
  
  @Get()
  @ApiOperation({ summary: 'Description' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async yourMethod() {
    // ...
  }
}
```

2. Add to DTOs:
```typescript
export class YourDto {
  @ApiProperty({
    description: 'Field description',
    example: 'Example value',
  })
  @IsString()
  field: string;
}
```

---

## 6. Compodoc Code Documentation

**Generate:** `npm run docs:generate` (from `/api` directory)

**Serve:** `npm run docs:serve` (from `/api` directory)

**Access:** `http://localhost:8080`

**Output:** `/docs` directory (gitignored)

### Features:
- 📊 Module dependency graphs
- 📁 Project structure visualization
- 📝 Class/interface documentation
- 📈 Coverage report
- 🔍 Search functionality

### What's Documented:
- ✅ Modules (6 total)
- ✅ Controllers (5 total)
- ✅ Services (13 injectables)
- ✅ Entities (5 total)
- ✅ DTOs
- ✅ Guards & Strategies
- ✅ Interfaces & Types

### How to Improve Documentation:

Add JSDoc comments to your code:
```typescript
/**
 * Service for managing user authentication
 * @export
 * @class AuthService
 */
export class AuthService {
  /**
   * Register a new user
   * @param {RegisterDto} registerDto - User registration data
   * @returns {Promise<AuthResponse>} User data and JWT token
   * @throws {ConflictException} If user already exists
   */
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // ...
  }
}
```

---

## 7. Storybook Component Library

**Start:** `npm run storybook` (from `/client` directory)

**Access:** `http://localhost:6006`

**Build:** `npm run build-storybook` (from `/client` directory)

### Documented Components:

#### 1. Button Component
**Location:** `client/src/components/common/Button.tsx`

**Stories:**
- ✅ Primary - Default green button
- ✅ Secondary - Gray button variant
- ✅ Outline - Bordered button
- ✅ Danger - Red destructive button
- ✅ Small - Compact size
- ✅ Medium - Default size
- ✅ Large - Enlarged size
- ✅ Disabled - Non-interactive state
- ✅ FullWidth - Stretches to container width
- ✅ WithIcon - Button with icon
- ✅ Loading - Processing state
- ✅ AllVariants - Comparison view
- ✅ AllSizes - Size comparison

#### 2. ProductCard Component
**Location:** `client/src/components/products/ProductCard.tsx`

**Stories:**
- ✅ Default - Standard product card
- ✅ OutOfStock - Product unavailable
- ✅ LowStock - Limited availability
- ✅ HighPriceItem - Premium product
- ✅ LongDescription - Text overflow handling
- ✅ NoImage - Fallback state

### How to Add New Stories:

1. Create a `.stories.tsx` file next to your component:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    prop1: {
      control: 'text',
      description: 'Description of prop1',
    },
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prop1: 'value',
  },
};
```

### Storybook Features:
- 🎨 Interactive controls
- 📱 Responsive viewport testing
- ♿ Accessibility checks (addon-a11y)
- 📖 Auto-generated documentation
- 🧪 Visual testing with Vitest

---

## Quick Reference Commands

### Backend (api/)
```bash
# Start development server
npm run start:dev

# Generate Compodoc
npm run docs:generate

# Serve Compodoc
npm run docs:serve

# Check licenses
npm run license:check

# Generate license report
npm run license:report
```

### Frontend (client/)
```bash
# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

---

## Accessing Documentation

| Documentation | URL | Command |
|--------------|-----|---------|
| **Swagger API** | http://localhost:3000/api/docs | `npm run start:dev` (in api/) |
| **Compodoc** | http://localhost:8080 | `npm run docs:serve` (in api/) |
| **Storybook** | http://localhost:6006 | `npm run storybook` (in client/) |

---

## Maintenance Checklist

### Weekly
- [ ] Check Swagger docs are up-to-date with API changes
- [ ] Review Storybook for new components

### Monthly
- [ ] Update README with new features
- [ ] Regenerate license report
- [ ] Review Privacy Policy for accuracy

### Before Release
- [ ] Update all version numbers
- [ ] Regenerate Compodoc documentation
- [ ] Build Storybook static site
- [ ] Check GDPR compliance
- [ ] Verify all links in README

---

## Contributing to Documentation

When adding new features:

1. **Update README** - Add to features list and commands
2. **Add Swagger Docs** - Document all API endpoints
3. **Write JSDoc Comments** - For Compodoc
4. **Create Stories** - For UI components
5. **Update Privacy Policy** - If collecting new data

---

## Questions?

Contact: privacy@ministore.example.com

GitHub: [@tantaneity](https://github.com/tantaneity)

---

**Last Updated:** November 22, 2025
