"use client";

import { useEffect, useState } from 'react';

type Country = { country: string; count: number };

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [unique, setUnique] = useState(0);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        let mounted = true;
        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/visitors');
                const data = await res.json();
                if (!mounted) return;
                if (data.source === 'local') {
                    setTotal(data.total || 0);
                    setUnique(data.unique || 0);
                    setCountries(data.countries || []);
                } else if (data.countries) {
                    setCountries(data.countries || []);
                }
            } catch (e) {
                console.error(e);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchStats();
        const id = setInterval(fetchStats, 5000);
        return () => { mounted = false; clearInterval(id); };
    }, []);

    return (
        <div className="mx-auto max-w-4xl p-6">
            <h1 className="text-2xl font-bold mb-4">Visitor Analytics</h1>
            {loading ? <p>Loading...</p> : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-gray-500">Total Visits</p>
                        <p className="text-2xl font-semibold">{total}</p>
                    </div>
                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-gray-500">Unique Visitors</p>
                        <p className="text-2xl font-semibold">{unique}</p>
                    </div>
                    <div className="rounded-lg border p-4 md:col-span-3">
                        <p className="text-sm text-gray-500">Visits by Country</p>
                        <ul className="mt-3 space-y-2 max-h-64 overflow-auto">
                            {countries.length === 0 && <li className="text-sm text-gray-500">No data yet</li>}
                            {countries.map((c) => (
                                <li key={c.country} className="flex items-center justify-between">
                                    <span>{c.country}</span>
                                    <span className="font-semibold">{c.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
