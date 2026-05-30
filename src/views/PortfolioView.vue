<template>
  <div>
    <nav class="navbar">
      <div class="left-side">
        <div class="home-wrapper">
          <a href="#home" @click.prevent="toggleAdmin">Home</a>

          <div class="hidden-admin" v-if="showAdmin">
            <RouterLink to="/admin-login">
              <i class="fas fa-user-shield"></i>
              Admin
            </RouterLink>
          </div>
        </div>

        <h2 class="logo-name">{{ portfolio.name }}</h2>
      </div>

      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#qualifications">Qualifications</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>

      <button class="dark-toggle" @click="toggleDarkMode">
        <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
      </button>
    </nav>

    <section id="home" class="hero-new">
      <div class="profile-card">
        <img
            v-if="profileImageUrl"
            :src="profileImageUrl"
            class="profile-img"
        />

        <div v-else class="profile-empty">
            <i class="fas fa-user"></i>
        </div>

        <p><strong>Nationality:</strong> {{ portfolio.nationality }}</p>
        <p><strong>Location:</strong> {{ portfolio.location }}</p>
        <p><strong>Marital Status:</strong> {{ portfolio.marital_status }}</p>
      </div>

      <div class="hero-text">
        <p class="tag">Hello, I am</p>
        <h1>{{ portfolio.name }}</h1>
        <h3>{{ portfolio.title }}</h3>
        <p>{{ portfolio.short_summary }}</p>

        <div class="buttons">
          <a href="#contact" class="btn">Contact Me</a>

          <a
                v-if="cvFileUrl"
                :href="cvFileUrl"
                target="_blank"
                class="btn-outline"
            >
            <i class="fas fa-eye"></i>
                View CV
            </a>

            <a
                v-if="cvFileUrl"
                :href="cvFileUrl"
                :download="portfolio.cv_file_name || 'CV.pdf'"
                class="btn-outline"
            >
            <i class="fas fa-download"></i>
                Download CV
            </a>
        </div>
      </div>
    </section>

    <section id="about" class="section">
        <h2><i class="fas fa-user"></i> About Me</h2>

        <div class="about-container">
            <p>{{ portfolio.about }}</p>
        </div>
    </section>

    

    <section id="skills" class="section">
        <h2><i class="fas fa-lightbulb"></i> Skills</h2>

        <div class="grid">
            <div class="dark-card" v-for="skill in skills" :key="skill.id">
            <i v-if="skill.icon" :class="skill.icon" class="main-card-icon"></i>

            <h3>{{ skill.name }}</h3>
            <p>{{ skill.description }}</p>

            <div class="tag-list">
                <span v-for="tag in skill.tags" :key="tag.name" class="tag-pill">
                <i :class="tag.icon"></i>
                {{ tag.name }}
                </span>
            </div>
            </div>
        </div>
    </section>

    <section id="qualifications" class="section soft">
        <h2><i class="fas fa-graduation-cap"></i> Qualifications</h2>

        <div class="grid">
            <div class="dark-card" v-for="q in qualifications" :key="q.id">
            <i class="fas fa-graduation-cap main-card-icon"></i>

            <h3>{{ q.title }}</h3>
            <p><strong>Institution:</strong> {{ q.institution }}</p>
            <p><strong>Year:</strong> {{ q.year }}</p>
            <p>{{ q.description }}</p>
            </div>
        </div>
    </section>

    <section id="projects" class="section">
        <h2><i class="fas fa-code"></i> Projects</h2>

        <div class="grid">
            <div class="dark-card" v-for="project in projects" :key="project.id">
            <i v-if="project.icon" :class="project.icon" class="main-card-icon"></i>

            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>

            <div class="tag-list">
                <span v-for="tag in project.tags" :key="tag.name" class="tag-pill">
                <i :class="tag.icon"></i>
                {{ tag.name }}
                </span>
            </div>

            <a v-if="project.link" :href="project.link" target="_blank" class="project-link">
                View Project
            </a>
            </div>
        </div>
    </section>

    <section id="contact" class="section contact">
      <div>
        <h2>Contact</h2>
        <p><i class="fas fa-envelope"></i> {{ portfolio.email }}</p>
        <p><i class="fab fa-whatsapp"></i> {{ portfolio.whatsapp }}</p>
        <p><i class="fas fa-phone"></i> {{ portfolio.phone }}</p>
      </div>

      <form @submit.prevent="sendMessage">
        <input v-model="message.name" placeholder="Your Name" required />
        <input v-model="message.email" placeholder="Your Email" required />
        <input v-model="message.subject" placeholder="Subject" required />
        <textarea v-model="message.message" placeholder="Message" required></textarea>
        <button>Send Message</button>
      </form>
    </section>

    <footer class="footer">
      <p>© 2026 {{ portfolio.name }}. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const portfolio = ref({})
const summaries = ref([])
const skills = ref([])
const qualifications = ref([])
const projects = ref([])
const profileImageUrl = ref('')
const cvFileUrl = ref('')
const showAdmin = ref(false)
const darkMode = ref(false)

const message = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

async function loadPortfolio() {
  const res = await api.get('/portfolio')

  portfolio.value = res.data.portfolio
  profileImageUrl.value = res.data.profile_image_url
  cvFileUrl.value = res.data.cv_file_url
  summaries.value = res.data.summaries
  skills.value = res.data.skills
  qualifications.value = res.data.qualifications
  projects.value = res.data.projects
}

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('dark-mode')
}

function toggleAdmin() {
  showAdmin.value = !showAdmin.value
}

async function sendMessage() {
  await api.post('/contact-messages', message.value)

  alert('Message sent successfully')

  message.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
}

onMounted(loadPortfolio)
</script>