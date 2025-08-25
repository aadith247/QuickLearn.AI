import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtected = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  const host = req.headers.get('host');
  if (host === 'quick-learn-ai-ynxs-qcxr4hth2-aadith247s-projects.vercel.app') {
    const redirectUrl = new URL(`${req.nextUrl.pathname}${req.nextUrl.search}`, 'https://quick-learn-ai-ynxs.vercel.app');
    return NextResponse.redirect(redirectUrl, 308);
  }
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
