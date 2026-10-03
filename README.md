# Elsys Eng. website

Next.js + TypeScript + Tailwind CSS + Swiper + Framer Motion + Lucide React.

Run:

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Admin access

1. Run `supabase/schema.sql` in the Supabase SQL Editor. Write access is limited to users with the admin role.
2. In Supabase Dashboard, create the admin user under **Authentication > Users** with an email and password.
3. Set that user's **app_metadata** to `{"role":"admin"}`. Do not set the role in user-editable `user_metadata`.
4. Add the login alias to `.env.local` if you want username sign-in as well as email sign-in:

```env
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
NEXT_PUBLIC_ADMIN_USERNAME=admin
```

Email sign-in works without the alias variables. Restart the app after changing environment variables. No default admin password is configured.

The supplied screenshot is included as `public/images/reference.png`. The visible photo assets are local crops from that supplied reference so the project works without external image URLs. Replace those with original source photos for production if needed.
