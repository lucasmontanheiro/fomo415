const TSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1ghG_EFqf6qmtiV3ZhtuK5h9dlb3JiqSyZRYqWhXaG2Hw2ardSrH1cTxAOxELM9fYGgej-t07clt8/pub?gid=2084077014&single=true&output=tsv';
let allEvents = [];

// Use current system date
const TODAY = new Date();

async function init() {
    Papa.parse(TSV_URL, {
        download: true,
        header: true,
        complete: function(results) {
            allEvents = results.data.filter(e => e.status === 'ativo' && e.title);
            applyFilter();
            document.getElementById('loader').classList.add('d-none');
        },
        error: function(err) {
            console.error("Error loading TSV:", err);
            document.getElementById('loader').innerHTML = "<p class='text-danger'>Failed to load data. Check console.</p>";
        }
    });

    document.getElementById('dateFilter').addEventListener('change', applyFilter);
}

function parseDate(dateStr) {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
}

function applyFilter() {
    const filterValue = document.getElementById('dateFilter').value;
    const grid = document.getElementById('eventGrid');
    grid.innerHTML = '';

    const filtered = allEvents.filter(event => {
        const eventDate = parseDate(event.date);
        if (!eventDate) return false;

        // Normalize dates to midnight for comparison
        const d = new Date(eventDate.setHours(0,0,0,0));
        const today = new Date(new Date(TODAY).setHours(0,0,0,0));
        
        // Calculations for weekend/weeks
        const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
        
        switch(filterValue) {
            case 'today':
                return d.getTime() === today.getTime();
            case 'tomorrow':
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                return d.getTime() === tomorrow.getTime();
            case 'this-week':
                const endOfWeek = new Date(today);
                endOfWeek.setDate(today.getDate() + (7 - dayOfWeek) % 7);
                return d >= today && d <= endOfWeek;
            case 'weekend':
                // Determine the dates for Friday, Saturday, and Sunday of the CURRENT week
                // today is Sat (6). We want Fri(5), Sat(6), Sun(0 of next week)
                const currentFri = new Date(today);
                currentFri.setDate(today.getDate() - (dayOfWeek >= 5 ? dayOfWeek - 5 : dayOfWeek + 2));
                
                const currentSun = new Date(currentFri);
                currentSun.setDate(currentFri.getDate() + 2);
                
                // Only show weekend events that are TODAY or in the future
                return d >= today && d <= currentSun && (d.getDay() === 5 || d.getDay() === 6 || d.getDay() === 0);
            case 'next-week':
                const nextMon = new Date(today);
                nextMon.setDate(today.getDate() + (1 - dayOfWeek + 7) % 7);
                if (nextMon <= today) nextMon.setDate(nextMon.getDate() + 7);
                const nextSun = new Date(nextMon);
                nextSun.setDate(nextMon.getDate() + 6);
                return d >= nextMon && d <= nextSun;
            default:
                return d >= today;
        }
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="text-center p-5"><h3>No events found for this period.</h3><p>Try another filter!</p></div>';
    } else {
        // Shuffle the filtered events for a random feed
        for (let i = filtered.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
        renderEvents(filtered);
    }
}

function renderEvents(events) {
    const grid = document.getElementById('eventGrid');
    
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        
        const priceLabel = (event.price === '0' || event.price.toLowerCase() === 'free') ? 'FREE' : `$${event.price}`;
        const imageUrl = event.post_image_url_firebase || event.post_image_url;

        // Format DD/MM/YYYY to MM/DD for US audience
        const dateParts = event.date.split('/');
        const displayDate = dateParts.length === 3 ? `${dateParts[1]}/${dateParts[0]}` : event.date;

        card.innerHTML = `
            <div class="price-tag">${priceLabel}</div>
            <img src="${imageUrl}" class="event-image" loading="lazy" alt="${event.title}">
            <div class="event-details">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge badge-zine">${event.district || 'San Francisco'}</span>
                    <small class="fw-bold">${displayDate}</small>
                </div>
                <h3 class="fw-bold h4 mb-1">${event.title}</h3>
                <p class="text-muted small mb-0">@ ${event.owner_full_name} • ${event.time}</p>
            </div>
        `;

        card.onclick = () => showDetail(event);
        grid.appendChild(card);
    });
}

function showDetail(event) {
    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    
    // Format DD/MM/YYYY to MM/DD for display
    const dateParts = event.date.split('/');
    const displayDate = dateParts.length === 3 ? `${dateParts[1]}/${dateParts[0]}` : event.date;

    document.getElementById('modalTitle').innerText = event.title;
    document.getElementById('modalImage').src = event.post_image_url_firebase || event.post_image_url;
    document.getElementById('modalDate').innerText = displayDate;
    document.getElementById('modalCategory').innerText = event.category || 'Event';
    document.getElementById('modalLocation').innerText = `${event.owner_full_name} (${event.district})`;
    document.getElementById('modalTime').innerText = event.time;
    document.getElementById('modalPrice').innerText = (event.price === '0') ? 'Free' : `$${event.price}`;
    document.getElementById('modalCaption').innerText = event.post_caption;
    document.getElementById('modalLink').href = event.post_url;
    
    modal.show();
}

init();
