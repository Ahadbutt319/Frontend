<template>
  <div class="row">
    <div class="col-12">
      <div class="WAL position-relative " :style="style">
        <q-layout view="lHh Lpr lFf" class="WAL__layout " container>
          <q-header elevated>
            <q-toolbar class="bg-grey-3 text-black">
              <q-btn round flat icon="keyboard_arrow_left" class="WAL__drawer-open q-mr-sm" @click="toggleLeftDrawer" />
              <q-btn round flat>
                <q-avatar>
                  <img :src="currentConversation.avatar">
                </q-avatar>
              </q-btn>
              <span class="q-subtitle-1 q-pl-md">
                {{ currentConversation.person }}
              </span>

              <q-space />
              <q-btn round flat icon="more_vert">
                <q-menu auto-close :offset="[110, 0]">
                  <q-list style="min-width: 150px">
                    <q-item clickable>
                      <q-item-section>Contact data</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Block</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Select messages</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Silence</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Clear messages</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Erase messages</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-toolbar>
          </q-header>

          <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="690">
            <q-toolbar class="bg-grey-3">
              <q-btn round flat>
                <q-avatar>
                  <img :src="currentConversation.avatar">
                </q-avatar>
              </q-btn>
              <span class="q-subtitle-1 q-pl-md">
                {{ currentConversation.person }}
              </span>

              <q-space />

              <q-btn round flat>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 7V10M10 10V13M10 10H13M10 10H7M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                    stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </q-btn>
              <q-btn round flat icon="more_vert">
                <q-menu auto-close :offset="[110, 8]">
                  <q-list style="min-width: 150px">
                    <q-item clickable>
                      <q-item-section>New group</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Profile</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Archived</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Favorites</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Settings</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Logout</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>


            </q-toolbar>

            <q-toolbar class="bg-grey-2">
              <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="search"
                placeholder="Search or start a new conversation">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-toolbar>

            <q-scroll-area style="height: calc(100% - 100px)">
              <q-list>
                <q-item v-for="(conversation, index) in chatlist" :key="conversation.id" clickable v-ripple
                  @click="setCurrentConversation(index)">
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="conversation.profile_image">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">
                      {{ conversation.name }}
                    </q-item-label>
                    <q-item-label class="conversation__summary" caption>
                      <q-icon name="check" v-if="conversation.sent" />
                      <q-icon name="not_interested" v-if="conversation.deleted" />
                      {{ conversation.latest_message }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label caption>
                      {{ conversation.time }}
                    </q-item-label>
                    <q-icon name="keyboard_arrow_down" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-drawer>

          <q-page-container class="bg-grey-2">

          </q-page-container>

          <q-footer>
            <q-toolbar class="bg-grey-3 text-black row">
              <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
              <q-btn round flat icon="mic" />
              <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message"
                placeholder="Type a message" />
            </q-toolbar>
          </q-footer>
        </q-layout>
      </div>
    </div>
  </div>
</template>

<script setup >
import { useQuasar } from 'quasar'
import { ref, computed, onMounted } from 'vue'
import Pusher from 'pusher-js';
import { useRouter } from "vue-router";
import { useChatStore } from "../stores/chat";
const chartStore = useChatStore();
const router = useRouter();
const $q = useQuasar();
const leftDrawerOpen = ref(false)
const search = ref('')
const message = ref('')
const currentConversationIndex = ref(0)
const currentConversation = computed(() => {
  return conversations[currentConversationIndex.value]
})

const style = computed(() => ({
  height: $q.screen.height + 'px'
}))
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const setCurrentConversation = (index) => {
  currentConversationIndex.value = index
}
const list = () => {
  chartStore.getchats().then((res) => {
    console.log('chats in chat page ', res);
    chatlist.value = res.data;
  })
    .catch((err) => {
      throw err;
    });
}
const sendMessage = ()=>{
  chartStore.sendMessage({message :'asdasdsad'}).then((res) => {
  })
    .catch((err) => {
      throw err;
    });
}
const chatlist = ref([]);
const conversations = [
  {
    id: 1,
    person: 'Razvan Stoenescu',
    avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
    caption: 'I\'m working on Quasar!',
    time: '15:00',
    sent: true
  },
  {
    id: 2,
    person: 'Dan Popescu',
    avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
    caption: 'I\'m working on Quasar!',
    time: '16:00',
    sent: true
  },
  {
    id: 3,
    person: 'Jeff Galbraith',
    avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
    caption: 'I\'m working on Quasar!',
    time: '18:00',
    sent: true
  },
  {
    id: 4,
    person: 'Allan Gaunt',
    avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
    caption: 'I\'m working on Quasar!',
    time: '17:00',
    sent: true
  }
]
onMounted(() => {
  list();
  sendMessage();
});
</script>
<style scoped >
.WAL {}

.conversation__summary {
  margin-top: 4px;
}


.conversation__more {
  margin-top: 0 !important;
  font-size: 1.4rem;
}
</style>