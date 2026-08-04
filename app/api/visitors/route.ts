import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { recordVisitLocal, getStatsLocal } from '@/lib/visitorStore';

// Optional Vercel Analytics integration (non-breaking)
async function tryRecordVercelAnalytics(payload: Record<string, any>) {
    try {
        const pkgName = '@vercel/analytics';
        // use Function to avoid bundler resolving the string at build time
        // @ts-ignore
        const mod = await new Function('pkg', 'return import(pkg)')(pkgName);
        const fn = mod?.track || mod?.event || mod?.default;
        if (typeof fn === 'function') {
            try {
                // call analytics library but don't await to avoid blocking response
                fn({ name: 'visit', payload });
            } catch (e) {
                // ignore analytics failures
            }
        }
    } catch (e) {
        // package not installed or import failed — silently ignore
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const page = (body && body.page) || undefined;
        const country = (body && body.country) || undefined;
        const country_code = (body && body.country_code) || undefined;

        const ip = req.headers.get('x-forwarded-for') || req.ip || '0.0.0.0';

        // Always record locally (in-memory fallback)
        recordVisitLocal(ip, country, country_code, page);

        // Fire off optional Vercel Analytics event if package present
        tryRecordVercelAnalytics({ ip, page, country, country_code, timestamp: new Date().toISOString() });

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
    }
}

export async function GET() {
    try {
        const local = getStatsLocal();
        return NextResponse.json({ ok: true, source: 'local', ...local });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
    }
}
