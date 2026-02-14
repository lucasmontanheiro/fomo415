# fomo415

[www.fomo415.com](https://www.fomo415.com)

A web application to discover San Francisco's cultural and fun events, built with a "zine" aesthetic.

## Data & Processing
The application fetches data from a Google Sheets TSV:
[TSV URL](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1ghG_EFqf6qmtiV3ZhtuK5h9dlb3JiqSyZRYqWhXaG2Hw2ardSrH1cTxAOxELM9fYGgej-t07clt8/pub?gid=2084077014&single=true&output=tsv)

### Machine Learning & Automation
Event data is collected and cleaned using machine learning and automated sources. Because data may come from third parties and automated processes:
- Machine learning does not ensure 100% correctness.
- Information may be inaccurate, incomplete, or outdated.
- Users are encouraged to verify event details with original sources.

## Project Structure
- `index.html`: Main event feed and filter.
- `legal.html`: Terms of Service, Disclaimer, and Privacy Policy.
- `script.js`: Data fetching, ML data filtering, and UI logic.
- `style.css`: Custom "zine-style" high-contrast design.

## Tech Stack
- HTML5 / CSS3 (Bootstrap 5)
- Vanilla JavaScript
- [PapaParse](https://www.papaparse.com/) (for TSV parsing)
- GitHub Pages for hosting

## Credits
Built by [Macondo Labs](https://macondolabs.com).
Contact: contact at macondolabs.com
