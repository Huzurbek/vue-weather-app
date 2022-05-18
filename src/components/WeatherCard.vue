<template>
  <div class="weather-card">
    <div class="card-title">{{ items?.name }}<span v-if="!otherCity">, {{items?.sys.country}}</span></div>
    <div v-if="!otherCity" class="location-name">Your current location</div>
    <div v-else class="location-name">{{ fullCountryName }}</div>

    <div class="inside-card">
      <div class="line">
        <div>Weather</div>
        <div>{{ items?.weather[0].main }}</div>
      </div>
      <div class="line">
        <div>Temperature</div>
        <div>{{ toCelcius }} °C</div>
      </div>
      <div class="line">
        <div>Humidity</div>
        <div>{{ items?.main.humidity }} %</div>
      </div>
    </div>
    <div class="show-last-time" v-if="customTime > 0">{{ customTime }} minutes ago</div>
    <div class="show-last-time" v-else >Recently</div>
    <div class="card-footer" :class="otherCity === false ? 'addition-footer-style' : ''">
      <div v-if="otherCity" class="btn" @click="remove(items?.id)">REMOVE</div>
      <div class="btn reload" @click="reloadInfo(items?.name)">RELOAD</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
export default {
  props: {
    items: {
      type: Object,
      default: () => {}
    },
    otherCity: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      fullCountryName: regionNames.of(this.items?.sys.country || 'Uz')
    }
  },
  computed: {
    ...mapGetters(['getInitialTime']),
    customTime () {
      const { updateTime } = this.items
      if (updateTime) {
        return Math.abs(Math.floor((this.getInitialTime.getTime() - new Date(updateTime)?.getTime()) / (60000)))
      } else {
        return 0
      }
    },
    toCelcius () {
      const val = parseFloat(this.items?.main.temp)
      return Math.floor(val - 273.15)
    }
  },
  methods: {
    ...mapMutations(['removeCityWeather', 'setTime']),
    ...mapActions(['reloadWeatherInfo']),
    remove (val) {
      this.removeCityWeather({ id: val })
      this.setTime()
    },
    reloadInfo (val) {
      this.reloadWeatherInfo({ cityName: val })
    }
  }
}
</script>

<style scoped lang="sass">
.weather-card
  flex: 1
  min-width: 350px
  background: #FFFFFF
  box-shadow: 0px 2px 10px rgba(10, 10, 10, 0.25)
  border-radius: 6px
  box-sizing: border-box
  padding: 24px
.card-title
  font-weight: 700
  font-size: 32px
  line-height: 38px
  margin-bottom: 15px
.location-name, .line
  font-weight: 400
  font-size: 18px
  line-height: 24px
.location-name
  margin-bottom: 40px

.line
  position: relative
  display: flex
  justify-content: space-between
  margin-bottom: 28px

.line:last-child
  margin-bottom: 20px

.line::after
  content: ""
  position: absolute
  right: 0
  left: 0
  bottom: -12px
  height: 1px
  background: #C4C4C4

.show-last-time, .reload-btn
  text-align: right
  font-size: 16px
  line-height: 24px

.show-last-time
  flex: 1
  font-weight: 400
  color: #A8A8A8
  margin-bottom: 32px
.card-footer
  display: flex
  justify-content: space-between
  align-items: center
.btn
  font-weight: 700
  color: #9B51E0
  cursor: pointer
  transition: opacity 250ms ease-in
.btn:hover
  opacity: 0.7
.addition-footer-style
  justify-content: flex-end
//Mobile Version till 540px
@media screen and (max-width: 540px)
  //.weather-card
  //  width: 350px
</style>
