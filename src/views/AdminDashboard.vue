<template>
  <div class="admin-page">
    <div class="admin-top">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Control all portfolio content from here.</p>
      </div>

      <div class="admin-actions">
        <RouterLink to="/" class="preview-btn">View Portfolio</RouterLink>
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>

    <form class="admin-form" @submit.prevent="updatePortfolio">
      <h2>Profile Information</h2>

      <label>Name</label>
      <input v-model="portfolio.name" />

      <label>Title</label>
      <input v-model="portfolio.title" />

      <label>Email</label>
      <input v-model="portfolio.email" />

      <label>Phone</label>
      <input v-model="portfolio.phone" />

      <label>WhatsApp</label>
      <input v-model="portfolio.whatsapp" />

      <label>Nationality</label>
      <input v-model="portfolio.nationality" />

      <label>Location</label>
      <input v-model="portfolio.location" />

      <label>Marital Status</label>
      <input v-model="portfolio.marital_status" />

      <label>Short Summary</label>
      <textarea v-model="portfolio.short_summary"></textarea>

      <label>About</label>
      <textarea v-model="portfolio.about"></textarea>

      <label>Profile Picture</label>
      <input type="file" accept="image/*" @change="handleImage" />

      <label>CV File</label>
      <input type="file" accept=".pdf,.doc,.docx" @change="handleCv" />

      <button class="save-btn" type="submit">Save Profile</button>
    </form>

    <section class="admin-form">
      <h2>Short Summaries</h2>

      <div class="mini-form">
        <input v-model="newSummary.title" placeholder="Summary title" />
        <textarea v-model="newSummary.description" placeholder="Description"></textarea>
        <button type="button" @click="addSummary">Add Summary</button>
      </div>

      <div class="admin-card" v-for="item in summaries" :key="item.id">
        <input v-model="item.title" />
        <textarea v-model="item.description"></textarea>

        <button type="button" @click="updateSummary(item)">Update</button>
        <button type="button" class="danger" @click="deleteSummary(item.id)">Delete</button>
      </div>
    </section>

    <section class="admin-form">
      <h2>Skills</h2>

      <div class="mini-form">
        <input v-model="newSkill.name" placeholder="Skill name" />

        <select v-model="newSkill.icon">
          <option value="">Main icon</option>
          <option v-for="item in iconOptions" :key="item.icon" :value="item.icon">
            {{ item.name }}
          </option>
        </select>

        <textarea v-model="newSkill.description" placeholder="Skill description"></textarea>

        <h4>Add Skill Tags</h4>

        <div class="tag-admin-row">
          <input v-model="newSkillTag.name" placeholder="Tag name" />

          <select v-model="newSkillTag.icon">
            <option value="">Tag icon</option>
            <option v-for="item in iconOptions" :key="item.icon" :value="item.icon">
              {{ item.name }}
            </option>
          </select>

          <button type="button" @click="addSkillTag">Add Tag</button>
        </div>

        <div class="admin-tags">
          <span v-for="(tag, index) in newSkill.tags" :key="index" class="admin-tag-pill">
            <i :class="tag.icon"></i>
            {{ tag.name }}
            <button type="button" @click="removeNewSkillTag(index)">×</button>
          </span>
        </div>

        <button type="button" @click="addSkill">Add Skill</button>
      </div>

      <div class="admin-card-preview" v-for="skill in skills" :key="skill.id">
        <div class="preview-content">
          <i v-if="skill.icon" :class="skill.icon" class="preview-main-icon"></i>

          <h3>{{ skill.name }}</h3>
          <p>{{ skill.description }}</p>

          <div class="admin-tags">
            <span v-for="(tag, index) in skill.tags" :key="index" class="admin-tag-pill">
              <i :class="tag.icon"></i>
              {{ tag.name }}
              <button type="button" @click="removeExistingSkillTag(skill, index)">×</button>
            </span>
          </div>
        </div>

        <div class="edit-content">
          <input v-model="skill.name" />

          <select v-model="skill.icon">
            <option value="">Main icon</option>
            <option v-for="item in iconOptions" :key="item.icon" :value="item.icon">
              {{ item.name }}
            </option>
          </select>

          <textarea v-model="skill.description"></textarea>

          <div class="tag-admin-row">
            <input v-model="skill.tempTagName" placeholder="New tag name" />

            <select v-model="skill.tempTagIcon">
              <option value="">Tag icon</option>
              <option v-for="item in iconOptions" :key="item.icon" :value="item.icon">
                {{ item.name }}
              </option>
            </select>

            <button type="button" @click="addExistingSkillTag(skill)">Add Tag</button>
          </div>

          <button type="button" @click="updateSkill(skill)">Update</button>
          <button type="button" class="danger" @click="deleteSkill(skill.id)">Delete</button>
        </div>
      </div>
    </section>

    <section class="admin-form">
      <h2>Qualifications</h2>

      <div class="mini-form">
        <input v-model="newQualification.title" placeholder="Title" />
        <input v-model="newQualification.institution" placeholder="Institution" />
        <input v-model="newQualification.year" placeholder="Year" />
        <textarea v-model="newQualification.description" placeholder="Description"></textarea>
        <button type="button" @click="addQualification">Add Qualification</button>
      </div>

      <div class="admin-card" v-for="q in qualifications" :key="q.id">
        <input v-model="q.title" />
        <input v-model="q.institution" />
        <input v-model="q.year" />
        <textarea v-model="q.description"></textarea>

        <button type="button" @click="updateQualification(q)">Update</button>
        <button type="button" class="danger" @click="deleteQualification(q.id)">Delete</button>
      </div>
    </section>

    <section class="admin-form">
      <h2>Projects</h2>

      <div class="mini-form">
        <input v-model="newProject.title" placeholder="Project title" />

        <select v-model="newProject.icon">
          <option value="">Main project icon</option>
          <option v-for="item in iconOptions" :key="item.icon" :value="item.icon">
            {{ item.name }}
          </option>
        </select>

        <textarea v-model="newProject.description" placeholder="Project description"></textarea>

        <h4>Add Project Tags</h4>

        <div class="tag-admin-row">
          <input v-model="newProjectTag.name" placeholder="Tag name" />

          <select v-model="newProjectTag.icon">
            <option value="">Tag icon</option>
            <option v-for="item in iconOptions" :key="item.icon" :value="item.icon">
              {{ item.name }}
            </option>
          </select>

          <button type="button" @click="addProjectTag">Add Tag</button>
        </div>

        <div class="admin-tags">
          <span v-for="(tag, index) in newProject.tags" :key="index" class="admin-tag-pill">
            <i :class="tag.icon"></i>
            {{ tag.name }}
            <button type="button" @click="removeNewProjectTag(index)">×</button>
          </span>
        </div>

        <button type="button" @click="addProject">Add Project</button>
      </div>

      <div class="admin-card-preview" v-for="project in projects" :key="project.id">
        <div class="preview-content">
          <i v-if="project.icon" :class="project.icon" class="preview-main-icon"></i>

          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>

          <div class="admin-tags">
            <span v-for="(tag, index) in project.tags" :key="index" class="admin-tag-pill">
              <i :class="tag.icon"></i>
              {{ tag.name }}
              <button type="button" @click="removeExistingProjectTag(project, index)">×</button>
            </span>
          </div>
        </div>

        <div class="edit-content">
          <input v-model="project.title" />

          <select v-model="project.icon">
            <option value="">Main project icon</option>
            <option v-for="item in iconOptions" :key="item.icon" :value="item.icon">
              {{ item.name }}
            </option>
          </select>

          <textarea v-model="project.description"></textarea>

          <div class="tag-admin-row">
            <input v-model="project.tempTagName" placeholder="New tag name" />

            <select v-model="project.tempTagIcon">
              <option value="">Tag icon</option>
              <option v-for="item in iconOptions" :key="item.icon" :value="item.icon">
                {{ item.name }}
              </option>
            </select>

            <button type="button" @click="addExistingProjectTag(project)">Add Tag</button>
          </div>

          <button type="button" @click="updateProject(project)">Update</button>
          <button type="button" class="danger" @click="deleteProject(project.id)">Delete</button>
        </div>
      </div>
    </section>

    <section class="admin-form">
      <h2>Contact Inbox</h2>

      <div class="gmail-layout">
        <div class="gmail-list">
          <div
            class="gmail-item"
            v-for="msg in messages"
            :key="msg.id"
            :class="{ active: selectedMessage && selectedMessage.id === msg.id }"
            @click="selectMessage(msg)"
          >
            <div class="gmail-avatar">
              {{ getInitial(msg.name) }}
            </div>

            <div class="gmail-preview">
              <h4>{{ msg.name }}</h4>
              <p class="gmail-subject">{{ msg.subject }}</p>
              <p class="gmail-snippet">{{ msg.message }}</p>
            </div>
          </div>

          <p v-if="messages.length === 0" class="empty-inbox">
            No messages yet.
          </p>
        </div>

        <div class="gmail-details" v-if="selectedMessage">
          <div class="gmail-details-header">
            <div>
              <h3>{{ selectedMessage.subject }}</h3>
              <p>
                From:
                <strong>{{ selectedMessage.name }}</strong>
                &lt;{{ selectedMessage.email }}&gt;
              </p>
            </div>

            <button type="button" class="danger" @click="deleteMessage(selectedMessage.id)">
              <i class="fas fa-trash"></i>
              Delete
            </button>
          </div>

          <div class="gmail-body">
            <p>{{ selectedMessage.message }}</p>
          </div>

          <div class="reply-box">
            <h4>Write Reply</h4>

            <textarea
              v-model="replyMessage"
              placeholder="Write your email reply here..."
            ></textarea>

            <button
              type="button"
              class="reply-btn"
              :disabled="replyLoading"
              @click="sendReply"
            >
              <i class="fas fa-paper-plane"></i>
              {{ replyLoading ? 'Sending...' : 'Send Reply' }}
            </button>
          </div>
        </div>

        <div class="gmail-details empty-message" v-else>
          <i class="fas fa-envelope-open-text"></i>
          <p>Select a message to read it.</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const portfolio = ref({})
