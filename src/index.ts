import { URL } from 'url';
import { formatCik, repairCik, validateAccessionNumber } from "./utils";

/**
 * Gets an entity (company, person, etc.) landing page URL in primary EDGAR system.
 * 
 * @example `https://www.sec.gov/edgar/browse/?CIK=320193`
 * @param cik Entity's Central Index Key.
 * @returns URL.
 */
export function getEntityPageUrl(cik: number): string {
    const url = new URL('https://www.sec.gov/edgar/browse/');
    url.searchParams.append("CIK", formatCik(cik));
    return url.toString();
}

/**
 * Gets an entity landing page URL in auxiliary EDGAR system.
 * 
 * @example `https://www.edgarcompany.sec.gov/servlet/CompanyDBSearch?page=detailed&main_back=1&cik=0000320193`
 * @param cik Entity's Central Index Key.
 * @returns URL.
 */
export function getEntityPageUrl2(cik: number): string {
    const url = new URL('https://www.edgarcompany.sec.gov/servlet/CompanyDBSearch?page=detailed&main_back=1');
    url.searchParams.append("cik", formatCik(cik));
    return url.toString();
}

/**
 * Gets URL of EDGAR page showing transactions of entity securities by insiders.
 * 
 * @example `https://www.sec.gov/cgi-bin/own-disp?action=getissuer&CIK=0000320193`
 * @param cik Entity's Central Index Key.
 * @returns URL.
 */
export function getInsiderTransactionsPageUrl(cik: number): string {
    const url = new URL('https://www.sec.gov/cgi-bin/own-disp?action=getissuer');
    url.searchParams.append("CIK", formatCik(cik));
    return url.toString();
}

/**
 * Gets URL of EDGAR page showing transactions of securities owned by the entity.
 * 
 * @example `https://www.sec.gov/cgi-bin/own-disp?action=getowner&CIK=0000320193`
 * @param cik Entity's Central Index Key.
 * @returns URL.
 */
export function getOwnerTransactionsPageUrl(cik: number): string {
    const url = new URL('https://www.sec.gov/cgi-bin/own-disp?action=getowner');
    url.searchParams.append("CIK", formatCik(cik));
    return url.toString();
}

/**
 * Gets URL of a JSON document with entity info.
 * 
 * @example `https://data.sec.gov/submissions/CIK0000320193.json`
 * @param cik Entity's Central Index Key.
 * @returns URL.
 */
export function geEntityJsonUrl(cik: number): string {
    return new URL(`https://data.sec.gov/submissions/CIK${formatCik(cik)}.json`).toString();
}

/**
 * Gets URL of a filing in .txt format, which contains all of the following:
 * - Filing header (in a human-readable text format)
 * - Main document
 * - Supplemental documents
 * - Attachments
 * 
 * This file seems to be updated when corrections are submitted.
 * 
 * @example `https://www.sec.gov/Archives/edgar/data/0000320193/0000320193-20-000096.txt`
 * @param cik Entity's Central Index Key.
 * @param accessionNumber Filing accession number.
 * @returns URL.
 */
export function getFilingUrl(cik: number, accessionNumber: string): string {
    validateAccessionNumber(accessionNumber);
    cik = repairCik(cik, accessionNumber);

    return new URL(`https://www.sec.gov/Archives/edgar/data/${formatCik(cik)}/${accessionNumber}.txt`).toString();
}

/**
 * Gets URL of a filing header in SGML format. The header is in machine-readable format.
 * The header file does not seem to be updated when corrections are submitted.
 * 
 * @example `https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/0000320193-20-000096.hdr.sgml`
 * @param cik Entity's Central Index Key.
 * @param accessionNumber Filing accession number.
 * @returns URL.
 */
export function getFilingHeaderUrl(cik: number, accessionNumber: string): string {
    validateAccessionNumber(accessionNumber);
    cik = repairCik(cik, accessionNumber);

    const f_cik = formatCik(cik),
          f_accessionNumber = accessionNumber.replace(/\-+/g, '');
    
    return new URL(`https://www.sec.gov/Archives/edgar/data/${f_cik}/${f_accessionNumber}/${accessionNumber}.hdr.sgml`).toString();
}

/**
 * Gets a URL of EDGAR page showing details of a specific filing.
 * 
 * @example `https://www.sec.gov/Archives/edgar/data/0000320193/000032019320000096/0000320193-20-000096-index.htm`
 * @param cik Entity's Central Index Key.
 * @param accessionNumber Filing accession number.
 * @returns URL.
 */
export function getFilingPageUrl(cik: number, accessionNumber: string): string {
    validateAccessionNumber(accessionNumber);
    cik = repairCik(cik, accessionNumber);
    const fCik = formatCik(cik);

    return new URL(`https://www.sec.gov/Archives/edgar/data/${fCik}/${accessionNumber}-index.htm`).toString();
}
