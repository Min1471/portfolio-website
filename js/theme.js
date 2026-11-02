/**
 * Theme loader. Runs in <head> before the page paints.
 *
 * To change the site's theme, edit DEFAULT_THEME below.
 * To preview another theme without changing anything, open any page with
 * ?theme=cosmic, ?theme=blueprint or ?theme=signal (the choice sticks while
 * you browse in that tab; ?theme=reset clears it).
 */
(function () {
    var DEFAULT_THEME = 'signal';

    var FONTS = {
        cosmic: 'family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600',
        blueprint: 'family=Archivo:wdth,wght@62..125,400..800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500',
        signal: 'family=Instrument+Sans:wdth,wght@75..100,400..700&family=IBM+Plex+Mono:wght@400;500'
    };

    var theme = DEFAULT_THEME;
    try {
        var requested = new URLSearchParams(window.location.search).get('theme');
        if (requested === 'reset') sessionStorage.removeItem('theme');
        else if (requested && FONTS[requested]) sessionStorage.setItem('theme', requested);
        var saved = sessionStorage.getItem('theme');
        if (saved && FONTS[saved]) theme = saved;
    } catch (e) { /* storage unavailable: use the default */ }

    document.documentElement.setAttribute('data-theme', theme);

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' + FONTS[theme] + '&display=swap';
    document.head.appendChild(link);
})();
