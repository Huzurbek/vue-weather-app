<template>
  <div class="modal">

    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">Choose a city</div>
        <div class="form-instructor">To find city start typing and pick one from the suggestions</div>
      </div>
      <div class="modal-body">
        <div>
          <input
            class="custom-input"
            :class="v$.name.$error ? 'is-invalid' : ''"
            type="text"
            placeholder="Search city"
            v-model="name"
            @blur="v$.$validate"
          />
          <p v-if="v$.name.$dirty && v$.name.$error" style="color: red">
            Choose a city
          </p>
        </div>

      </div>

      <div class="modal-footer">
        <div class="modal-btn"
             @click="clearForm"
             :class="name === '' ? 'custom-disabled' : ''"
        >CLEAR</div>
        <div style="display: flex; align-items: center">
          <div class="modal-btn" @click="close" style="margin-right: 31px">CANCEL</div>
          <div class="modal-btn"
               :class="name=== '' ? 'custom-disabled' : ''"
               @click="submitForm">ADD</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  data () {
    return {
      v$: useValidate(),
      name: ''
    }
  },
  validations () {
    return {
      name: { required }
    }
  },
  methods: {
    ...mapActions(['getWeather']),
    close () {
      this.$emit('closeModal')
    },
    clearForm () {
      this.name = ''
    },
    submitForm () {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) { // if ANY fail validation
        this.getWeather({ cityName: this.name })
        this.clearForm()
        this.close()
      }
    }
  }
}
</script>

<style scoped lang="sass">
.modal
  overflow: auto /* Enable scroll if needed */
  position: fixed
  z-index: 1000
  width: 100%
  height: 100%
  left: 0
  top: 0
  background: rgba(11, 11, 11, 0.5)
  //backdrop-filter: blur(32px)

/* Modal Content */
.modal-content
  position: absolute
  left: 585px
  top: 331px
  width: 751px
  min-height: 300px
  background: #FFFFFF
  box-sizing: border-box
  display: flex
  flex-direction: column
  justify-content: space-between
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)
  border-radius: 4px
  padding: 24px
.modal-title
  font-weight: 700
  font-size: 32px
  line-height: 38px
  margin-bottom: 16px
.form-instructor
  font-weight: 400
  font-size: 24px
  line-height: 24px
  color: #767676
.modal-footer
  display: flex
  justify-content: space-between
  align-items: center
.modal-btn
  font-weight: 700
  font-size: 16px
  line-height: 24px
  color: #9B51E0
  cursor: pointer

.custom-input
  background: transparent
  border: 0
  color: #C1C1C1
  border-bottom: 1px solid #1B1B1B
  outline: none
  padding-bottom: 16px
  transition: border-bottom 150ms ease-in
  width: 100%
  font-weight: 500
  font-size: 24px
  line-height: 24px
.custom-input:focus
  color: #1B1B1B

.is-invalid
  border-bottom: 1px solid #FF0101
.custom-disabled
  color: #C1C1C1
  pointer-events: none
</style>
