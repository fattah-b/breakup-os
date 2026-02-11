import './styles.css'
import Chart from 'chart.js/auto'

const state = {
  currentTab: 'tab-update',
  rottenChecklist: 0,
  noContactDays: 0,
  chartData: [90, 3, 3, 4],
  narrativeIndex: 0
}

const pinkMemories = [
  "We were so perfect together, they just got scared...",
  "But they had such good taste in music...",
  "Remember that weekend in the mountains?",
  "They said I was the only one who understood them..."
]

const realityChecks = [
  "Reality: They left you on read for 8 hours regularly.",
  "Reality: You cried on your birthday because of them.",
  "Reality: They refused to label the relationship.",
  "Reality: Your friends actually hated them.",
  "Reality: They made you feel anxious more than safe."
]

const affirmations = [
  "My value doesn't drop just because someone didn't know how to appreciate the investment.",
  "I am the lead character, this was just plot development.",
  "I am protecting my peace like it's a VIP section.",
  "The trash took itself out.",
  "I am attracting, not chasing."
]

let energyChart = null

function switchTab(tabId) {
  document.querySelectorAll('section').forEach(el => {
    el.classList.remove('active')
  })

  const target = document.getElementById(tabId)
  if (target) {
    target.classList.add('active')
  }

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'))

  const indexMap = {
    'tab-update': 0,
    'tab-detox': 1,
    'tab-energy': 2,
    'tab-narrative': 3,
    'tab-prize': 4
  }

  const buttons = document.querySelectorAll('.nav-btn')
  if (buttons[indexMap[tabId]]) {
    buttons[indexMap[tabId]].classList.add('active')
  }

  if (window.innerWidth < 768) {
    const sidebar = document.getElementById('sidebar')
    if (sidebar) {
      sidebar.classList.remove('open')
    }
  }

  if (tabId === 'tab-energy' && energyChart === null) {
    initChart()
  }
}

function updateProgress() {
  const checks = document.querySelectorAll('.rot-check:checked').length
  const total = document.querySelectorAll('.rot-check').length
  const percentage = Math.round((checks / total) * 100)

  const bar = document.getElementById('progress-fill')
  const text = document.getElementById('progress-text')
  const msg = document.getElementById('status-msg')

  if (bar) bar.style.width = percentage + '%'
  if (text) text.textContent = percentage + '%'

  if (msg) {
    if (percentage < 30) {
      if (bar) bar.className = 'progress-fill'
      msg.textContent = "Installing Grief Drivers..."
    } else if (percentage < 70) {
      if (bar) bar.className = 'progress-fill'
      msg.textContent = "Processing Emotions..."
    } else {
      if (bar) bar.className = 'progress-fill'
      msg.textContent = "Update Nearly Complete. Ready for Reboot."
    }
  }
}

function adjustDays(amount) {
  state.noContactDays += amount
  if (state.noContactDays < 0) state.noContactDays = 0

  const display = document.getElementById('streak-days')
  if (display) {
    display.textContent = state.noContactDays
    display.classList.remove('scale')
    void display.offsetWidth
    display.classList.add('scale')
    setTimeout(() => display.classList.remove('scale'), 200)
  }

  const msgs = [
    "Even 1 hour counts.",
    "Okay, we're building momentum.",
    "Look at you, protecting your peace!",
    "They are literally fading from memory.",
    "Main Character Status Unlocked."
  ]
  const msgIndex = Math.min(Math.floor(state.noContactDays / 3), msgs.length - 1)
  const streakMsg = document.getElementById('streak-msg')
  if (streakMsg) {
    streakMsg.textContent = msgs[msgIndex]
  }
}

function resetStreak() {
  if (confirm("Did you actually text them? It's okay, healing isn't linear. Resetting...")) {
    state.noContactDays = 0
    const display = document.getElementById('streak-days')
    if (display) display.textContent = "0"
    const streakMsg = document.getElementById('streak-msg')
    if (streakMsg) streakMsg.textContent = "Restarting the timer. You got this."
  }
}

function toggleBlock(btn) {
  if (btn.textContent === "Following" || btn.textContent === "Saved") {
    btn.textContent = "Blocked 🚫"
    btn.className = "permission-btn blocked"
  } else {
    btn.textContent = "Following"
    btn.className = "permission-btn active"
  }
}

function initChart() {
  const canvas = document.getElementById('energyChart')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  energyChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Obsessing over Ex', 'Gym/Health', 'Hobbies', 'Friends'],
      datasets: [{
        data: state.chartData,
        backgroundColor: [
          '#e7e5e4',
          '#10b981',
          '#a855f7',
          '#f59e0b'
        ],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: 'Inter', size: 12 }
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ': ' + context.raw + '% Energy'
            }
          }
        }
      },
      cutout: '60%'
    }
  })
}

function reallocateEnergy(type) {
  if (state.chartData[0] > 10) {
    state.chartData[0] -= 10

    if (type === 'gym' || type === 'skin') state.chartData[1] += 10
    if (type === 'hobby') state.chartData[2] += 10
    if (type === 'friends') state.chartData[3] += 10

    if (energyChart) {
      energyChart.update()
    }
  } else {
    alert("You are officially over them! Maximum energy redirected.")
  }
}

function resetChart() {
  state.chartData = [90, 3, 3, 4]
  if (energyChart) {
    energyChart.data.datasets[0].data = state.chartData
    energyChart.update()
  }
}

function revealTruth() {
  const container = document.getElementById('reality-content')
  if (!container) return

  const truth = realityChecks[Math.floor(Math.random() * realityChecks.length)]

  container.innerHTML = `
    <div class="reality-error">
      <p>⚠️ ERROR FOUND</p>
      <p>${truth}</p>
      <button onclick="revealTruth()" class="text-stone-400 hover:text-white underline">Run another diagnostic</button>
    </div>
  `

  state.narrativeIndex = (state.narrativeIndex + 1) % pinkMemories.length
  const pinkText = document.getElementById('pink-text')
  if (pinkText) {
    pinkText.textContent = `"${pinkMemories[state.narrativeIndex]}"`
  }
}

function newAffirmation() {
  const el = document.getElementById('affirmation-text')
  if (!el) return

  el.style.opacity = '0'
  setTimeout(() => {
    const rand = affirmations[Math.floor(Math.random() * affirmations.length)]
    el.textContent = `"${rand}"`
    el.style.opacity = '1'
  }, 300)
}

function updateMoodStatus(val) {
  const status = document.getElementById('system-status-text')
  if (!status) return

  if (val < 25) {
    status.textContent = "Critical Failure"
    status.className = "font-medium text-stone-400"
  } else if (val < 50) {
    status.textContent = "Safe Mode"
    status.className = "font-medium text-amber-500"
  } else if (val < 80) {
    status.textContent = "Rebooting..."
    status.className = "font-medium text-blue-500"
  } else {
    status.textContent = "Operational"
    status.className = "font-medium text-emerald-500"
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn')
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar')
      if (sidebar) {
        sidebar.classList.toggle('open')
      }
    })
  }

  const moodSlider = document.getElementById('mood-slider')
  if (moodSlider) {
    moodSlider.addEventListener('input', (e) => {
      updateMoodStatus(e.target.value)
    })
  }

  switchTab('tab-update')
})

window.switchTab = switchTab
window.updateProgress = updateProgress
window.adjustDays = adjustDays
window.resetStreak = resetStreak
window.toggleBlock = toggleBlock
window.reallocateEnergy = reallocateEnergy
window.resetChart = resetChart
window.revealTruth = revealTruth
window.newAffirmation = newAffirmation
