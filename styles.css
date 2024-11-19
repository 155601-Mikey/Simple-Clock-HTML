:root {
  --primary: #2196f3;
  --primary-rgb: 33, 150, 243;
  --bg: #ffffff;
  --text: #333333;
  --surface: #f5f5f5;
  --surface-rgb: 245, 245, 245;
  --surface-2: #e0e0e0;
}

[data-theme="dark"] {
  --primary: #90caf9;
  --primary-rgb: 144, 202, 249;
  --bg: #121212;
  --text: #ffffff;
  --surface: #1e1e1e;
  --surface-rgb: 30, 30, 30;
  --surface-2: #2d2d2d;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: background-color 0.3s, color 0.3s;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 800px;
  padding: 2rem;
}

.nav {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(var(--surface-rgb), 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 12px;
}

.nav button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav button.active {
  background: var(--primary);
  color: white;
}

.nav button:hover {
  background: rgba(var(--primary-rgb), 0.1);
}

.nav button svg {
  width: 20px;
  height: 20px;
}

.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(var(--surface-rgb), 0.8);
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.theme-toggle:hover {
  transform: rotate(30deg);
}

.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: rgba(var(--surface-rgb), 0.8);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.clock-container.switching {
  transform: scale(0.95);
  opacity: 0;
}

.digital-clock {
  background: var(--surface);
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 4rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.scroll-digit {
  display: inline-flex;
  position: relative;
  width: 0.6em;
  height: 1.2em;
  overflow: hidden;
  background: var(--surface);
  border-radius: 8px;
  margin: 0 0.1em;
}

.scroll-column {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-column div {
  height: 1.2em;
  line-height: 1.2em;
  width: 100%;
}

.divider {
  font-size: 4rem;
  opacity: 0.7;
  margin: 0 0.2em;
  display: inline-block;
  vertical-align: top;
}

.analog-clock {
  width: 300px;
  height: 300px;
  border: 10px solid var(--primary);
  border-radius: 50%;
  position: relative;
  background: var(--surface);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: none;
}

.analog-clock:hover {
  transform: scale(1.05);
}

.hand {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: bottom;
  background: var(--text);
  border-radius: 4px;
  transition: transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44);
}

.hour {
  width: 4px;
  height: 25%;
}

.minute {
  width: 3px;
  height: 35%;
}

.second {
  width: 2px;
  height: 40%;
  background: var(--primary);
  transition: transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44);
}

.number {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-origin: center;
  font-weight: 500;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.controls button {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controls button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.timer-inputs {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.timer-input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timer-input-group label {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 0.2rem;
}

.timer-input {
  background: var(--surface);
  color: var(--text);
  border: 2px solid var(--primary);
  padding: 0.5rem;
  border-radius: 6px;
  width: 4rem;
  text-align: center;
}

.stopwatch-display,
.timer-display {
  font-size: 4rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.milliseconds {
  font-size: 0.5em;
  opacity: 0.7;
}
