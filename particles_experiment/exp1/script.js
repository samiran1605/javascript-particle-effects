const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'white';


class Particle {
    constructor(effect) {
        this.effect = effect;
        this.radius = Math.random() * 10 + 2;
        this.x = this.radius + (Math.random()) * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 5-2;
        this.vy = Math.random() * 5-2;
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }
    update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;
        if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;

        
    }
    
    checkCollision() {
        this.effect.particles.map(particle => {
            if (particle !== this) {
                const dx = particle.x - this.x;
                const dy = particle.y - this.y;
                const distance = Math.hypot(dx, dy);
                const minDistance = this.radius + particle.radius;


                if (distance <= minDistance) {
                    this.vx *= -1;
                    this.vy *= -1;
                    // const overlap = minDistance - distance;
                    const collisionAngle = Math.atan2(dy, dx);
                    // console.log(collisionAngle)
                    // const targetX = this.x + Math.cos(collisionAngle) * overlap * 0.5;
                    // const targetY = this.y + Math.sin(collisionAngle) * overlap * 0.5;
    
                    // const thisSpeed = Math.hypot(this.vx, this.vy);
                    // const particleSpeed = Math.hypot(particle.vx, particle.vy);
                    // const impactAngle = Math.atan2(particle.y - this.y, particle.x - this.x);
    
                    // this.vx = Math.cos(impactAngle) * particleSpeed;
                    // this.vy = Math.sin(impactAngle) * particleSpeed;
                    // particle.vx = Math.cos(impactAngle + Math.PI) * thisSpeed;
                    // particle.vy = Math.sin(impactAngle + Math.PI) * thisSpeed;
    
                    // this.x = targetX;
                    // this.y = targetY;
                    // particle.x = targetX;
                    // particle.y = targetY;
                }
            }
        });
    }
}

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 20;
        this.createParticle();
    }
    createParticle() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context) {
        this.particles.forEach(particle => {
            particle.draw(context)
            particle.update()
            particle.checkCollision()
        })
    };

}

const effect = new Effect(canvas)


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx)
    requestAnimationFrame(animate)
}

animate()