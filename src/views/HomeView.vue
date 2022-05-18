<template>
  <div class="home">
    <div class="home-header">
      <div class="header-title">World Weather</div>
      <div class="header-descreption">Watch weather in your current location</div>
    </div>
<!--Current Location Component-->
    <div class="current-weather-container">
      <WeatherCard v-if="weatherList.length" :items="weatherList[0]" />
      <h2 v-else style="text-align: center">There is no any weather Info!</h2>
    </div>
<!--Weather Card Component-->
    <div class="cities-weather-container">
      <WeatherCard other-city v-for="(item,index) in weatherList?.slice(1)||[]" :key="index" :items="item"/>
    </div>
<!--Add Button-->
    <div class="add-btn" @click="modal=true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" fill-opacity="0.87"/>
      </svg>
    </div>
<!--    Modal View-->
    <ModalAdd v-if="modal" @closeModal="modal=false" />
<!--    Loading Component-->
      <loading v-model:active="isLoading"
               :can-cancel="false"
               :is-full-page="fullPage"/>
<!--    Modal View-->
    <NotificationErrorModel v-if="getErrorStatus" @close="closeErrorRemove" />
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import WeatherCard from '@/components/WeatherCard'
import ModalAdd from '@/components/ModalAdd'
import NotificationErrorModel from '@/components/NotificationErrorModel'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'HomeView',
  components: {
    Loading,
    WeatherCard,
    ModalAdd,
    NotificationErrorModel
  },
  data () {
    return {
      fullPage: true,
      modal: false,
      errorModal: this.$store.state.errorStatus,
      current: []
    }
  },
  computed: {
    ...mapGetters(['weatherList', 'getErrorStatus']),
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    ...mapActions(['getWeather']),
    ...mapMutations(['closeErrorModel']),
    closeErrorRemove () {
      this.closeErrorModel()
    }
  }
}
</script>
<style scoped lang="sass">
.home
  position: relative
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  box-sizing: border-box
  padding-top: 24px
  padding-bottom: 34px
.home-header
  text-align: center

.header-title
  font-weight: 300
  font-size: 70px
  line-height: 80px
  margin-bottom: 32px

.header-descreption
  font-weight: 400
  font-size: 24px
  line-height: 24px
  color: #767676
  margin-bottom: 20px
.current-weather-container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  box-sizing: border-box
  margin-bottom: 80px
  max-width: 824px
  padding: 0 20px
.cities-weather-container
  display: grid
  grid-template-columns: repeat(4,1fr)
  grid-column-gap: 40px
  grid-row-gap: 40px

.add-btn
  position: fixed
  right: 99px
  bottom: 34px
  width: 56px
  height: 56px
  display: flex
  justify-content: center
  align-items: center
  background: #9B51E0
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)
  border-radius: 50px
  cursor: pointer
  transition: opacity 250ms ease-in

.add-btn:hover
  opacity: 0.7


@media screen and (max-width: 1530px)
  .cities-weather-container
    grid-template-columns: repeat(3,1fr)
@media screen and (max-width: 1160px)
  .cities-weather-container
    grid-template-columns: repeat(2,1fr)
@media screen and (max-width: 764px)
  .header-title
    font-weight: 200
    font-size: 40px
    line-height: 50px
    margin-bottom: 16px
  .cities-weather-container
    grid-template-columns: repeat(1,1fr)
    grid-row-gap: 12px

  .add-btn
    right: 5px
    bottom: 5px
</style>
