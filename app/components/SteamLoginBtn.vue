<template>
  <button
    v-if="!user.authenticated"
    @click="login"
    class="btn-premium"
  >
    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c.9 0 1.8-.1 2.6-.4-.2-.2-.4-.5-.6-.8-.5.1-1 .2-1.5.2a8.5 8.5 0 0 1-8.5-8.5A8.5 8.5 0 0 1 12 3.5c4.7 0 8.5 3.8 8.5 8.5 0 .5-.1 1-.2 1.5.3.2.6.4.8.6.3-.8.4-1.7.4-2.6A10 10 0 0 0 12 2m0 3a7 7 0 0 0-7 7 7 7 0 0 0 7 7c.5 0 1-.1 1.5-.2-.1-.3-.2-.6-.2-.9 0-.4.1-.8.2-1.1-.5.1-1 .2-1.5.2a5.5 5.5 0 0 1-5.5-5.5A5.5 5.5 0 0 1 12 6.5a5.5 5.5 0 0 1 5.5 5.5c0 .5-.1 1-.2 1.5.3.1.7.2 1.1.2.3 0 .6-.1.9-.2.1-.5.2-1 .2-1.5A7 7 0 0 0 12 5m0 2a5 5 0 0 0-5 5 5 5 0 0 0 5 5c.3 0 .7 0 1-.1-.1-.3-.1-.6-.1-.9 0-.9.3-1.7.8-2.4-.5.3-1.1.4-1.7.4a3.5 3.5 0 0 1-3.5-3.5A3.5 3.5 0 0 1 12 7.5a3.5 3.5 0 0 1 3.5 3.5c0 .6-.1 1.2-.4 1.7.7-.5 1.5-.8 2.4-.8.3 0 .6 0 .9.1 0-.3.1-.7.1-1A5 5 0 0 0 12 7z"/>
    </svg>
    <span>Войти через Steam</span>
  </button>
  <div v-else class="user-box">
    <div v-if="profile" class="user-box__profile">
      <div class="user-box__avatar-wrap">
        <img :src="profile.avatar" :alt="profile.personaname" class="user-box__avatar" />
      </div>
      <div class="user-box__text">
        <div class="user-box__name">{{ profile.personaname }}</div>
        <div class="user-box__id">{{ user.steamid }}</div>
      </div>
    </div>
    <div v-else class="user-box__profile">
      <div class="user-box__text">
        <div class="user-box__name">SteamID</div>
        <div class="user-box__id">{{ user.steamid }}</div>
      </div>
    </div>
    <button @click="logout" class="logout-btn" title="Выйти">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <path d="M16 17l5-5-5-5M21 12H9" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const { user, profile, login, logout } = useSteamAuth()
</script>

<style scoped>
.user-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem 0.4rem 0.9rem;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(14px) saturate(150%);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
}

.user-box::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.4), rgba(99, 102, 241, 0.15), transparent);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}

.user-box__profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-box__avatar-wrap {
  position: relative;
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
}

.user-box__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: block;
  border: 2px solid #0F172A;
}

.user-box__text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.user-box__name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.01em;
}

.user-box__id {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.logout-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  cursor: pointer;
  transition: all 0.25s ease;
}

.logout-btn svg {
  width: 16px;
  height: 16px;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #fff;
  transform: translateY(-1px);
}

@media (max-width: 540px) {
  .user-box__text { display: none; }
}
</style>