const summaries = ref([])
const skills = ref([])
const qualifications = ref([])
const projects = ref([])
const messages = ref([])

const profileImage = ref(null)
const cvFile = ref(null)

const selectedMessage = ref(null)
const replyMessage = ref('')
const replyLoading = ref(false)

const newSummary = ref({
  title: '',
  description: '',
})

const newQualification = ref({
  title: '',
  institution: '',
  year: '',
  description: '',
})

const iconOptions = [
  { name: 'R Programming', icon: 'fab fa-r-project' },
  { name: 'Excel', icon: 'fas fa-file-excel' },
  { name: 'PHP', icon: 'fab fa-php' },
  { name: 'Laravel', icon: 'fab fa-laravel' },
  { name: 'Vue.js', icon: 'fab fa-vuejs' },
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'HTML5', icon: 'fab fa-html5' },
  { name: 'CSS3', icon: 'fab fa-css3-alt' },
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'Java', icon: 'fab fa-java' },
  { name: 'Database', icon: 'fas fa-database' },
  { name: 'Data Analysis', icon: 'fas fa-chart-line' },
  { name: 'Frontend', icon: 'fas fa-laptop-code' },
  { name: 'Backend', icon: 'fas fa-server' },
  { name: 'Research', icon: 'fas fa-book' },
]

