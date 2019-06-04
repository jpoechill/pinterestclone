<template>
  <div class="img-controls-overlay">
    <!-- <div class="share-button text-left" @click="sayHello('Cancel default and share this Pin (or Link)')">
      <span @click="">Follow</span> <br>
    </div> -->
    <div class="pin-button text-right" v-if="pinOptions.includes('pin')">
      <span @click="addPinner(pinID)">Add Pin</span> <br>
    </div>
    <!-- <div class="url-button text-left" @click="sayHello('Cancel default and  tell me what this URL is')">
      <span @click="">URL</span> <br>
    </div> -->
    <!-- <div class="pin-delete text-right" v-if="pinOptions.includes('delete')" @click="deletePin(imgKey)">
      <span>Unpin</span> <br>
    </div> -->
  </div>
</template>

<script>
// import mixins from '../mixins'

export default {
  name: 'PinControls',
  // mixins: [mixins],
  props: ['pinID', 'pinOptions'],
  created: function  () {

  },
  data () {
    return {
      data: ''
    }
  },
  methods: {
    addPinner: function (pinID) {
      // alert('Add new pinner: ' + this.pinID)
      console.log(this.$store.state.count)
      this.$store.commit('increment')
      this.$store.commit('updatePin', [pinID, this.$store.state.currUser])
    },
    deletePin: function () {
      alert('Delete this pin')
    }
  }
}
</script>

<style scoped>
.img-controls-overlay {
  display: none;
  position: absolute;
  width: 100%;
  z-index: 2;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
}

.pin-button {
  position: absolute; 
  top: 10px;
  padding: 6px 15px 6px 0px;
  color: #FFF; 
  z-index: 4;
  right: 10px;
  font-weight: 700;
  border-radius: 10px;
  background-color: #41B883;
  width: 90px;
}

.pin-delete {
  position: absolute; 
  bottom: 10px;
  z-index: 100001000010000;
  padding: 6px 15px 6px 0px;
  color: #111; 
  z-index: 4;
  right: 10px;
  font-weight: 700;
  border-radius: 10px;
  background-color: #EEE;
  width: 80px;
}

.pin-button:hover {
  background-color: #3B8070;
  cursor: pointer;
}

.pin-delete:hover, .url-button:hover  {
  background-color: lightgray;
  cursor: pointer;
}

.share-button {
  position: absolute; 
  top: 10px;
  padding: 6px 0px 6px 15px;
  color: #FFF; 
  z-index: 4;
  left: 10px;
  font-weight: 700;
  border-radius: 10px;
  background-color: #41B883;
  width: 74px;
}

.url-button {
  border-radius: 10px;
  position: absolute; 
  bottom: 10px;
  padding: 6px 0px 6px 15px;
  color: #111; 
  font-weight: 700;
  z-index: 4;
  left: 10px;
  background-color: #EEE;
  width: 74px;
}
</style>
