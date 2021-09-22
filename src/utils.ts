/**
 * Check that accession number is in the correct format.
 */
export function validateAccessionNumber(accessionNumber: string): void {
    if (!/^\d{10}-\d{2}-\d{6,}$/.test(accessionNumber)) {
        throw new Error('Accession number does not have the correct format.');
    }
}

export function repairCik(cik: number, accessionNumber: string): number {
    if (cik === 903377 && accessionNumber === '0000898430-95-001046') {
        // Doesn't exist: https://www.sec.gov/Archives/edgar/data/903377/0000898430-95-001046.txt
        // Exists:        https://www.sec.gov/Archives/edgar/data/701169/0000898430-95-001046.txt
        return 701169;
    }

    if (cik === 880026 && accessionNumber === '0001193125-08-024463') {
        // Broken:        https://www.sec.gov/Archives/edgar/data/880026/000119312508024463/0001193125-08-024463.txt
        // Doesn't exist: https://www.sec.gov/Archives/edgar/data/880026/000119312508024463/0001193125-08-024463.hdr.sgml

        // Fixed:         https://www.sec.gov/Archives/edgar/data/1319519/000119312508024463/0001193125-08-024463.txt
        // Exists:        https://www.sec.gov/Archives/edgar/data/1319519/000119312508024463/0001193125-08-024463.hdr.sgml
        return 1319519;
    }

    return cik;
}

export function formatCik(cik: number): string {
    return cik.toString(10).padStart(10, '0');
}