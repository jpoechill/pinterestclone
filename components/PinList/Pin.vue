<template>
  <div>
    <div class="brick-container" v-for="(pin, index) in filteredPins" v-bind:key="index">
      <div class="light-overlay"></div>
      <div class="brick">
        <PinControls :pinOptions="pinOptions" :pinID="pin.pinID"></PinControls>
        <img class="brick-img" :src="pin.pinURL" alt="">
      </div>
      <div class="url-container">
        <div>{{ pin.pinURL }}</div>
        <span class="text_sml-username">{{ pin.pinnedBy }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PinControls from './PinControls'

export default {
  components: { PinControls },
  props: ['allPins', 'modFactor', 'pinOptions'],
  computed: {
    filteredPins: function() {
      const result = this.allPins
        .filter((item, index) => {
          return (index % 4) === this.modFactor
        })
        
      return result;
    }
  }
}
</script>

<style scoped>
.light-overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 20px;
  position: absolute;
  display: block;
  z-index: 1;
  opacity: -1;
  background-color: #EEE;
  transform: scale(.9);
  transition: all .3s;
}

.url-container {
  font-size: 14px;
  font-weight: 500;
  position: relative;
  z-index: 111111;
}

.dark-overlay {
  display: none;
  position: absolute;
  width: 100%;
  z-index: 2;
  height: 100%;
}

.brick-img {
  width: 100%;
  height: 100%;
  z-index: 100;
}

.brick-container {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  padding: 12px 12px 12px 12px;
  margin: 12px 0px 12px 0px;
}

.text_sml-username {
  font-size: 14px;
  font-weight: 700;
}

.brick-container div div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brick-container:hover {
  cursor: zoom-in;
}

.brick-container:hover .dark-overlay {
  display: block;
}

.brick-container:hover .light-overlay {
  transform: scale(1);
  opacity: 1;
}

.brick-container:hover .img-controls-overlay {
  display: block;
}

.brick + div {
  padding: 0px 0px 0px 6px;
}

.brick {
  width: 100%;
  border-radius: 20px;
  background-color: blue;
  overflow: hidden;
  margin-bottom: 4px;
  position: relative;
  z-index: 1;
}
</style>
