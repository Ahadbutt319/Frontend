<template lang="">
   <div class="">
      <div class="row  inner_header pa-40">
         <div class="col-6 ">
            <h4 class="m-0" style="margin:0px ">Products</h4>
         </div>
         <div class="col-6">
            <div class="row justify-end">
               <div class="col-4  text-right	" style="display: flex;  justify-content: end; align-content: center; align-items: center;">
                  <q-avatar class="filter_icon" @click="dialog = true">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.99951 3H19.9996C20.5519 3 20.9996 3.44764 20.9996 3.99987L20.9998 5.58569C20.9999 5.85097 20.8945 6.10538 20.7069 6.29295L14.2924 12.7071C14.1049 12.8946 13.9995 13.149 13.9995 13.4142V19.7192C13.9995 20.3698 13.3881 20.8472 12.757 20.6894L10.757 20.1894C10.3118 20.0781 9.99951 19.6781 9.99951 19.2192V13.4142C9.99951 13.149 9.89415 12.8946 9.70662 12.7071L3.2924 6.29289C3.10486 6.10536 2.99951 5.851 2.99951 5.58579V4C2.99951 3.44772 3.44722 3 3.99951 3Z" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                  </q-avatar>
               </div>
               <div class="col-4">
                  <q-input  v-model="searchText" debounce="500" :loading="loadingState"  dense label="Search" @input="searchname">
                     <template v-slot:append>
                        <q-avatar  size="sm">
                           <img src="../assets/search.svg">
                        </q-avatar>
                     </template>
                  </q-input>
               </div>
            </div>
         </div>
      </div>
      <div class="row pa-20">
         <q-dialog v-model="icon" position="right" >
            <q-card style="width: 400px; max-width: 50vw; height:100vh ;display: flex;
               flex-direction: column;" >
               <q-card-section class="row items-center q-pb-none" style="flex-basis: 6%;">
                  <div class="text-h6">View Performer</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
               </q-card-section>
            </q-card>
         </q-dialog>
         <div class="col-12 gallery" id="gallery"  :loading="loading">
            <q-intersection v-for="post in posts" :key="post"  transition="scale" class="example-item">
               <div class="gallery-item">
                  <div class="content"  > <img :src="post.url" alt=""  @click="getDetails(post.device_id)"> </div>
                  <q-chip class="bookmarkchip" clickable  @click="saveProfiles(post.device_id)" >
                     <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.21094 2.58021C9.94784 1.10556 12.0522 1.10556 12.7891 2.58021L14.2403 5.48437C14.5333 6.07065 15.0949 6.47618 15.7436 6.56984L18.9513 7.03297C20.5988 7.27084 21.2517 9.29963 20.0521 10.4537L17.7656 12.6536C17.2869 13.1142 17.0681 13.7824 17.1818 14.437L17.7252 17.5671C18.0084 19.1977 16.3014 20.447 14.8328 19.6841L11.922 18.172C11.344 17.8717 10.656 17.8717 10.078 18.172L7.16725 19.6841C5.69857 20.447 3.99164 19.1977 4.27476 17.5671L4.81825 14.437C4.9319 13.7824 4.71311 13.1142 4.23438 12.6536L1.94785 10.4537C0.748338 9.29963 1.40124 7.27084 3.0487 7.03298L6.25644 6.56984C6.90511 6.47618 7.46674 6.07065 7.7597 5.48437L9.21094 2.58021Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                  </q-chip>
               </div>
            </q-intersection>
         </div>
      </div>
   </div>
   <q-dialog v-model="dialog"  @click="persistent = true"  position="right">
      <q-card class=" text-dark" style="width: 400px; max-width: 50vw; height:100vh ;display: flex;
         flex-direction: column;" >
         <q-bar class="bg-dark">
            <q-space />
            <q-btn dense flat icon="minimize" color="white" @click="maximizedToggle = false" :disable="!maximizedToggle">
               <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="crop_square" color="white" @click="maximizedToggle = true" :disable="maximizedToggle">
               <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close"  color="white" v-close-popup>
               <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
         </q-bar>
         <q-card-section>
            <div class="text-h4 text-dark">Add Filter</div>
         </q-card-section>

      </q-card>
   </q-dialog>
