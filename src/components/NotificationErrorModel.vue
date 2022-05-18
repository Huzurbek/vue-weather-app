<template>
  <div class="modal">
    <div class="modal-content">
      <div class="error-text">Opps something is happened from API try again...</div>
      <div class="close-btn" @click="close">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.77617 0.304743C1.36985 -0.101581 0.711067 -0.101581 0.304743 0.304743C-0.101581 0.711067 -0.101581 1.36985 0.304743 1.77617L14.5286 16L0.304752 30.2238C-0.101572 30.6302 -0.101572 31.2889 0.304752 31.6953C0.711076 32.1016 1.36986 32.1016 1.77618 31.6953L16 17.4714L30.2238 31.6953C30.6301 32.1016 31.2889 32.1016 31.6953 31.6953C32.1016 31.2889 32.1016 30.6301 31.6953 30.2238L17.4714 16L31.6953 1.77618C32.1016 1.36985 32.1016 0.71107 31.6953 0.304746C31.2889 -0.101578 30.6302 -0.101578 30.2238 0.304746L16 14.5286L1.77617 0.304743Z" fill="#a5a0a0"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close () {
      this.$emit('close')
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
  background: rgba(229, 221, 221, 0.5)

/* Modal Content */
.modal-content
  position: absolute
  left: 680px
  top: 331px
  width: 600px
  background: #FFFFFF
  box-sizing: border-box
  display: flex
  justify-content: space-between
  align-items: center
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)
  border-radius: 6px
  padding: 15px 20px
.error-text
  font-weight: 500
  font-size: 20px
  color: red
.close-btn
  width: 55px
  height: 55px
  display: flex
  justify-content: center
  align-items: center
  border-radius: 50%
  cursor: pointer
.close-btn:hover
  outline: 2px solid #efecec
  //box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12)

</style>
