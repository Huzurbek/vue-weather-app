import { createStore } from 'vuex'
import { Axios } from '@/utils/axios'

export default createStore({
  state: {
    isLoading: false,
    initialTime: new Date(),
    weatherList: JSON.parse(localStorage.getItem('WeatherList') || '[]'),
    errorStatus: false
  },
  getters: {
    getInitialTime: (state) => {
      return state.initialTime
    },
    weatherList: (state) => {
      return state.weatherList
    },
    getErrorStatus: (state) => {
      return state.errorStatus
    }
  },
  mutations: {
    setTime (state) {
      state.initialTime = new Date()
    },
    setWeather (state, payload) {
      if (!state.weatherList.find(weather => weather.id === payload.id)) {
        localStorage.setItem('WeatherList', JSON.stringify([...state.weatherList, payload]))
        state.weatherList.push(payload)
      } else {
        localStorage.setItem('WeatherList', JSON.stringify([...state.weatherList]))
      }
    },
    removeCityWeather (state, payload) {
      state.isLoading = true
      state.weatherList = state.weatherList.filter(el => el.id !== payload.id)
      localStorage.setItem('WeatherList', JSON.stringify([...state.weatherList]))
      state.isLoading = false
    },
    setReloadedWeatherInfo (state, payload) {
      // eslint-disable-next-line array-callback-return
      state.weatherList.map((el, index) => {
        if (el.name === payload.name) {
          state.weatherList[index] = payload
        }
      })
    },
    closeErrorModel (state) {
      state.errorStatus = false
    }
  },
  actions: {
    async getWeather ({ commit, state }, payload) {
      try {
        state.isLoading = true
        const response = await Axios.get(
          `weather?q=${payload.cityName}&APPID=2ecbeb40e4b4b68c7dbe30da741a0cdf`
        )
        commit('setWeather', {
          ...response.data,
          updateTime: new Date()
        })
        commit('setTime')
        state.isLoading = false
      } catch (err) {
        console.log('API error: ', err)
        state.isLoading = false
        state.errorStatus = true
      }
    },
    async reloadWeatherInfo ({ commit, state }, payload) {
      try {
        state.isLoading = true
        const response = await Axios.get(
          `weather?q=${payload.cityName}&APPID=2ecbeb40e4b4b68c7dbe30da741a0cdf`
        )
        commit('setReloadedWeatherInfo', {
          ...response.data,
          updateTime: new Date()
        })
        commit('setTime')
        state.isLoading = false
      } catch (err) {
        console.log('API error: ', err)
        state.isLoading = false
        state.errorStatus = true
      }
    }

  },
  modules: {}
})