</template>
<script setup>
   import { ref, onMounted, watch, computed } from "vue";
   import { useDataStore } from "src/stores/data";
   import notify from "../composables/notify";
   const loading = ref(true);
   const dataStore = useDataStore();
   const posts = ref(null);
   const dialog = ref(false);
   const icon = ref(false);
   const details = ref('');
   const maximizedToggle = ref(true);
   // Getters for search store state
   const searchText = ref('');
   const loadingState = ref(false);
   const searchname = () => {
      console.log('asdasd');
      dataStore.searchByName();
   };
   const clear = () => {
      console.log('clear  value ',);
   };
   const label = ref({
      min: -12,
      max: 8
   });
   const genders = ref([
      {
         value: 'man',
         label: 'Man'
      },
      {
         value: 'Woman',
         label: 'Woman'
      },
      {
         value: 'others',
         label: 'Other'
      }
   ]);
   const ethnicity = ref(
      [
         {
            value: 'asian',
            label: 'Asian',
   
         },
         {
            value: 'indian',
            label: 'Indian',
   
         },
         {
            value: 'black',
            label: 'Black',
         },
         {
            value: 'white',
            label: 'White',
         },
         {
            value: 'latino hispanic',
            label: 'Latino hispanic',
         },
         {
            value: 'middle eastern',
            label: 'Middle eastern',
         },
      ]
   )
   const options = ref([
      {
         value: 'DGA',
         label: 'DGA',
   
      },
      {
         value: 'PGA',
         label: 'PGA',
   
      },
      {
         value: 'SAG-AFTRA',
         label: 'SAG-AFTRA',
      },
      {
         value: 'DGA',
         label: 'DGA',
   
      }
   
   ]);
   const captionCardHeight = ref('30%');
   const toggleCaptionCardHeight = (value) => {
      // Adjust the height of caption_Card based on the expansion item state
      captionCardHeight.value = captionCardHeight.value === '30%' ? '100%' : '30%';
   };
 

</script>
<style  scoped>
   .card_icons {
   position: absolute;
   top: 0;
   right: 0;
   }
   .main_card_body {
   padding: 0px !important;
   }
   .caption_Card {
   position: absolute !important;
   height: 30%;
   width: 100%;
   bottom: 0;
   background: linear-gradient(180deg, rgba(0, 0, 0, 0) 8.29%, #000 174.94%);
   display: flex;
   flex-direction: column;
   justify-content: end;
   padding-bottom: 48px;
   }
   .expansion_button :deep(.q-card) {
   background: transparent !important;
   }
   .expansion_button :deep(.q-item) {
   width: 110px;
   background: rgba(209, 200, 200, 0.42);
   border-radius: 100px;
   }
   :deep(.q-expansion-item--expanded) .caption_Card {
   height: 100% !important;
   }
   :deep(.q-item__section--avatar) {
   min-width: 31px !important;
   }
   .bookmarkchip
   {
   border-radius: 100%;
   width: 49px;
   height: 49px;
   position: absolute;
   top: 10px;
   right: 10px;
   background: #1c1b1b4d;
   color: rgba(16, 16, 16, 0.20);
   }
   .filter_icon {
   background-color: #fff;
   border: 1px solid #c5c0c0;
   width: 37px;
   height: 37px;
   margin-right: 30px;
   }
   .inner_header {
   border-bottom: 1px solid #E2E8F0;
   ;
   }
   .gallery {
   display: grid;
   grid-column-gap: 8px;
   grid-row-gap: 8px;
   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   }
   .gallery img {
   max-width: 100%;
   border-radius: 8px;
   transition: all 1.5s ease;
   }
   .gallery img:hover {
   box-shadow: 0 0 32px #333;
   }
   .gallery .content {
   padding: 4px;
   }
   .gallery .gallery-item {
   transition: grid-row-start 300ms linear;
   transition: transform 300ms ease;
   transition: all 0.5s ease;
   cursor: pointer;
   }
   .gallery .gallery-item:hover {
   transform: scale(1.025);
   }
   :deep(.q-option-group) {
   display: flex;
   flex-grow: 1;
   flex-wrap: wrap;
   gap: 10px;
   }
   .text-teal {
   color: #000000 !important;
   background: rgba(0, 0, 0, 0.10);
   ;
   padding: 6px 10px;
   border-radius: 17px;
   font-size: 11px;
   }
   q-checkbox__bg,
   :deep(.q-checkbox__inner) {
   display: none;
   }
   /* Change the background color when selected */
   :deep(.q-checkbox__label.q-checkbox__label--standard) {
   background-color: lightblue;
   padding: 8px;
   border-radius: 5px;
   cursor: pointer;
   }
   /* Change the text color when selected */
   :deep(.q-checkbox__label.q-checkbox__label--standard .q-checkbox__content) {
   color: white;
   }
   /* Hover effect */
   :deep(.q-checkbox__label.q-checkbox__label--standard:hover) {
   background-color: lightcyan;
   }
   :deep(.q-checkbox[aria-checked="true"] .q-checkbox__label) .text-teal {
   color: #fff !important;
   background: #000;
   padding: 6px 10px;
   border-radius: 17px;
   font-size: 11px;
   }
   p {
   margin: 0px;
   }
   .footer_filter {
   position: absolute;
   width: 100%;
   bottom: 0;
   }
   .q-dialog__inner--minimized>div {
   max-height: 100vh !important;
   }
   p,
   h6 {
   margin: 0px;
   }
   :deep(.q-dialog .q-dialog__backdrop){
      background: rgba(0, 0, 0, 0.49) !important;
  backdrop-filter: blur(17px) !important;
   }
</style>