document.querySelectorAll('.nav-item').forEach(item => {                                     // Mouse hover effect
    const dot = item.querySelector('.reveal-dot');

    item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        dot.style.left = (e.clientX - rect.left) + 'px';
        dot.style.top  = (e.clientY - rect.top)  + 'px';
        item.classList.add('hovering');
    });

    item.addEventListener('mouseleave', () => {
        item.classList.remove('hovering');
    });
});
