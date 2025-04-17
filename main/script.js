document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = document.getElementById("welcome-message");
    const nextMessage = document.getElementById("next-message");
    const content = document.getElementById("content");

    setTimeout(() => {
        welcomeMessage.style.opacity = 1;
    }, 100);
    setTimeout(() => {
        welcomeMessage.style.opacity = 0;
    }, 3000);
    setTimeout(() => {
        nextMessage.style.opacity = 1;
    }, 3000);
    setTimeout(() => {
        nextMessage.style.opacity = 0;
        content.style.display = "block";
    }, 6000);

    // Mouvement de texte avec la souris
    document.addEventListener('mousemove', (e) => {
        let x = (e.clientX / window.innerWidth) - 0.5;
        let y = (e.clientY / window.innerHeight) - 0.5;
        content.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
    });
});