const newSkill = ref({
  name: '',
  icon: '',
  description: '',
  tags: [],
})

const newProject = ref({
  title: '',
  icon: '',
  description: '',
  tags: [],
})

const newSkillTag = ref({
  name: '',
  icon: '',
})

const newProjectTag = ref({
  name: '',
  icon: '',
})

function selectMessage(msg) {
  selectedMessage.value = msg
  replyMessage.value = `Hello ${msg.name},\n\nThank you for contacting me.\n\n`
}

function getInitial(name) {
  if (!name) return '?'
  return name.charAt(0).toUpperCase()
}

function addSkillTag() {
  if (!newSkillTag.value.name || !newSkillTag.value.icon) {
    alert('Select tag name and icon')
    return
  }

  newSkill.value.tags.push({
    name: newSkillTag.value.name,
    icon: newSkillTag.value.icon,
  })

  newSkillTag.value = {
    name: '',
    icon: '',
  }
}

function removeNewSkillTag(index) {
  newSkill.value.tags.splice(index, 1)
}

function addProjectTag() {
  if (!newProjectTag.value.name || !newProjectTag.value.icon) {
    alert('Select tag name and icon')
    return
  }

  newProject.value.tags.push({
    name: newProjectTag.value.name,
    icon: newProjectTag.value.icon,
  })

  newProjectTag.value = {
    name: '',
    icon: '',
  }
}

function removeNewProjectTag(index) {
  newProject.value.tags.splice(index, 1)
}

function addExistingSkillTag(skill) {
  if (!skill.tempTagName || !skill.tempTagIcon) {
    alert('Select tag name and icon')
    return
  }

  if (!skill.tags) {
    skill.tags = []
  }

  skill.tags.push({
    name: skill.tempTagName,
    icon: skill.tempTagIcon,
  })

  skill.tempTagName = ''
  skill.tempTagIcon = ''
}

function removeExistingSkillTag(skill, index) {
  skill.tags.splice(index, 1)
}

