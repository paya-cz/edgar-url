# edgar-url

Get [SEC](https://www.sec.gov/) [EDGAR](https://www.sec.gov/edgar/searchedgar/companysearch.html) URLs for filings, entities, pages, and data.

# Installation

With [npm](https://www.npmjs.com/) do:

    $ npm install @mangosteen/edgar-url

# Usage

```js
import edgarUrl from '@mangosteen/edgar-url';

// https://www.sec.gov/Archives/edgar/data/0000320193/0000320193-20-000096.txt
console.log(
    edgarUrl.getFilingUrl(320193, '0000320193-20-000096')
);
```