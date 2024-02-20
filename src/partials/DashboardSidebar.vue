<template lang="">
  <q-drawer :value="modalValue" @update:modelValue="$emit('update:modelValue', $event)" :behavior="$q.screen.lt.md ? 'mobile' : 'desktop'" side="left" bordered>
      <!-- drawer content -->
      <div class="mb-15" v-for="(nav, index) in navs" :key="index">
        <q-avatar  size="100px" class="pl-15" >
              <template #default>
                <q-img src="../assets/logo-white.png" class="weight: "></q-img>
              </template>
            </q-avatar>
        <q-list class="text-dark" v-for="(tab, tab_index) in nav.tabs" :key="tab_index">

        
        <q-expansion-item
        class="rounded-borders"
        :icon="tab.icon"
        :label="tab.title"
         v-if="tab.children && tab.children.length > 0"
      >
      
          <q-item clickable class="rounded-borders" v-ripple active-class="my-menu-link" :to="{path: child.link}" v-for="(child, c_index) in tab.children" :key="c_index">
            <q-item-section avatar>
              <q-icon :name="child.icon" v-if="child.icon"/>
            </q-item-section>

            <q-item-section class="text-light">{{ child.title }}</q-item-section>
          </q-item>

      </q-expansion-item>
          <q-item clickable class="rounded-borders" v-ripple active-class="my-menu-link" :to="{path: tab.link}" v-else>
            <q-item-section avatar>
              <q-icon :name="tab.icon" v-if="tab.icon"/>
            </q-item-section>

            <q-item-section class="text-light">{{ tab.title }}</q-item-section>
          </q-item>

          
        </q-list>

      </div>
      
    </q-drawer>
</template>
<script setup>

defineEmits(['update:modelValue'])
defineProps({
  modalValue: {
    type: Boolean,
    default: true,
  },
  navs: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="scss" scoped>
:deep(.q-drawer .q-drawer__content) {
  padding: 14px;
}

:deep(.q-drawer) {
  width: 300px !important;
  background-color: #101010;
}

:deep(.q-router-link--exact-active .q-focus-helper) {
  background: #ebf0ee !important;
  border-radius: 4px;
  opacity: 0.5;
}

.q-item__section--avatar, :deep(.q-item__section--avatar) {
  min-width: 45px !important;
}
:deep(.q-item)
{
  color: #fff;
}
</style>