import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtected = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtected(req)) {
    auth.protect(); // ✅ Correct usage
  }
});

export const config = {
  matcher: [
    // Ignore static files and assets
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|css|js|ico|json|woff2?)$).*)',
    '/(api|trpc)(.*)',
  ],
};
