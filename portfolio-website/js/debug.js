// Debug script to test functionality directly
console.log('🔧 Debug script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 DOM loaded, setting up manual tests...');
    
    // Force immediate setup without timeout
    console.log('🔧 Running immediate setup...');
    
    // Test 1: Manual tab switching
    const tabs = document.querySelectorAll('.category-tabs li');
    const sections = document.querySelectorAll('.achievement-section');
    
    console.log('Found tabs:', tabs.length);
    console.log('Found sections:', sections.length);
    
    if (tabs.length === 0) {
        console.error('❌ No tabs found!');
        return;
    }
    
    tabs.forEach((tab, index) => {
        console.log(`Setting up tab ${index}: "${tab.textContent.trim()}" with data-target="${tab.getAttribute('data-target')}"`);
        
        // Remove any existing listeners first
        tab.onclick = null;
        
        // Add click listener
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Tab clicked:', tab.textContent.trim());
            
            const target = tab.getAttribute('data-target');
            console.log('🎯 Target:', target);
            
            // Remove active from all tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                console.log('Removed active from:', t.textContent.trim());
            });
            
            // Add active to clicked tab
            tab.classList.add('active');
            console.log('✅ Added active to:', tab.textContent.trim());
            
            // Hide all sections
            sections.forEach(s => {
                s.classList.remove('active-section');
                console.log('Hidden section:', s.id);
            });
            
            // Show target section
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add('active-section');
                console.log('✅ Section activated:', target);
            } else {
                console.error('❌ Section not found:', target);
            }
        }, true); // Use capture phase
        
        console.log(`✅ Tab ${index} listener attached`);
    });
    
    // Test 2: Manual button setup
    const buttons = document.querySelectorAll('[data-achievement], [data-project]');
    console.log('Found achievement/project buttons:', buttons.length);
    
    if (buttons.length === 0) {
        console.error('❌ No buttons found!');
        return;
    }
    
    buttons.forEach((button, index) => {
        const achievement = button.getAttribute('data-achievement');
        const project = button.getAttribute('data-project');
        console.log(`Setting up button ${index}: "${button.textContent.trim()}" -> ${achievement || project}`);
        
        // Remove any existing listeners first
        button.onclick = null;
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Button clicked:', button.textContent.trim());
            console.log('📋 Data attribute:', achievement || project);
            
            // Simple alert for now to test if click works
            alert(`Button clicked: ${button.textContent.trim()}\nData: ${achievement || project}`);
        }, true); // Use capture phase
        
        console.log(`✅ Button ${index} listener attached`);
    });
    
    console.log('✅ All manual setup complete');
    
    // Test if elements are actually clickable
    setTimeout(() => {
        console.log('🧪 Testing element visibility and clickability...');
        tabs.forEach((tab, index) => {
            const rect = tab.getBoundingClientRect();
            const style = window.getComputedStyle(tab);
            console.log(`Tab ${index} - visible: ${rect.width > 0 && rect.height > 0}, pointer-events: ${style.pointerEvents}, z-index: ${style.zIndex}`);
        });
        
        buttons.forEach((button, index) => {
            const rect = button.getBoundingClientRect();
            const style = window.getComputedStyle(button);
            console.log(`Button ${index} - visible: ${rect.width > 0 && rect.height > 0}, pointer-events: ${style.pointerEvents}, z-index: ${style.zIndex}`);
        });
    }, 1000);
});
