import { defineStore } from 'pinia';
import Pusher from 'pusher-js';
import axiosApiClient from "../axios";
export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    messages: [],
    pusher: null, // Store the Pusher instance
    channel: null, // Store the channel instance
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
    },

    async getchats() {
        return axiosApiClient
          .get("/conversations")
          .then((res) => {
            console.log('all chats', res.data.data);
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },
    //  async sendMessage() {
    //     try { 
    //      return axiosApiClient.post(`/send/message/1`,{message: 'asdasdasdsadas'}).then((res) => {
    //         this.addMessage(res.data.message);
    //     }).catch((error) => {
    //         console.error('Error sending message:', error);
    //         // Handle error as needed
    //         throw error; // Throw error to propagate it further if needed
    //       });
 
    //     } catch (error) {
    //       console.error('Error sending message:', error);
    //       // Handle error as needed
    //     }
    //   },
    sendMessage(message) {
        // Trigger an event named 'client-message' on the 'chat' channel
        this.channel.trigger('client-message', { message });
      },
    initializePusher() {
      // Initialize Pusher
      this.pusher = new Pusher('aab619730d10cbbda792', {
        cluster: 'ap4',
        // Add any additional configuration if needed
      });
      // Subscribe to a channel
      this.channel = this.pusher.subscribe('chat');

      // Bind to events on the channel
      this.channel.bind('new-message', (data) => {
        this.addMessage(data.message);
      });
    },
    disconnectPusher() {
      // Unsubscribe from the channel
      if (this.channel) {
        this.channel.unbind(); // Unbind all event listeners
        this.channel.unsubscribe(); // Unsubscribe from the channel
      }
      // Disconnect Pusher
      if (this.pusher) {
        this.pusher.disconnect();
      }
    },
  },
  // Call initializePusher when the store is created
  // and disconnectPusher when the store is destroyed
  // to handle initialization and cleanup properly
  hooks: {
    beforeMount() {
      this.initializePusher();
    },
    beforeUnmount() {
      this.disconnectPusher();
    },
  },
});
