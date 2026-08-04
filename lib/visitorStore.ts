type CountryCount = { country: string; country_code?: string; count: number };

const visits: Map<string, { ip: string; country?: string; country_code?: string; count: number; lastSeen: number }> = new Map();

export function recordVisitLocal(ip: string, country?: string, country_code?: string, page?: string) {
    const key = ip || (page ? `page:${page}` : 'anon');
    const now = Date.now();
    const existing = visits.get(key);
    if (existing) {
        existing.count += 1;
        existing.lastSeen = now;
    } else {
        visits.set(key, { ip, country, country_code, count: 1, lastSeen: now });
    }
}

export function getStatsLocal() {
    let total = 0;
    const byCountry = new Map<string, number>();
    visits.forEach((v) => {
        total += v.count;
        const c = v.country || 'Unknown';
        byCountry.set(c, (byCountry.get(c) || 0) + v.count);
    });

    const countries: CountryCount[] = Array.from(byCountry.entries()).map(([country, count]) => ({ country, count }));
    const unique = visits.size;

    return { total, unique, countries };
}

export function resetLocal() {
    visits.clear();
}