function addExistingProjectTag(project) {
  if (!project.tempTagName || !project.tempTagIcon) {
    alert('Select tag name and icon')
    return
  }

  if (!project.tags) {
    project.tags = []
  }

  project.tags.push({
    name: project.tempTagName,
    icon: project.tempTagIcon,
  })

  project.tempTagName = ''
  project.tempTagIcon = ''
}

function removeExistingProjectTag(project, index) {
  project.tags.splice(index, 1)
}

async function loadData() {
  const res = await api.get('/portfolio')

  portfolio.value = res.data.portfolio
  summaries.value = res.data.summaries
  skills.value = res.data.skills
  qualifications.value = res.data.qualifications
  projects.value = res.data.projects

  const msgRes = await api.get('/contact-messages')
  messages.value = msgRes.data
}

function handleImage(e) {
  profileImage.value = e.target.files[0]
}

function handleCv(e) {
  cvFile.value = e.target.files[0]
}

async function updatePortfolio() {
  const formData = new FormData()

  formData.append('name', portfolio.value.name || '')
  formData.append('title', portfolio.value.title || '')
  formData.append('email', portfolio.value.email || '')
  formData.append('phone', portfolio.value.phone || '')
  formData.append('whatsapp', portfolio.value.whatsapp || '')
  formData.append('nationality', portfolio.value.nationality || '')
  formData.append('location', portfolio.value.location || '')
  formData.append('marital_status', portfolio.value.marital_status || '')
  formData.append('short_summary', portfolio.value.short_summary || '')
  formData.append('about', portfolio.value.about || '')

  if (profileImage.value) {
    formData.append('profile_image', profileImage.value)
  }

  if (cvFile.value) {
    formData.append('cv_file', cvFile.value)
  }

  await api.post('/portfolio/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  alert('Profile updated successfully')
  profileImage.value = null
  cvFile.value = null

  loadData()
}

async function addSummary() {
  await api.post('/summaries', newSummary.value)

  newSummary.value = {
    title: '',
    description: '',
  }

  loadData()
}

async function updateSummary(item) {
  await api.put(`/summaries/${item.id}`, item)
  alert('Summary updated')
}

async function deleteSummary(id) {
  await api.delete(`/summaries/${id}`)
  loadData()
}

async function addSkill() {
  if (!newSkill.value.name) {
    alert('Please enter skill name')
    return
  }

  await api.post('/skills', newSkill.value)

  newSkill.value = {
    name: '',
    icon: '',
    description: '',
    tags: [],
  }

  loadData()
}

async function updateSkill(skill) {
  await api.put(`/skills/${skill.id}`, skill)
  alert('Skill updated')
}

async function deleteSkill(id) {
  await api.delete(`/skills/${id}`)
  loadData()
}

async function addQualification() {
  await api.post('/qualifications', newQualification.value)

  newQualification.value = {
    title: '',
    institution: '',
    year: '',
    description: '',
  }

  loadData()
}

async function updateQualification(q) {
  await api.put(`/qualifications/${q.id}`, q)
  alert('Qualification updated')
}

async function deleteQualification(id) {
  await api.delete(`/qualifications/${id}`)
  loadData()
}

async function addProject() {
  await api.post('/projects', newProject.value)

  newProject.value = {
    title: '',
    icon: '',
    description: '',
    tags: [],
  }

  loadData()
}

async function updateProject(project) {
  await api.put(`/projects/${project.id}`, project)
  alert('Project updated')
}

async function deleteProject(id) {
  await api.delete(`/projects/${id}`)
  loadData()
}

async function sendReply() {
  if (!selectedMessage.value) {
    alert('Select a message first')
    return
  }

  if (!replyMessage.value.trim()) {
    alert('Write your reply first')
    return
  }

  replyLoading.value = true

  try {
    await api.post(`/contact-messages/${selectedMessage.value.id}/reply`, {
      reply_message: replyMessage.value,
    })

    alert('Reply sent successfully')
    replyMessage.value = ''
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to send reply')
  } finally {
    replyLoading.value = false
  }
}

async function deleteMessage(id) {
  await api.delete(`/contact-messages/${id}`)

  if (selectedMessage.value && selectedMessage.value.id === id) {
    selectedMessage.value = null
    replyMessage.value = ''
  }

  loadData()
}

async function logout() {
  try {
    await api.post('/admin/logout')
  } catch (error) {
    console.log(error)
  }

  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminLoggedIn')
  router.push('/admin-login')
}

onMounted(loadData)
</script>