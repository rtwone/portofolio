import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    return NextResponse.json({ ok: false, error: 'Visitors feature disabled' }, { status: 404 });
}

export async function GET() {
    return NextResponse.json({ ok: false, error: 'Visitors feature disabled' }, { status: 404 });
}
