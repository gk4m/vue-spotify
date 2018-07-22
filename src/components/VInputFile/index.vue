<template>
  <label class="input-file" for="input-file__input">
    <div class="input-file__avatar" :data-text='hoverText' :style="avatarStyles">
      <input id="input-file__input" class="input-file__input" type="file" @change="onFileChange"/>
      <icon class="input-file__icon" name="camera"/>
    </div>
  </label>
</template>

<script>
  export default {
    name: 'input-file',

    data() {
      return {
        avatarImg: '',
        avatarFile: ''
      }
    },

    props: {
      hoverText: {
        type: String,
        required: false,
        default: 'Upload photo'
      },
      coverUrl: {
        type: String,
        required: false
      }
    },

    computed: {
      avatarStyles() {
        return `background-image: url(${this.avatarImg});`;
      }
    },

    methods: {
      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        const reader = new FileReader();

        if (!files.length) {
          return;
        }

        this.avatarFile = files[0];

        reader.onload = (e) => {
          this.avatarImg = e.target.result;
        };

        reader.readAsDataURL(this.avatarFile);

        this.$emit('onFileChange', this.avatarFile);
      }
    },

    created() {
      if (this.coverUrl) {
        this.avatarImg = this.coverUrl;
      }
    }
  }
</script>

<style scoped lang="sass">

  .input-file
    display: block
    max-width: 150px
    background: $c-mine-shaft
    box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, .4)

    &__avatar
      position: relative
      max-width: 150px
      height: 150px
      margin: 14px auto
      background-size: 100% 100%

      &:hover
        cursor: pointer

        &:before
          position: absolute
          width: 100%
          height: 100%
          padding: 80px 10px 10px
          background-color: rgba(0, 0, 0, .5)
          border: 3px solid $c-green
          color: $c-white
          font:
            size: 15px
            weight: bold
          z-index: 1
          text-align: center
          content: attr(data-text)

        .input-file__icon
          display: block

    &__input
      display: none

    &__icon
      display: none
      position: absolute
      top: 40px
      left: 0
      right: 0
      width: 40px
      height: 40px
      margin: auto
      color: $c-white
      z-index: 2

</style>
