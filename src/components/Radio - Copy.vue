<template>
  <div
    tabindex="-1"
    role="radio"
    :class="[position]"
    :aria-checked="isAriaChecked"
    @click="setValue"
  >
    <div class="label">{{ radioLabel }}</div>
  </div>
</template>

<script>
export default {
  name: "Radio",
  props: {
    ariaChecked: {
      type: Boolean,
      default: false
    },
    // position of radio input relative to it's label
    position: {
      type: String,
      default: "beforeLabel",
      validator: function(value) {
        // The value must match one of these strings
        return (
          ["beforeLabel", "afterLabel", "aboveLabel", "belowLabel"].indexOf(
            value
          ) !== -1
        );
      }
    },
    label: String
  },
  data: function() {
    return {
      radioLabel: this.label,
      radioAriaChecked: this.ariaChecked
    };
  },
  computed: {
    isAriaChecked: function() {
      return this.radioAriaChecked ? "true" : "false";
    }
  },
  methods: {
    setValue: function() {
      this.radioAriaChecked = !this.radioAriaChecked;
    }
  },
  created() {
    console.log(this.ariaChecked ? "yes" : null);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
[role="radio"] {
  display: inline-flex;
  margin: 0.5em;
  padding: 0.15em 0.3em;
  border: 2px solid transparent;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  cursor: context-menu;
  outline: none;

  &:focus {
    border-color: rgb(110, 190, 110);
    // border: 2px solid rgb(110, 190, 110);
  }

  &[aria-checked="true"] {
    &.beforeLabel:before,
    &.afterLabel:after,
    &.aboveLabel:before,
    &.belowLabel:after {
      box-shadow: inset 0px 0px 0px 4px rgb(110, 190, 110);
    }
  }

  &:hover {
    background-color: rgb(228, 241, 228);
  }

  &[aria-checked="false"]:hover {
    &.beforeLabel:before,
    &.afterLabel:after,
    &.aboveLabel:before,
    &.belowLabel:after {
      box-shadow: none;
      background: #fff;
    }
  }

  &.beforeLabel:before,
  &.afterLabel:after,
  &.aboveLabel:before,
  &.belowLabel:after {
    content: "";
    display: block;
    width: 14px;
    height: 14px;
    border: 1px solid darkgray;
    border-radius: 50%;
    box-shadow: inset 0 4px 3px 0px #ebebeb;
  }

  &.beforeLabel,
  &.afterLabel {
    flex-direction: row;
  }

  &.aboveLabel,
  &.belowLabel {
    flex-direction: column;
  }

  &.beforeLabel {
    div.label {
      margin: 3px 0px 3px 5px;
    }
  }

  &.afterLabel {
    div.label {
      margin: 3px 5px 3px 0px;
    }
  }

  &.aboveLabel {
    div.label {
      margin: 3px 3px 0px 3px;
    }
  }

  &.belowLabel {
    div.label {
      margin: 0px 3px 3px 3px;
    }
  }

  // [role="radio"].positionAfter::after,
  // [role="radio"].positionBelow::after,
  // [role="radio"].positionBefore::before,
  // [role="radio"].positionTop::before {
  //   content: "";
  //   display: block;
  //   margin: 5px 5px;
  //   width: 14px;
  //   height: 14px;
  //   border: 1px solid darkgray;
  //   border-radius: 50%;
  //   box-shadow: inset 0 4px 3px 0px #e6e6e6;
  // }
}
</style>
