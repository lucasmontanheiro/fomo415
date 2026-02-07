# fomo415

A GitHub Pages application to discover San Francisco's cultural and fun events.

## Data Source
The application fetches data from a Google Sheets TSV:
[TSV URL](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1ghG_EFqf6qmtiV3ZhtuK5h9dlb3JiqSyZRYqWhXaG2Hw2ardSrH1cTxAOxELM9fYGgej-t07clt8/pub?gid=2084077014&single=true&output=tsv)

### Data Columns
- `status`: Event status (e.g., "ativo")
- `id`: Unique identifier
- `date`: Event date (DD/MM/YYYY)
- `title`: Event name
- `time`: Event time
- `price`: Entry cost
- `username`: Source username
- `owner_full_name`: Venue/Organizer name
- `source_url`: Original source URL
- `post_url`: Social media post URL
- `post_image_url_firebase`: Backup image URL
- `post_image_url`: Primary image URL
- `post_caption`: Detailed description
- `post_timestamp`: Data creation timestamp
- `display_url`: Display URL
- `city`: City (San Francisco)
- `district`: Neighborhood/Area
- `category`: Event category
- `tags`: Searchable tags
- `video_url`: Related video link
- `banner_url`: Event banner link

## Tech Stack
- HTML5 / CSS3 (Bootstrap / Material Design)
- Vanilla JavaScript
- PapaParse (for TSV parsing)
- GitHub Pages for hosting
