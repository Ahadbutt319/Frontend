<template lang="">
  <q-header  bordered class="bg-grey-1 text-primary">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
          />
  
          <q-toolbar-title>
         
          </q-toolbar-title>
          <div class="">
        <q-toolbar-title>
          <q-avatar size="sm" color="white" class="mr-20">
                  <img src="../assets/search.svg" />
                </q-avatar>
                <q-avatar size="sm" color="white" class="mr-20">
                  <img src="../assets/notification.svg" />
                </q-avatar>
          <q-btn-dropdown color="">
            <template v-slot:label>
              <div class="row q-gutter-sm items-center">
                <q-avatar size="md" color="white">
                  <img src="../assets/female-12.jpg.png" />
                </q-avatar>
                <div  class="column justify-center" :class="[$q.screen.lt.sm ? 'hidden' : '']" >
                </div>
              </div>
            </template>
            <q-list>
            <q-item clickable v-close-popup @click="$emit('logout')">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar-title>
      </div>
        </q-toolbar>
      </q-header>
</template>
<script setup>
import { ref } from "vue";
const drawer = ref(true);
const emit = defineEmits(["drawer-changed", "logout"]);

const toggleLeftDrawer = () => {
  drawer.value = !drawer.value;
  emit("drawer-changed", drawer.value);
};
</script>
<style scoped>
:deep(.q-header) {
  background: #fff !important;
  /* box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10); */
}

button {
  color: black !important;
}
.q-btn::before {

  box-shadow: none !important;
}
</style>
