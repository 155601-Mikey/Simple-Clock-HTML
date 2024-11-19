class ClockApp {
  constructor() {
    this.currentMode = 'clock';
    this.isRunning = false;
    this.time = 0;
    this.interval = null;
    
    this.initTheme();
    this.initNavigation();
    this.initClock();
    this.renderControls();
    
    setInterval(() => this.updateClock(), 1000);
  }

  initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    document.getElementById('themeToggle').addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  initNavigation() {
    document.querySelectorAll('.nav button').forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.mode === this.currentMode) return;
        
        const container = document.querySelector('.clock-container');
        container.classList.add('switching');
        
        setTimeout(() => {
          document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
          button.classList.add('active');
          this.currentMode = button.dataset.mode;
          this.stop();
          this.time = 0;
          this.clearClockDisplay();
          this.renderControls();
          
          setTimeout(() => {
            container.classList.remove('switching');
          }, 300);
        }, 300);
      });
    });
  }

  initClock() {
    const numbers = document.querySelector('.numbers');
    for (let i = 1; i <= 12; i++) {
      const number = document.createElement('div');
      number.className = 'number';
      number.style.transform = `rotate(${i * 30}deg)`;
      number.innerHTML = `<span style="transform: rotate(${-i * 30}deg)">${i}</span>`;
      numbers.appendChild(number);
    }
  }

  createScrollColumns() {
    return `
      <div class="scroll-digit">
        <div class="scroll-column hours-tens">
          ${Array.from({length: 3}, (_, i) => `<div>${i}</div>`).join('')}
        </div>
      </div>
      <div class="scroll-digit">
        <div class="scroll-column hours-ones">
          ${Array.from({length: 10}, (_, i) => `<div>${i}</div>`).join('')}
        </div>
      </div>
      <span class="divider">:</span>
      <div class="scroll-digit">
        <div class="scroll-column minutes-tens">
          ${Array.from({length: 6}, (_, i) => `<div>${i}</div>`).join('')}
        </div>
      </div>
      <div class="scroll-digit">
        <div class="scroll-column minutes-ones">
          ${Array.from({length: 10}, (_, i) => `<div>${i}</div>`).join('')}
        </div>
      </div>
      <span class="divider">:</span>
      <div class="scroll-digit">
        <div class="scroll-column seconds-tens">
          ${Array.from({length: 6}, (_, i) => `<div>${i}</div>`).join('')}
        </div>
      </div>
      <div class="scroll-digit">
        <div class="scroll-column seconds-ones">
          ${Array.from({length: 10}, (_, i) => `<div>${i}</div>`).join('')}
        </div>
      </div>
    `;
  }

  updateScrollColumn(type, value) {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    
    const tensColumn = document.querySelector(`.${type}-tens`);
    const onesColumn = document.querySelector(`.${type}-ones`);
    
    if (tensColumn && onesColumn) {
      const tensHeight = tensColumn.querySelector('div').offsetHeight;
      const onesHeight = onesColumn.querySelector('div').offsetHeight;
      
      tensColumn.style.transform = `translateY(-${tens * tensHeight}px)`;
      onesColumn.style.transform = `translateY(-${ones * onesHeight}px)`;
    }
  }

  updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (this.currentMode === 'clock') {
      const digitalClock = document.querySelector('.digital-clock');
      const analogClock = document.querySelector('.analog-clock');
      
      if (!digitalClock.querySelector('.scroll-digit')) {
        digitalClock.innerHTML = this.createScrollColumns();
      }

      // Update digital clock
      requestAnimationFrame(() => {
        this.updateScrollColumn('hours', hours);
        this.updateScrollColumn('minutes', minutes);
        this.updateScrollColumn('seconds', seconds);
      });

      // Update analog clock
      const hourDeg = ((hours % 12) * 3600 + minutes * 60 + seconds) * (360 / (12 * 3600));
      const minuteDeg = (minutes * 60 + seconds) * (360 / (60 * 60));
      const secondDeg = seconds * (360 / 60);

      if (analogClock) {
        analogClock.style.display = 'block';
        requestAnimationFrame(() => {
          document.querySelector('.hour').style.transform = `rotate(${hourDeg}deg)`;
          document.querySelector('.minute').style.transform = `rotate(${minuteDeg}deg)`;
          document.querySelector('.second').style.transform = `rotate(${secondDeg}deg)`;
        });
      }
    }
  }

  updateAnalogDisplay() {
    if (this.currentMode !== 'clock') {
      const totalSeconds = this.time / 1000;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      
      const hourDeg = (hours % 12) * (360 / 12) + (minutes / 60) * (360 / 12);
      const minuteDeg = minutes * (360 / 60) + (seconds / 60) * (360 / 60);
      const secondDeg = seconds * (360 / 60);

      requestAnimationFrame(() => {
        document.querySelector('.hour').style.transform = `rotate(${hourDeg}deg)`;
        document.querySelector('.minute').style.transform = `rotate(${minuteDeg}deg)`;
        document.querySelector('.second').style.transform = `rotate(${secondDeg}deg)`;
      });
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    if (this.currentMode === 'stopwatch') {
      let lastTime = performance.now();
      this.interval = setInterval(() => {
        const currentTime = performance.now();
        const delta = currentTime - lastTime;
        lastTime = currentTime;
        this.time += delta;
        this.updateDisplay();
        this.updateAnalogDisplay();
      }, 16);
    } else if (this.currentMode === 'timer') {
      if (this.time <= 0) return;
      let lastTime = performance.now();
      this.interval = setInterval(() => {
        const currentTime = performance.now();
        const delta = currentTime - lastTime;
        lastTime = currentTime;
        this.time = Math.max(0, this.time - delta);
        if (this.time <= 0) {
          this.stop();
          alert('Timer finished!');
        }
        this.updateDisplay();
        this.updateAnalogDisplay();
      }, 16);
    }
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.interval);
  }

  reset() {
    this.stop();
    this.time = 0;
    this.updateDisplay();
  }

  updateDisplay() {
    const digitalClock = document.querySelector('.digital-clock');
    
    if (this.currentMode === 'clock') {
      this.updateClock();
    } else {
      if (!this.time && !this.isRunning) {
        this.clearClockDisplay();
      } else {
        const milliseconds = String(Math.floor((this.time % 1000) / 10)).padStart(2, '0');
        const seconds = String(Math.floor((this.time / 1000) % 60)).padStart(2, '0');
        const minutes = String(Math.floor((this.time / 60000) % 60)).padStart(2, '0');
        const hours = String(Math.floor(this.time / 3600000)).padStart(2, '0');

        digitalClock.innerHTML = `
          <span>${hours}</span>
          <span class="divider">:</span>
          <span>${minutes}</span>
          <span class="divider">:</span>
          <span>${seconds}</span>
          ${this.currentMode === 'stopwatch' ? `<span class="milliseconds">.${milliseconds}</span>` : ''}
        `;
        
        this.updateAnalogDisplay();
      }
    }
  }

  clearClockDisplay() {
    const digitalClock = document.querySelector('.digital-clock');
    const analogClock = document.querySelector('.analog-clock');
    
    if (this.currentMode !== 'clock') {
      digitalClock.innerHTML = `
        <span>00</span>
        <span class="divider">:</span>
        <span>00</span>
        <span class="divider">:</span>
        <span>00</span>
        ${this.currentMode === 'stopwatch' ? '<span class="milliseconds">.00</span>' : ''}
      `;
      
      // Reset analog clock to zero position
      requestAnimationFrame(() => {
        document.querySelector('.hour').style.transform = 'rotate(0deg)';
        document.querySelector('.minute').style.transform = 'rotate(0deg)';
        document.querySelector('.second').style.transform = 'rotate(0deg)';
      });
    }
  }

  renderControls() {
    const controls = document.querySelector('.controls');
    controls.innerHTML = '';

    if (this.currentMode === 'stopwatch') {
      controls.innerHTML = `
        <button onclick="app.start()">Start</button>
        <button onclick="app.stop()">Stop</button>
        <button onclick="app.reset()">Reset</button>
      `;
    } else if (this.currentMode === 'timer') {
      controls.innerHTML = `
        <div class="timer-inputs">
          <div class="timer-input-group">
            <label>Hours</label>
            <input type="number" class="timer-input" min="0" max="99" placeholder="HH" onchange="app.updateTimer()">
          </div>
          <div class="timer-input-group">
            <label>Minutes</label>
            <input type="number" class="timer-input" min="0" max="59" placeholder="MM" onchange="app.updateTimer()">
          </div>
          <div class="timer-input-group">
            <label>Seconds</label>
            <input type="number" class="timer-input" min="0" max="59" placeholder="SS" onchange="app.updateTimer()">
          </div>
        </div>
        <button onclick="app.start()">Start</button>
        <button onclick="app.stop()">Stop</button>
        <button onclick="app.reset()">Reset</button>
      `;
    }
  }

  updateTimer() {
    const inputs = document.querySelectorAll('.timer-input');
    const [hours, minutes, seconds] = [...inputs].map(input => parseInt(input.value) || 0);
    this.time = (hours * 3600 + minutes * 60 + seconds) * 1000;
    this.updateDisplay();
  }
}

const app = new ClockApp();
