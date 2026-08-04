"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorRecorder() {
    const pathname = usePathname();

    useEffect(() => {
        let mounted = true;

        const send = async () => {
            try {
                await fetch('/api/visitors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ page: pathname }),
                    keepalive: true,
                });
            } catch (e) {
                // ignore network errors
            }
        };

        if (mounted) send();

        return () => { mounted = false; };
    }, [pathname]);

    return null;
}
