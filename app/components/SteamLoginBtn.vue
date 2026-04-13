<template>
  <button
    v-if="!user.authenticated"
    @click="login"
    class="font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-all glow-effect tracking-wide"
    style="background-color: var(--color-accent-primary); color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;"
  >
    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10c.9 0 1.8-.1 2.6-.4-.2-.2-.4-.5-.6-.8-.5.1-1 .2-1.5.2a8.5 8.5 0 0 1-8.5-8.5A8.5 8.5 0 0 1 12 3.5c4.7 0 8.5 3.8 8.5 8.5 0 .5-.1 1-.2 1.5.3.2.6.4.8.6.3-.8.4-1.7.4-2.6A10 10 0 0 0 12 2m0 3a7 7 0 0 0-7 7 7 7 0 0 0 7 7c.5 0 1-.1 1.5-.2-.1-.3-.2-.6-.2-.9 0-.4.1-.8.2-1.1-.5.1-1 .2-1.5.2a5.5 5.5 0 0 1-5.5-5.5A5.5 5.5 0 0 1 12 6.5a5.5 5.5 0 0 1 5.5 5.5c0 .5-.1 1-.2 1.5.3.1.7.2 1.1.2.3 0 .6-.1.9-.2.1-.5.2-1 .2-1.5A7 7 0 0 0 12 5m0 2a5 5 0 0 0-5 5 5 5 0 0 0 5 5c.3 0 .7 0 1-.1-.1-.3-.1-.6-.1-.9 0-.9.3-1.7.8-2.4-.5.3-1.1.4-1.7.4a3.5 3.5 0 0 1-3.5-3.5A3.5 3.5 0 0 1 12 7.5a3.5 3.5 0 0 1 3.5 3.5c0 .6-.1 1.2-.4 1.7.7-.5 1.5-.8 2.4-.8.3 0 .6 0 .9.1 0-.3.1-.7.1-1A5 5 0 0 0 12 7z"/>
    </svg>
    Войти через Steam
  </button>
  <div v-else class="flex items-center gap-4">
    <div v-if="profile" class="flex items-center gap-3 px-4 py-2 rounded-lg" style="background-color: var(--color-tactical-surface); border: 1px solid var(--color-tactical-border);">
      <img :src="profile.avatar" :alt="profile.personaname" class="w-10 h-10 rounded-full" style="border: 2px solid var(--color-accent-primary);" />
      <div class="text-sm">
        <div class="font-medium tracking-wide" style="color: #ffffff;">{{ profile.personaname }}</div>
        <div class="text-xs font-mono" style="color: var(--color-tactical-muted);">{{ user.steamid }}</div>
      </div>
    </div>
    <div v-else class="text-sm px-4 py-2 rounded-lg" style="background-color: var(--color-tactical-surface); border: 1px solid var(--color-tactical-border);">
      <div class="font-medium tracking-wide" style="color: #ffffff;">SteamID</div>
      <div class="font-mono" style="color: var(--color-tactical-muted);">{{ user.steamid }}</div>
    </div>
    <button
      @click="logout"
      class="px-4 py-2 rounded-lg transition-all font-medium tracking-wide"
      style="background-color: var(--color-error); color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;"
    >
      Выйти
    </button>
  </div>
</template>

<script setup lang="ts">
const { user, profile, login, logout } = useSteamAuth()
</script>
